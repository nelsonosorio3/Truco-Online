import { io, Socket } from "socket.io-client";
import { DefaultEventsMap } from "socket.io-client/build/typed-events";

class SocketService{

    public socket: Socket | null = null

    public connect (url: string): Promise<Socket<DefaultEventsMap, DefaultEventsMap>> {
        return new Promise((resolve, reject) => {
            this.socket = io(url);

            if(!this.socket) return reject();

            this.socket.on('connect', () => {
                resolve(this.socket as Socket);
            });

            this.socket.on('connect_error', (error) => {
                console.log('Connection error:', error);
                reject(error)
            })

        })
    }
}

export default new SocketService();