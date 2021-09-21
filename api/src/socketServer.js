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

var activeRooms = []


const table = {
    envidoList: [], // lista con la acumulacion de envidos
    trucoValue: {truco: 2, retruco: 3, valeCuatro: 4}, //lista valor de trucos
    envidoValue: {envido: 2, realEnvido: 3},  //lista valor envido individual
    scoreToWin: 15, // puntaje para ganar partida/chico 
    matchesToWin: 1, // partidas para ganar el juego
    flor: true, //opcion para activar o desactivar flor
    cumulativeScore: 1, //puntaje
    turn: 1, // turno actual
    betsList: {firstTurn: ["truco", "envido1", "realEnvido", "faltaEnvido", "ir al mazo"],
                secondTurn: ["truco", "ir al mazo"],
                thirdTurn: ["truco", "ir al mazo"],
                firstTurnFlor: ["truco", "envido1", "realEnvido", "faltaEnvido", "ir al mazo", "flor"],
                flor: ["con flor me achico", "con flor quiero", "contraFlorAlResto", "contraFlor"],
                contraFlorAlResto: ["con flor me achico", "con flor quiero"],
                contraFlor: ["con flor me achico", "con flor quiero"],
                truco: ["no quiero truco", "quiero truco", "retruco", "valeCuatro"],
                retruco: ["no quiero retruco", "quiero retruco"],
                valeCuatro: ["no quiero valeCuatro", "quiero valeCuatro"],
                envido1: ["no quiero", "quiero", "envido2", "realEnvido", "faltaEnvido"],
                envido2: ["no quiero", "quiero", "realEnvido", "faltaEnvido"],
                realEnvido: ["noQuiero", "faltaEnvido"],
                faltaEnvido: ["noQuiero", "quiero"]
                }, //la lista de apuestas posibles la idea es que es un objeto con propiedades de apuestas posibles y un array con cada posible respuesta
    bet: false, //estado para renocer si hubo o no una apuesta y parar el flujo normal del juego
    skip: false, // auxiliar para saltar
  };

  function buildDeck(){
    let deck = [{ id: 1, suit: 'copas', number: 1, truco: 7},
            { id: 2, suit: 'copas', number: 2, truco: 6 },
            { id: 3, suit: 'copas', number: 3, truco: 5},
            { id: 4, suit: 'copas', number: 4, truco: 14 },
            { id: 5, suit: 'copas', number: 5, truco: 13 },
            { id: 6, suit: 'copas', number: 6, truco: 12 },
            { id: 7, suit: 'copas', number: 7, truco: 11},
            { id: 10, suit: 'copas', number: 10, truco: 10 },
            { id: 11, suit: 'copas', number: 11, truco: 9 },
            { id: 12, suit: 'copas', number: 12, truco: 8},
            { id: 13, suit: 'bastos', number: 1, truco: 2},
            { id: 14, suit: 'bastos', number: 2, truco: 6 },
            { id: 15, suit: 'bastos', number: 3, truco: 5},
            { id: 16, suit: 'bastos', number: 4, truco: 14 },
            { id: 17, suit: 'bastos', number: 5, truco: 13 },
            { id: 18, suit: 'bastos', number: 6, truco: 12 },
            { id: 19, suit: 'bastos', number: 7, truco: 11},
            { id: 22, suit: 'bastos', number: 10, truco: 10 },
            { id: 23, suit: 'bastos', number: 11, truco: 9 },
            { id: 24, suit: 'bastos', number: 12, truco: 8 },
            { id: 25, suit: 'espadas', number: 1, truco: 1},
            { id: 26, suit: 'espadas', number: 2, truco: 6,  },
            { id: 27, suit: 'espadas', number: 3, truco: 5},
            { id: 28, suit: 'espadas', number: 4, truco: 14 },
            { id: 29, suit: 'espadas', number: 5, truco: 13 },
            { id: 30, suit: 'espadas', number: 6, truco: 12 },
            { id: 31, suit: 'espadas', number: 7, truco: 3},
            { id: 34, suit: 'espadas', number: 10, truco: 10 },
            { id: 35, suit: 'espadas', number: 11, truco: 9 },
            { id: 36, suit: 'espadas', number: 12, truco: 8 },
            { id: 37, suit: 'oros', number: 1, truco: 7},
            { id: 38, suit: 'oros', number: 2, truco: 6 },
            { id: 39, suit: 'oros', number: 3, truco: 5},
            { id: 40, suit: 'oros', number: 4, truco: 14 },
            { id: 41, suit: 'oros', number: 5, truco: 13 },
            { id: 42, suit: 'oros', number: 6, truco: 12 },
            { id: 43, suit: 'oros', number: 7 , truco: 4},
            { id: 46, suit: 'oros', number: 10, truco: 10 },
            { id: 47, suit: 'oros', number: 11, truco: 9 },
            { id: 48, suit: 'oros', number: 12, truco: 8 }
    ]
    return deck
  }
  
  function shuffleDeck(deck){
    let currentIndex = deck.length;
    let randomIndex;
    while(currentIndex != 0){
  
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      [deck[currentIndex], deck[randomIndex]] = [deck[randomIndex], deck[currentIndex]];
    }
  
    return deck;
  }
  
  function getCard(deck){
    return deck.pop();
  }

  function getHands(deck){
    const playerAhand = [];
    const playerBhand = [];
    playerAhand.push(getCard(deck));
    playerBhand.push(getCard(deck));
    playerAhand.push(getCard(deck));
    playerBhand.push(getCard(deck));
    playerAhand.push(getCard(deck));
    playerBhand.push(getCard(deck));
    return [playerAhand, playerBhand]
  }




