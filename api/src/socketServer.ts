const express = require("express");
const http = require('http');
const appSocket = express();
const server = http.createServer(appSocket);

const socketio = require('socket.io')
const io = socketio(server)

import "reflect-metadata";
import * as cors from "cors";
import { SocketRooms } from "socket-controllers";
// import socketServer from "./socket";
// const io = socketServer(server);

appSocket.use(express.json());
appSocket.use(express.urlencoded({ extended: false }));
appSocket.use(cors());
 
server.listen(9000, () => {
   console.log('Server listening at port 9000.')
});

io.on('connection', socket => {

   socket.on('connected', (name) => {
      socket.broadcast.emit('messages', {name, msg: `${name} has joined.`})
   });
   socket.on('message', (data) => {
      io.to(data.roomId).emit('messages', {msg: data.msg});
   });
   socket.on('disconnect', () => {
      io.emit('messages', {server: 'Server', message: 'Has left the room.'})
   })
   socket.on('joinRoom', (roomId) => {
      socket.join(parseInt(roomId));
   })
   socket.on('roomTest', ({room}) => {
      socket.to(room.emit('roomAction', {}))
   })

})

// io.on('roomAccess', socket => {

//    const connectedSockets = io.sockets.adapter.rooms.get(message.roomId);
//    const socketRooms = Array.from(socket.rooms.values()).filter((r) => r !== socket.id)

//    socket.on('connected', (name) => {
//       socket.broadcast.emit('messages', {name, msg: `${name} has joined.`})
//    });
   
// })
 
 
 