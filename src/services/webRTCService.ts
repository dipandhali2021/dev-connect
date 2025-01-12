import { Message, PeerConnection } from '../types/webrtc';

class WebRTCService {
  private peerConnections: Map<string, PeerConnection> = new Map();
  private localStream?: MediaStream;
  private socket?: WebSocket;
  private roomId?: string;
  private userId?: string;

  private readonly configuration = {
    iceServers: [
      { urls: 'stun:stun.l.google.com:19302' },
      { urls: 'stun:stun1.l.google.com:19302' },
    ],
  };

  async initialize(roomId: string, userId: string) {
    this.roomId = roomId;
    this.userId = userId;
    
    // Connect to signaling server
    this.socket = new WebSocket(`ws://localhost:5000/ws/meeting/${roomId}`);
    this.setupSocketListeners();
    
    try {
      // Get local media stream
      this.localStream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
      return this.localStream;
    } catch (error) {
      console.error('Error accessing media devices:', error);
      throw error;
    }
  }

  private setupSocketListeners() {
    if (!this.socket) return;

    this.socket.onmessage = async (event) => {
      const message: Message = JSON.parse(event.data);

      switch (message.type) {
        case 'offer':
          await this.handleOffer(message);
          break;
        case 'answer':
          await this.handleAnswer(message);
          break;
        case 'candidate':
          await this.handleCandidate(message);
          break;
      }
    };
  }

  private async handleOffer(message: Message) {
    const peerConnection = this.createPeerConnection(message.sender);
    
    try {
      await peerConnection.connection.setRemoteDescription(new RTCSessionDescription(message.data));
      const answer = await peerConnection.connection.createAnswer();
      await peerConnection.connection.setLocalDescription(answer);

      this.sendMessage({
        type: 'answer',
        sender: this.userId!,
        target: message.sender,
        data: answer,
        timestamp: Date.now(),
      });
    } catch (error) {
      console.error('Error handling offer:', error);
    }
  }

  private async handleAnswer(message: Message) {
    const peerConnection = this.peerConnections.get(message.sender);
    if (peerConnection) {
      try {
        await peerConnection.connection.setRemoteDescription(
          new RTCSessionDescription(message.data)
        );
      } catch (error) {
        console.error('Error handling answer:', error);
      }
    }
  }

  private async handleCandidate(message: Message) {
    const peerConnection = this.peerConnections.get(message.sender);
    if (peerConnection) {
      try {
        await peerConnection.connection.addIceCandidate(
          new RTCIceCandidate(message.data)
        );
      } catch (error) {
        console.error('Error handling candidate:', error);
      }
    }
  }

  private createPeerConnection(targetUserId: string): PeerConnection {
    const connection = new RTCPeerConnection(this.configuration);
    
    // Add local stream tracks to peer connection
    if (this.localStream) {
      this.localStream.getTracks().forEach((track) => {
        if (this.localStream) {
          connection.addTrack(track, this.localStream);
        }
      });
    }

    // Handle ICE candidates
    connection.onicecandidate = (event) => {
      if (event.candidate) {
        this.sendMessage({
          type: 'candidate',
          sender: this.userId!,
          target: targetUserId,
          data: event.candidate,
          timestamp: Date.now(),
        });
      }
    };

    // Handle remote stream
    connection.ontrack = (event) => {
      const [stream] = event.streams;
      const peerConnection = this.peerConnections.get(targetUserId);
      if (peerConnection) {
        peerConnection.stream = stream;
      }
    };

    const peerConnection: PeerConnection = {
      connection,
      stream: undefined,
    };

    this.peerConnections.set(targetUserId, peerConnection);
    return peerConnection;
  }

  async startCall(targetUserId: string) {
    const peerConnection = this.createPeerConnection(targetUserId);
    console.log('Starting call with:', peerConnection);
    
    try {
      const offer = await peerConnection.connection.createOffer();
      await peerConnection.connection.setLocalDescription(offer);

      this.sendMessage({
        type: 'offer',
        sender: this.userId!,
        target: targetUserId,
        data: offer,
        timestamp: Date.now(),
      });
    } catch (error) {
      console.error('Error starting call:', error);
      throw error;
    }
  }

  async toggleAudio(enabled: boolean) {
    if (this.localStream) {
      this.localStream.getAudioTracks().forEach((track) => {
        track.enabled = enabled;
      });
    }
  }

  async toggleVideo(enabled: boolean) {
    if (this.localStream) {
      this.localStream.getVideoTracks().forEach((track) => {
        track.enabled = enabled;
      });
    }
  }

  async startScreenShare() {
    try {
      const screenStream = await navigator.mediaDevices.getDisplayMedia({
        video: true,
      });

      // Replace video track with screen share track
      if (this.localStream) {
        const [videoTrack] = this.localStream.getVideoTracks();
        if (videoTrack) {
          const [screenTrack] = screenStream.getVideoTracks();
          this.localStream.removeTrack(videoTrack);
          this.localStream.addTrack(screenTrack);

          // Update all peer connections with new track
          this.peerConnections.forEach((peer) => {
            const sender = peer.connection
              .getSenders()
              .find((s) => s.track?.kind === 'video');
            if (sender) {
              sender.replaceTrack(screenTrack);
            }
          });

          // Listen for screen share stop
          screenTrack.onended = () => {
            this.stopScreenShare();
          };
        }
      }
    } catch (error) {
      console.error('Error starting screen share:', error);
      throw error;
    }
  }

  async stopScreenShare() {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      const [videoTrack] = stream.getVideoTracks();

      if (this.localStream) {
        const [oldTrack] = this.localStream.getVideoTracks();
        if (oldTrack) {
          this.localStream.removeTrack(oldTrack);
          this.localStream.addTrack(videoTrack);

          // Update all peer connections with new track
          this.peerConnections.forEach((peer) => {
            const sender = peer.connection
              .getSenders()
              .find((s) => s.track?.kind === 'video');
            if (sender) {
              sender.replaceTrack(videoTrack);
            }
          });
        }
      }
    } catch (error) {
      console.error('Error stopping screen share:', error);
      throw error;
    }
  }

  private sendMessage(message: Message) {
    if (this.socket && this.socket.readyState === WebSocket.OPEN) {
      this.socket.send(JSON.stringify(message));
    }
  }

  disconnect() {
    // Close all peer connections
    this.peerConnections.forEach((peer) => {
      peer.connection.close();
    });
    this.peerConnections.clear();

    // Stop local stream tracks
    if (this.localStream) {
      this.localStream.getTracks().forEach((track) => track.stop());
    }

    // Close socket connection
    if (this.socket) {
      this.socket.close();
    }
  }
}

export const webRTCService = new WebRTCService();