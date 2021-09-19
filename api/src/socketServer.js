"use strict";
exports.__esModule = true;
var express = require("express");
var http = require('http');
var appSocket = express();
var server = http.createServer(appSocket);
// const socketio = require('socket.io')
var io = require("socket.io")(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"],
        allowedHeaders: ["my-custom-header"],
        credentials: true
    }
});
require("reflect-metadata");
var cors = require("cors");
// import socketServer from "./socket";
// const io = socketServer(server);
appSocket.use(express.json());
appSocket.use(express.urlencoded({ extended: false }));
appSocket.use(cors());
server.listen(9000, function () {
    console.log('Server listening at port 9000.');
});
io.on('connection', function (socket) {
    socket.on('connected', function (name) {
        socket.broadcast.emit('messages', { name: name, msg: name + " has joined." });
    });
    socket.on('message', function (data) {
        io.to(data.roomId).emit('messages', { msg: data.msg });
    });
    socket.on('disconnect', function () {
        io.emit('messages', { server: 'Server', message: 'Has left the room.' });
    });
    socket.on('joinRoom', function (roomId) {
        socket.join(parseInt(roomId));
    });
    socket.on('roomTest', function (_a) {
        var room = _a.room;
        socket.to(room.emit('roomAction', {}));
    });
});
// io.on('roomAccess', socket => {
//    const connectedSockets = io.sockets.adapter.rooms.get(message.roomId);
//    const socketRooms = Array.from(socket.rooms.values()).filter((r) => r !== socket.id)
//    socket.on('connected', (name) => {
//       socket.broadcast.emit('messages', {name, msg: `${name} has joined.`})
//    });
// })
