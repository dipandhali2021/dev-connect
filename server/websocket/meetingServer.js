import { WebSocketServer, WebSocket } from 'ws';
import { v4 as uuidv4 } from 'uuid';

class MeetingServer {
  constructor(server) {
    this.wss = new WebSocketServer({ server });
    this.rooms = new Map(); // roomId -> Set of connections
    this.setupWebSocket();
  }

  handleNewMeeting(meetingId) {
    if (!this.rooms.has(meetingId)) {
      this.rooms.set(meetingId, new Set());
    }
  }

  setupWebSocket() {
    this.wss.on('connection', (ws, req) => {
      const roomId = this.getRoomIdFromUrl(req.url);
      const connectionId = uuidv4();

      ws.connectionId = connectionId;
      ws.roomId = roomId;

      this.joinRoom(roomId, ws);

      ws.on('message', (message) => {
        this.handleMessage(ws, message);
      });

      ws.on('close', () => {
        this.leaveRoom(roomId, ws);
      });
    });
  }

  getRoomIdFromUrl(url) {
    const parts = url.split('/');
    return parts[parts.length - 1];
  }

  joinRoom(roomId, ws) {
    if (!this.rooms.has(roomId)) {
      this.rooms.set(roomId, new Set());
    }
    this.rooms.get(roomId).add(ws);

    // Notify others in the room
    this.broadcastToRoom(roomId, {
      type: 'participant_joined',
      participantId: ws.connectionId,
      timestamp: Date.now(),
    }, ws);
  }

  leaveRoom(roomId, ws) {
    const room = this.rooms.get(roomId);
    if (room) {
      room.delete(ws);
      if (room.size === 0) {
        this.rooms.delete(roomId);
      } else {
        // Notify others in the room
        this.broadcastToRoom(roomId, {
          type: 'participant_left',
          participantId: ws.connectionId,
          timestamp: Date.now(),
        }, ws);
      }
    }
  }

  handleMessage(ws, message) {
    try {
      const parsedMessage = JSON.parse(message);
      const room = this.rooms.get(ws.roomId);

      if (room) {
        // Forward message to target participant
        if (parsedMessage.target) {
          for (const client of room) {
            if (client.connectionId === parsedMessage.target) {
              client.send(message.toString());
              break;
            }
          }
        } else {
          // Broadcast to all participants except sender
          this.broadcastToRoom(ws.roomId, parsedMessage, ws);
        }
      }
    } catch (error) {
      console.error('Error handling message:', error);
    }
  }

  broadcastToRoom(roomId, message, excludeWs) {
    const room = this.rooms.get(roomId);
    if (room) {
      const messageString = JSON.stringify(message);
      room.forEach((client) => {
        if (client !== excludeWs && client.readyState === WebSocket.OPEN) {
          client.send(messageString);
        }
      });
    }
  }
}

export default MeetingServer;