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
var socketTournaments = require("./socketTournaments")(io)
require("reflect-metadata");
var cors = require("cors");
const { type } = require("os");
// import socketServer from "./socket";
// const io = socketServer(server);
appSocket.use(express.json());
appSocket.use(express.urlencoded({ extended: false }));
appSocket.use(cors());
server.listen(9000, function () {
    console.log('Server listening at port 9000.');
});

var activeRooms = []
let timeOut;

// objeto con todas las propiedasdes comunes de la partida
const table = {
    //estas son las propiedades que son comunes a todos los juegos
    trucoValue: {truco: 2, retruco: 3, valeCuatro: 4}, //lista valor de trucos
    envidoValue: {envido: 2, realEnvido: 3},  //lista valor envido individual
    players: [],
    turn: 1,
    betsList: {firstTurn: ["truco", "envido1", "realEnvido", "faltaEnvido", "ir al mazo"],
                otherTurn: ["truco", "ir al mazo"],
                noTruco: ["ir al mazo"],
                firstTurnFlor: ["truco", "envido1", "realEnvido", "faltaEnvido", "ir al mazo", "flor"],
                flor: ["con flor me achico", "con flor quiero", "contraFlorAlResto", "contraFlor"],
                contraFlorAlResto: ["con flor me achico", "con flor quiero"],
                contraFlor: ["con flor me achico", "con flor quiero"],
                truco: ["no quiero truco", "quiero truco", "retruco", "valeCuatro"],
                retruco: ["no quiero retruco", "quiero retruco"],
                valeCuatro: ["no quiero valeCuatro", "quiero valeCuatro"],
                envido1: ["no quiero envido1", "quiero envido1", "envido2", "realEnvido", "faltaEnvido"],
                envido2: ["no quiero envido2", "quiero envido2", "realEnvido", "faltaEnvido"],
                realEnvido: ["no quiero realEnvido", "quiero realEnvido", "faltaEnvido"],
                faltaEnvido: ["no quiero faltaEnvido", "quiero faltaEnvido"],

                }, //la lista de apuestas posibles la idea es que es un objeto con propiedades de apuestas posibles y un array con cada posible respuesta
    games: {}, //objeto que contiene todas las partidas jugandose, la propiedad es el id de cada Rooom
  };
  /*como se veria table.games {
        1234: {
            playerOne: {
                id: 2144124,
                name: "player",
                score: 0,
                hand: [],
                turnNumber: 1
                isTurn: false,
                betOptions: [],
                tableRival: [],
                tablePlayer: [],
                bet: false,
                roundResults: [],
                starts: true,
            },
            playerTwo:{
                //igual que playerOne
            },
            common:{
                envidoList: [],
                trucoBet: 1,
                scoreToWin: 15,
                matchesToWin: 1, 
                flor: true,
                cumulativeScore: 1,
                time: 15 * 1000,
                roundResults: [],
                turn: 1,
            }
        }
  }
*/
  // devuelve el objeto deck para la partida
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
  
  // Fisher-Yates shuffle algorithm 
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
  
  // le hace pop al deck y devuelve carta ()
function getCard(deck){
return deck.pop();
}

  // devuelve dos arrays de 3 cartas (manos) de cada jugador
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

//regresa puntos para la apuesta envido de una mano
function envidoCount(hand){
    let envido1 = new Set();
    hand.forEach(card => {if(card.number < 10)return card;else card.number = 0; return card});
    hand.forEach(card => envido1.add(card.suit));
    console.log(envido1)
    if(envido1.size === 3){
        hand = hand.sort((a, b)=> (a.number > b.number) ? 1 : -1);
        console.log(hand)
        const cardEnvido = hand.pop();
        return cardEnvido.number;
    }
    else if(envido1.size === 2){
        hand.sort((a, b)=> (a.suit > b.suit)? 1: -1);
        console.log(hand);
        if(hand[0].suit === hand[1].suit) return(hand[0].number + hand[1].number + 20);
        else return (hand[1].number + hand[2].number + 20);
    }
    else if(envido1.size === 1){
        hand = hand.sort((a, b)=> (a.number < b.number) ? 1 : -1);
        return (hand[0].number + hand[1].number + 20);
    }
}