io.on('connection', function (socket) {

    socket.on('connected', function (name) {
        // socket.broadcast.emit('messages', { name: name, msg: name + " has joined." });
    });
    socket.on('message', function (data) {
        io.to(data.roomId).emit('messages', { msg: data.msg });
    });
    socket.on('disconnect', function () {
        io.emit('messages', { server: 'Server', message: 'Has left the room.' });
    });
    socket.on('joinRoom', function (roomId) {
        socket.join(parseInt(roomId));
        if(activeRooms.indexOf(roomId) === -1) activeRooms = [...activeRooms, roomId]
        else console.log(roomId, 'ya existe');
        console.log(activeRooms)
    });
    socket.on('roomTest', function (_a) {
        var room = _a.room;
        socket.to(room.emit('roomAction', {}));
    });
    socket.on('bringActiveRooms', function () {
        io.emit('showActiveRooms', { activeRooms });
    });
    socket.on("newRoundStarts", ()=>{
        let deck = buildDeck();
        deck = shuffleDeck(deck);
        const [playerAhand, playerBhand] = getHands(deck);
        socket.emit("newRoundStarts", playerAhand);
        socket.broadcast.emit("newRoundStarts", playerBhand);
        io.emit("bet", table.betsList.firstTurn);
    });
    socket.on("bet", function(betPick){
        socket.broadcast.emit("bet", table.betsList[betPick])
        console.log(table.betsList[betPick])
    })




    /*
    function getActiveRooms(io) {
    // Convert map into 2D list:
    // ==> [['4ziBKG9XFS06NdtVAAAH', Set(1)], ['room1', Set(2)], ...]
    const arr = Array.from(io.sockets.adapter.rooms);
    // Filter rooms whose name exist in set:
    // ==> [['room1', Set(2)], ['room2', Set(2)]]
    const filtered = arr.filter(room => !room[1].has(room[0]))
    // Return only the room name: 
    // ==> ['room1', 'room2']
    const res = filtered.map(i => i[0]);
    return res;
}
    */
});
// io.on('roomAccess', socket => {
//    const connectedSockets = io.sockets.adapter.rooms.get(message.roomId);
//    const socketRooms = Array.from(socket.rooms.values()).filter((r) => r !== socket.id)
//    socket.on('connected', (name) => {
//       socket.broadcast.emit('messages', {name, msg: `${name} has joined.`})
//    });
// })
