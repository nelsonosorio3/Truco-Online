const axios = require("axios");
var activeRooms = []
const {table, buildDeck, shuffleDeck, getHands} = require("./socketGameLogicConst")

exports = module.exports = function(io){
    io.sockets.on('connection', function (socket) {

        socket.on('connected', function (name) {
            // socket.broadcast.emit('messages', { name: name, msg: name + " has joined." });
        });
        socket.on('message', function (data) {
            io.to(data.roomId).emit('messages', { msg: `${data.name}: ${data.msg}` });
        });
        socket.on('disconnect', function (reason) {
            io.emit('messages', { server: 'Server', message: 'Has left the room.' });
            // const clients = io.sockets?.adapter.rooms
            // notifyFriendOfDisconnect(socket)
        });

        socket.on("invite to game", (roomId, idReceiver, nameSender)=>{
            console.log(socket.id, "invitacion")
            socket.broadcast.emit("invite to game",roomId, idReceiver, nameSender);
        });
      
    
        //evento por si alguien crea una sala o entra a una
        socket.on('joinRoom', async function (roomId) {
            console.log(socket.handshake.auth.token)
            const clients = io.sockets?.adapter.rooms.get(roomId) //set de clientes en room
            if(clients?.size < 2 || clients === undefined){ //revisar si la sala esta llena, para evitar que se unan mas, modificar el 2 con variable par ampliar luego a mas jugadores
            socket.join(parseInt(roomId));
            
            if(!table.games[roomId]){
                table.games[roomId]={};
                table.games[roomId].playerOne = {
                id: 1,
                name: socket.handshake.auth.user || "jugador 1",
                nameRival: "player2",
                score: 0,
                scoreRival: 0,
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
                let matchNumber = await axios.post(`http://localhost:3001/api/games`,{},{
                headers: {
                    "x-access-token": socket.handshake.auth.token || 1,
                }});
                table.games[roomId].common ={
                    envidoList: [],
                    envidoBet: 0,
                    trucoBet: 1,
                    scoreToWin: 15,
                    matchesToWin: 1, 
                    flor: true,
                    cumulativeScore: 1,
                    time: 15 * 1000,
                    numberPlayers: 2,
                    roundResults: [],
                    turn: 1,
                    gameId: matchNumber.data,
                }
            }
            else{
                table.games[roomId].playerTwo = {
                    id: 2,
                    name: socket.handshake.auth.user || "jugador 2",
                    nameRival: "player2",
                    score: 0,
                    scoreRival: 0,
                    hand: [],
                    turnNumber: 1,
                    isTurn: false,
                    betOptions: [],
                    tableRival: [],
                    tablePlayer: [],
                    bet: false,
                    roundResults: [],
                    starts: true,
                    }
                axios.patch(`http://localhost:3001/api/games/${table.games[roomId].common.gameId}`,{},{
                    headers: {
                        "x-access-token": socket.handshake.auth.token || 1,
                    }});
            }
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
                table.games[roomId].playerOne.id = player1;
                table.games[roomId].playerTwo.id = player2;
                table.games[roomId].playerOne.nameRival = table.games[roomId].playerTwo.name;
                table.games[roomId].playerTwo.nameRival = table.games[roomId].playerOne.name;
                //dejar listo la propiedad con el id de la sala que contendra todo lo que ocurra en esta mientras dure la partida
    
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
    
      
    });
}
