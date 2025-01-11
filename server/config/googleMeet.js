import { authenticate } from '@google-cloud/local-auth';
import { SpacesServiceClient } from '@google-apps/meet';
import { auth } from 'google-auth-library';
import fs from 'fs/promises';
import path from 'path';

class GoogleMeetConfig {
  constructor() {
    this.SCOPES = ['https://www.googleapis.com/auth/meetings.space.created'];
    this.TOKEN_PATH = path.join(process.cwd(), 'token.json');
    this.CREDENTIALS_PATH = path.join(process.cwd(), 'credentials.json');
  }

  async loadSavedCredentials() {
    try {
      const content = await fs.readFile(this.TOKEN_PATH);
      const credentials = JSON.parse(content);
      return auth.fromJSON(credentials);
    } catch (err) {
      return null;
    }
  }

  async saveCredentials(client) {
    try {
      const content = await fs.readFile(this.CREDENTIALS_PATH);
      const keys = JSON.parse(content);
      const key = keys.installed || keys.web;
      const payload = JSON.stringify({
        type: 'authorized_user',
        client_id: key.client_id,
        client_secret: key.client_secret,
        refresh_token: client.credentials.refresh_token,
      });
      await fs.writeFile(this.TOKEN_PATH, payload);
    } catch (err) {
      console.error('Error saving credentials:', err);
      throw new Error('Failed to save credentials');
    }
  }

  async authorize() {
    try {
      let client = await this.loadSavedCredentials();
      if (client) {
        return client;
      }

      client = await authenticate({
        scopes: this.SCOPES,
        keyfilePath: this.CREDENTIALS_PATH,
      });

      if (client.credentials) {
        await this.saveCredentials(client);
      }
      return client;
    } catch (err) {
      console.error('Error in authorization:', err);
      throw new Error('Failed to authorize');
    }
  }

  async createMeeting(options = {}) {
    try {
      const authClient = await this.authorize();
      const meetClient = new SpacesServiceClient({ authClient });

      const request = {
        defaultSettings: {
          audio: true,
          video: true,
          chat: true,
          ...options
        }
      };

      const response = await meetClient.createSpace(request);
      return {
        meetingUrl: response[0].meetingUri,
        meetingId: response[0].name
      };
    } catch (err) {
      console.error('Error creating meeting:', err);
      throw new Error('Failed to create meeting');
    }
  }
}

export default new GoogleMeetConfig();