// function roundCheckWinner(cardA, cardB){
//     if(cardA.truco < cardB.truco){
//       table.games. .push("winner");
//       // playerA.score++;
//       playerB.rounds.push("losser");
//     }
//     else if(playerA[mesa].truco > playerB[mesa].truco){
//       playerA.rounds.push("losser");
//       playerB.rounds.push("winner");
//       // playerB.score++;
//     }
//     else{
//       playerA.rounds.push("tie");
//       playerB.rounds.push("tie");
//     }
//     console.log(playerA.name, playerA.rounds)
//   }
// function nextTurn(){
//     table.turn = table.currentTurn++ % table.numberPlayers;

//     setTimeOut();
// }
// function setTimeOut(){
//     timeOut = setTimeout(()=>{
//         nextTurn();
//         console.log("cambio turno");
//     }, table.waitingTime);
// }

// function resetTimeOut(){
//     if(typeof timeOut === "object"){
//         console.log("timeout reset");
//         clearTimeout(timeOut);
//     }
// }

  
//Hacer passport
// io.use((socket, next) => {
//     console.log("socket.handshake.auth (middleware)", socket.handshake.auth)
//     if (true) {
//       next();

//     } else {
//       next(new Error("invalid"));
//     }
// });


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

    //evento por si alguien crea una sala o entra a una
    socket.on('joinRoom', function (roomId) {
        const clients = io.sockets?.adapter.rooms.get(roomId) //set de clientes en room
        if(clients?.size < 2 || clients === undefined){ //revisar si la sala esta llena, para evitar que se unan mas, modificar el 2 con variable par ampliar luego a mas jugadores
        socket.join(parseInt(roomId));
       
        if(activeRooms.indexOf(roomId) === -1) activeRooms = [...activeRooms, roomId] 
        else console.log(roomId, 'ya existe');
        console.log("active rooms: ", activeRooms)
        }
        if(clients?.size === 2) { //si la sala esta llena, empieza toda la preparacion de la partida
            activeRooms =  activeRooms.filter(room=> room!== roomId)
            socket.emit("roomFull", false);
            let iterator = clients.values();
            const player1 = iterator.next().value;
            const player2 = iterator.next().value;
            console.log(clients.values())

            //dejar listo la propiedad con el id de la sala que contendra todo lo que ocurra en esta mientras dure la partida
            table.games[roomId]={};
            table.games[roomId].playerOne = {
                id: player1,
                name: "player1",
                score: 0,
                hand: [],
                turnNumber: 1,
                isTurn: true,
                betOptions: [],
                tableRival: [],
                tablePlayer: [],
                bet: false,
                roundResults: [],
                starts: true,
            };
            table.games[roomId].playerTwo = {
                id: player2,
                name: "player2",
                score: 0,
                hand: [],
                turnNumber: 1,
                isTurn: false,
                betOptions: [],
                tableRival: [],
                tablePlayer: [],
                bet: false,
                roundResults: [],
                starts: false,
            };
            table.games[roomId].common ={
                envidoList: [],
                trucoBet: 1,
                scoreToWin: 15,
                matchesToWin: 1, 
                flor: true,
                cumulativeScore: 1,
                time: 15 * 1000,
                numberPlayers: 2,
                roundResults: [],
                turn: 1,
            }

            let deck = buildDeck(); //construye deck
            deck = shuffleDeck(deck); //baraja deck
            const [playerAhand, playerBhand] = getHands(deck); //obtiene manos de 3 cartas de dos jugadores

            //manos iniciales al iniciar partida
            table.games[roomId].playerOne.hand = playerAhand;
            table.games[roomId].playerTwo.hand = playerBhand;

            //dejar las apuestas al comienzo
            table.games[roomId].playerOne.betOptions = table.betsList.firstTurn;
            table.games[roomId].playerTwo.betOptions = table.betsList.firstTurn;

            //emitir como deberia ser el jugador de cada cliente
            io.to(player1).emit("gameStarts", table.games[roomId].playerOne);
            io.to(player2).emit("gameStarts", table.games[roomId].playerTwo);

         } //remover la sala de la lista si esta llena
         io.emit("newRoomCreated"); // informar a todos los clientes lista neuvas creadas o cerradas
    });
    socket.on('roomTest', function (_a) {
        var room = _a.room;
        socket.to(room.emit('roomAction', {}));
    });
    socket.on('bringActiveRooms', function () {
        io.emit('showActiveRooms', { activeRooms });
    });

    //GAME EVENTS

    socket.on("bet", (betPick, roomId, playerId) => {
        table.games[roomId].playerOne.bet = true;
        table.games[roomId].playerTwo.bet = true;
        table.games[roomId].playerOne.id === playerId? io.to(table.games[roomId].playerTwo.id).emit("betting", true) : io.to(table.games[roomId].playerOne.id).emit("betting", true);
        table.games[roomId].playerOne.id === playerId? io.to(table.games[roomId].playerTwo.id).emit("changeTurn", true) : io.to(table.games[roomId].playerOne.id).emit("changeTurn", true);
        if(betPick === "ir al mazo") {
            table.games[roomId].playerOne.id === playerId? table.games[roomId].playerTwo.score++ : table.games[roomId].playerOne.score+= Math.floor(table.games[roomId].common.trucoBet/2) || 1;

            //reiniciar estados de playerOne, Two y common para empezar siguiente ronda
            table.games[roomId].playerOne = {...table.games[roomId].playerOne, turnNumber: 1,
                tableRival: [],
                tablePlayer: [],
                bet: false,
                roundResults: [],}
            table.games[roomId].playerTwo = {...table.games[roomId].playerTwo, turnNumber: 1,
                tableRival: [],
                tablePlayer: [],
                bet: false,
                roundResults: [],}
            table.games[roomId].common = {...table.games[roomId].common, envidoList: [],
                trucoBet: 1,
                cumulativeScore: 0,
                roundResults: [],
                turn: 1,}

            let deck = buildDeck(); //contruye deck
            deck = shuffleDeck(deck); //baraja deck
            const [playerAhand, playerBhand] = getHands(deck); //obtiene manos de 3 cartas de dos jugadores
    
            //manos iniciales al iniciar partida
            table.games[roomId].playerOne.hand = playerAhand;
            table.games[roomId].playerTwo.hand = playerBhand;
    
            //dejar las apuestas al comienzo
            table.games[roomId].playerOne.betOptions = table.betsList.firstTurn;
            table.games[roomId].playerTwo.betOptions = table.betsList.firstTurn;
    
            //cambiar de jugador que inicia
            if(table.games[roomId].playerOne.starts){
                table.games[roomId].playerTwo.isTurn = true;
                table.games[roomId].playerOne.isTurn = false;
                table.games[roomId].playerOne.starts = false;
            }else{
                table.games[roomId].playerOne.isTurn = true;
                table.games[roomId].playerTwo.isTurn = false;
                table.games[roomId].playerOne.starts = true;
            };
            //emitir como deberia cambiar el jugador de cada cliente
            io.to(table.games[roomId].playerOne.id).emit("newRoundStarts", table.games[roomId].playerOne);
            io.to(table.games[roomId].playerTwo.id).emit("newRoundStarts", table.games[roomId].playerTwo);
           
        }
        else if(betPick === "quiero truco") {
            table.games[roomId].common.trucoBet = 2;
            io.in(roomId).emit("betting", false);
        }
        else if(betPick === "no quiero truco") {
            if(table.games[roomId].playerOne.id ===playerId){
                table.games[roomId].playerTwo.score++;
                io.to(table.games[roomId].playerTwo.id).emit("updateScore", 1);
            }
            else{
                table.games[roomId].playerOne.score++;
                io.to(table.games[roomId].playerOne.id).emit("updateScore", 1);
            }  
            io.in(roomId).emit("betting", false);
        }
        else if(betPick === "quiero retruco") {
            table.games[roomId].common.trucoBet = 3;
            io.in(roomId).emit("betting", false);
        }
        else if(betPick === "no quiero retruco") {
            if(table.games[roomId].playerOne.id ===playerId){
                table.games[roomId].playerTwo.score+= 2;
                io.to(table.games[roomId].playerTwo.id).emit("updateScore", 2);
            }
            else{
                table.games[roomId].playerOne.score+= 2;
                io.to(table.games[roomId].playerOne.id).emit("updateScore", 2);
            } 
            io.in(roomId).emit("betting", false);      
        }
        else if(betPick === "quiero valeCuatro") {
            table.games[roomId].common.trucoBet = 4;
            io.in(roomId).emit("betting", false);
        }
        else if(betPick === "no quiero valeCuatro") {
            if(table.games[roomId].playerOne.id ===playerId){
                table.games[roomId].playerTwo.score+= 3;
                io.to(table.games[roomId].playerTwo.id).emit("updateScore", 3);
            }
            else{
                table.games[roomId].playerOne.score+= 3;
                io.to(table.games[roomId].playerOne.id).emit("updateScore", 3);
            } 
            io.in(roomId).emit("betting", false);    
        }
        else if(betPick === "quiero envido1"){
                io.in(roomId).emit("betting", false);
                const playerOneEnvido = envidoCount(table.games[roomId].playerOne.hand);
                const playerTwoEnvido = envidoCount(table.games[roomId].playerTwo.hand);
                if(playerOneEnvido > playerTwoEnvido) table.games[roomId].playerOne.score+=2;
                else if(playerOneEnvido < playerTwoEnvido) table.games[roomId].playerTwo.score+=2;
                else table.games[roomId].playerOne.starts? table.games[roomId].playerOne.score+=2 : table.games[roomId].playerTwo.score+=2;            
        }
        else if(betPick === "no quiero envido1"){
            if(table.games[roomId].playerOne.id ===playerId){
                table.games[roomId].playerTwo.score+= 1;
                io.to(table.games[roomId].playerTwo.id).emit("updateScore", 1);
            }
            else{
                table.games[roomId].playerOne.score+= 1;
                io.to(table.games[roomId].playerOne.id).emit("updateScore", 1);
            } 
            io.in(roomId).emit("betting", false);
        }
        else if(betPick === "quiero envido2"){
            io.in(roomId).emit("betting", false);
            const playerOneEnvido = envidoCount(table.games[roomId].playerOne.hand);
            const playerTwoEnvido = envidoCount(table.games[roomId].playerTwo.hand);
            if(playerOneEnvido > playerTwoEnvido) table.games[roomId].playerOne.score+=4;
            else if(playerOneEnvido < playerTwoEnvido) table.games[roomId].playerTwo.score+=4;
            else table.games[roomId].playerOne.starts? table.games[roomId].playerOne.score+=4 : table.games[roomId].playerTwo.score+=4; 
        }
        else if(betPick === "no quiero envido2"){
            if(table.games[roomId].playerOne.id ===playerId){
                table.games[roomId].playerTwo.score+= 2;
                io.to(table.games[roomId].playerTwo.id).emit("updateScore", 2);
            }
            else{
                table.games[roomId].playerOne.score+= 2;
                io.to(table.games[roomId].playerOne.id).emit("updateScore", 2);
            } 
            io.in(roomId).emit("betting", false);
        }
        else if(betPick === "quiero realEnvido"){
            io.in(roomId).emit("betting", false);
            const playerOneEnvido = envidoCount(table.games[roomId].playerOne.hand);
            const playerTwoEnvido = envidoCount(table.games[roomId].playerTwo.hand);
            if(playerOneEnvido > playerTwoEnvido) table.games[roomId].playerOne.score+=3;
            else if(playerOneEnvido < playerTwoEnvido) table.games[roomId].playerTwo.score+=3;
            else table.games[roomId].playerOne.starts? table.games[roomId].playerOne.score+=3 : table.games[roomId].playerTwo.score+=3; 
        }
        else if(betPick === "no quiero realEnvido"){
            if(table.games[roomId].playerOne.id ===playerId){
                table.games[roomId].playerTwo.score+= 1;
                io.to(table.games[roomId].playerTwo.id).emit("updateScore", 1);
            }
            else{
                table.games[roomId].playerOne.score+= 1;
                io.to(table.games[roomId].playerOne.id).emit("updateScore", 1);
            } 
            io.in(roomId).emit("betting", false);
        }
        else if(betPick === "quiero faltaEnvido"){
            const points = table.games[roomId].playerOne.score > table.games[roomId].playerTwo.score? table.games[roomId].playerOne.score : table.gmaes[roomId].playerTwo.score;
            table.games[roomId].common.cumulativeScore = (table.games[roomId].common.scoreToWin - points);
            io.in(roomId).emit("betting", false);
            const playerOneEnvido = envidoCount(table.games[roomId].playerOne.hand);
            const playerTwoEnvido = envidoCount(table.games[roomId].playerTwo.hand);
            if(playerOneEnvido > playerTwoEnvido) table.games[roomId].playerOne.score+=table.games[roomId].common.cumulativeScore;
            else if(playerOneEnvido < playerTwoEnvido) table.games[roomId].playerTwo.score+=table.games[roomId].common.cumulativeScore;
            else table.games[roomId].playerOne.starts? table.games[roomId].playerOne.score+=table.games[roomId].common.cumulativeScore : table.games[roomId].playerTwo.score+=table.games[roomId].common.cumulativeScore; 
        }
        else if(betPick === "no quiero faltaEnvido"){
            if(table.games[roomId].playerOne.id ===playerId){
                table.games[roomId].playerTwo.score+= 1;
                io.to(table.games[roomId].playerTwo.id).emit("updateScore", 1);
            }
            else{
                table.games[roomId].playerOne.score+= 1;
                io.to(table.games[roomId].playerOne.id).emit("updateScore", 1);
            } 
            io.in(roomId).emit("betting", false);
        }
        else{
        table.games[roomId].playerOne.id === playerId? io.to(table.games[roomId].playerTwo.id).emit("changeTurn", true) : io.to(table.games[roomId].playerOne.id).emit("changeTurn", true);
        table.games[roomId].playerOne.id === playerId? io.to(table.games[roomId].playerTwo.id).emit("bet", table.betsList[betPick]) : io.to(table.games[roomId].playerOne.id).emit("bet", table.betsList[betPick]);
        }
    });
    socket.on("playCard", async(card, roomId, playerId) => {
        if(table.games[roomId].playerOne.id === playerId){
            await io.to(table.games[roomId].playerTwo.id).emit("playCard", card, true);
            table.games[roomId].playerTwo.tableRival.push(card);
            table.games[roomId].playerOne.tablePlayer.push(card);
        }
        else{
            await io.to(table.games[roomId].playerOne.id).emit("playCard", card, true);
            table.games[roomId].playerOne.tableRival.push(card);
            table.games[roomId].playerTwo.tablePlayer.push(card);
        }

        if(table.games[roomId].playerOne.tableRival[0] && table.games[roomId].playerTwo.tableRival[0] && table.games[roomId].common.turn === 1){
            if(table.games[roomId].playerOne.tablePlayer[0].truco < table.games[roomId].playerTwo.tablePlayer[0].truco){
                table.games[roomId].common.roundResults.push("playerOne");
            }
            else if(table.games[roomId].playerOne.tablePlayer[0].truco > table.games[roomId].playerTwo.tablePlayer[0].truco){
                table.games[roomId].common.roundResults.push("playerTwo");
            }
            else{
                table.games[roomId].common.roundResults.push("tie");
            }
            table.games[roomId].common.turn = 2;
            table.games[roomId].common.trucoBet > 1? io.in(roomId).emit("bet", table.betsList.noTruco) : io.in(roomId).emit("bet", table.betsList.otherTurn);
        }

        if(table.games[roomId].playerOne.tableRival[1] && table.games[roomId].playerTwo.tableRival[1] && table.games[roomId].common.turn === 2){
            if(table.games[roomId].playerOne.tablePlayer[1].truco < table.games[roomId].playerTwo.tablePlayer[1].truco ){
                table.games[roomId].common.roundResults.push("playerOne");
            }
            else if(table.games[roomId].playerOne.tablePlayer[1].truco > table.games[roomId].playerTwo.tablePlayer[1].truco){
                table.games[roomId].common.roundResults.push("playerTwo");
            }
            else{
                table.games[roomId].common.roundResults.push("tie");
            }
            table.games[roomId].common.turn = 3;
            table.games[roomId].common.trucoBet > 1? io.in(roomId).emit("bet", table.betsList.noTruco) : io.in(roomId).emit("bet", table.betsList.otherTurn);
        }

        if(table.games[roomId].playerOne.tableRival[2] && table.games[roomId].playerTwo.tableRival[2] && table.games[roomId].common.turn === 3){
            if(table.games[roomId].playerOne.tablePlayer[2].truco < table.games[roomId].playerTwo.tablePlayer[2].truco){
                table.games[roomId].common.roundResults.push("playerOne");
            }
            else if(table.games[roomId].playerOne.tablePlayer[2].truco > table.games[roomId].playerTwo.tablePlayer[2].truco){
                table.games[roomId].common.roundResults.push("playerTwo");
            }
            else{
                table.games[roomId].common.roundResults.push("tie");
            }
            table.games[roomId].common.turn = 4;
            table.games[roomId].common.trucoBet > 1? io.in(roomId).emit("bet", table.betsList.noTruco) : io.in(roomId).emit("bet", table.betsList.otherTurn);
        }

        console.log(table.games[roomId].common.roundResults)
        if(table.games[roomId].common.roundResults.length >= 2){
            let winner = false;
            if((table.games[roomId].common.roundResults.filter(round => round === "playerOne").length >1) || 
            (table.games[roomId].common.roundResults.filter(round => round === "tie").length === 2 && table.games[roomId].common.roundResults.some(round => round === "playerOne")) ||
            table.games[roomId].common.roundResults.every(round => round === "tie") && table.games[roomId].common.roundResults.length === 3 && table.games[roomId].playerOne.starts){
                winner = true;
                table.games[roomId].playerOne.score+= table.games[roomId].common.trucoBet;
            }
            else if((table.games[roomId].common.roundResults.filter(round => round === "playerTwo").length >1) || 
            (table.games[roomId].common.roundResults.filter(round => round === "tie").length === 2 && table.games[roomId].common.roundResults.some(round => round === "playerTwo"))||
            table.games[roomId].common.roundResults.every(round => round === "tie") && table.games[roomId].common.roundResults.length === 3 && table.games[roomId].playerTwo.starts){
                winner = true;
                table.games[roomId].playerTwo.score+= table.games[roomId].common.trucoBet;
            } 
            else if(table.games[roomId].common.roundResults.length >= 3){
                for (let i = 0; i < 3; i++) {
                  if(table.games[roomId].common.roundResults[i] === "playerOne"){
                      table.games[roomId].playerOne.score+= table.games[roomId].common.trucoBet;
                      winner = true;
                    };
                  if(table.games[roomId].common.roundResults[i] === "playerTwo") {
                      table.games[roomId].playerTwo.score+= table.games[roomId].common.trucoBet;
                      winner = true;
                    
                    };      
                };
            };
            if(winner){
                //reiniciar estados de playerOne, Two y common para empezar siguiente ronda
                table.games[roomId].playerOne = {...table.games[roomId].playerOne, turnNumber: 1,
                    tableRival: [],
                    tablePlayer: [],
                    bet: false,
                    roundResults: [],}
                table.games[roomId].playerTwo = {...table.games[roomId].playerTwo, turnNumber: 1,
                    tableRival: [],
                    tablePlayer: [],
                    bet: false,
                    roundResults: [],}
                table.games[roomId].common = {...table.games[roomId].common, envidoList: [],
                    trucoBet: 1,
                    cumulativeScore: 1,
                    roundResults: [],
                    turn: 1,}

                let deck = buildDeck(); //contruye deck
                deck = shuffleDeck(deck); //baraja deck
                const [playerAhand, playerBhand] = getHands(deck); //obtiene manos de 3 cartas de dos jugadores
        
                //manos iniciales al iniciar partida
                table.games[roomId].playerOne.hand = playerAhand;
                table.games[roomId].playerTwo.hand = playerBhand;
        
                //dejar las apuestas al comienzo
                table.games[roomId].playerOne.betOptions = table.betsList.firstTurn;
                table.games[roomId].playerTwo.betOptions = table.betsList.firstTurn;
        
                //cambiar de jugador que inicia
                if(table.games[roomId].playerOne.starts){
                    table.games[roomId].playerTwo.isTurn = true;
                    table.games[roomId].playerOne.isTurn = false;
                    table.games[roomId].playerOne.starts = false;
                }else{
                    table.games[roomId].playerOne.isTurn = true;
                    table.games[roomId].playerTwo.isTurn = false;
                    table.games[roomId].playerOne.starts = true;
                };
                //emitir como deberia cambiar el jugador de cada cliente
                io.to(table.games[roomId].playerOne.id).emit("newRoundStarts", table.games[roomId].playerOne);
                io.to(table.games[roomId].playerTwo.id).emit("newRoundStarts", table.games[roomId].playerTwo);
                }
        }
    });
    socket.on("changeTurn", (roomId, playerId)=>{
        // socket.to(roomId).emit("playerOrder", false);
        // socket.emit("playerOrder", true);
        if(table.games[roomId].playerOne.id === playerId){
            io.to(table.games[roomId].playerTwo.id).emit("changeTurn", false);
            io.to(table.games[roomId].playerOne.id).emit("changeTurn", true);
        }
        else{
            io.to(table.games[roomId].playerTwo.id).emit("changeTurn", true);
            io.to(table.games[roomId].playerOne.id).emit("changeTurn", false);
        }
    });
    socket.on("roundWin", (roomId, socketId)=>{
        socket.to()
    })
});
