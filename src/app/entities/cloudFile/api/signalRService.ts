import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';

class SignalRService {
    private connection: HubConnection | null = null;
    private connectionPromise: Promise<void> | null = null;

    async getConnection(): Promise<HubConnection> {
        if (!this.connection) {
            const hubUrl = (process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5141') + '/hubs/currentFileProgress';
            this.connection = new HubConnectionBuilder()
                .withUrl(hubUrl)
                .withAutomaticReconnect()
                .build();

            if (!this.connectionPromise) {
                this.connectionPromise = this.connection.start();
            }
            await this.connectionPromise;
        }
        return this.connection;
    }

    async getConnectionId(): Promise<string> {
        const connection = await this.getConnection();
        const connectionId = await connection.invoke('GetConnectionId');
        return connectionId;
    }

    async subscribeToProgress(callback: (percent: number) => void): Promise<void> {
        const connection = await this.getConnection();
        connection.on('CurrentFileProgress', callback);
    }

    async unsubscribeFromProgress(): Promise<void> {
        if (this.connection) {
            await this.connection.off('CurrentFileProgress');
        }
    }

    async disconnect(): Promise<void> {
        if (this.connection) {
            await this.connection.stop();
            this.connection = null;
            this.connectionPromise = null;
        }
    }
}

export const signalRService = new SignalRService(); 