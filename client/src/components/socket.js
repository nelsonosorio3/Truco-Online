import { io } from "socket.io-client";

let socket = io('//localhost:9000');

export default socket;