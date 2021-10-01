import { io } from "socket.io-client";

// console.log("Desde socket.js", localStorage.token)
let socket = io('//143.198.96.96:9000',{
    auth: {
      token: localStorage.token,
      user: localStorage.user,
      id: localStorage.id
    }
});

export default socket;