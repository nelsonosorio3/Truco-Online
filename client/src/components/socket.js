import { io } from "socket.io-client";

// console.log("Desde socket.js", localStorage.token)
let socket = io('/test',{
    auth: {
      token: localStorage.token,
      user: localStorage.user,
      id: localStorage.id
    }
});

export default socket;