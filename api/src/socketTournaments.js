const {table, buildDeck, shuffleDeck, getHands} = require("./socketGameLogicConst")

var activeTournaments = []
var tournamentsInCourse = []
var socketsInfo = []

exports = module.exports = function(io){
    io.sockets.on('connection', function (socket) {

      socket.on('createTournament', function (tournamentData) {
        console.log('Tournament data:', tournamentData );
        if(activeTournaments.indexOf(tournamentData.tournamentId) === -1){
            activeTournaments = [...activeTournaments, {tournamentId: tournamentData.tournamentId, players: []}]
            socket.join(tournamentData.tournamentId);
            activeTournaments.forEach(t => {if(t.tournamentId===tournamentData.tournamentId) t.players.push(tournamentData.user)})
            socketsInfo.push({socketId: socket.id, tournamentId: tournamentData.tournamentId})
        }
        else console.log(tournamentID, 'ya existe');
        console.log("active tournaments: ", activeTournaments)
        io.emit("newTournamentCreated");
        io.emit("newPlayerInside");
      });

      socket.on('joinTournament', function (tournamentData) {
        socket.join(tournamentData.tournamentId);
        const clients = io.sockets?.adapter.rooms.get(tournamentData.tournamentId)
        activeTournaments.forEach(t => {if(t.tournamentId===tournamentData.tournamentId) t.players.push(tournamentData.user)})
        if(clients?.size === 4){
          let dataObject;
          activeTournaments.forEach(t => {if(t.tournamentId===tournamentData.tournamentId) dataObject = Object.assign({}, t)})
          activeTournaments = activeTournaments.filter(t => t.tournamentId !== tournamentData.tournamentId)
          tournamentsInCourse.push(dataObject)
          io.emit('tournamentFull', (dataObject))
        }
        io.emit("newPlayerInside");
      })

      socket.on('matchesList', function(dataObject) {
        let newArray = []
        for(let i=0; i<dataObject.players.length; i++){
            for(let j=i; j<dataObject.players.length; j++){
                if(i!==j) newArray.push({
                  participants: [dataObject.players[i], dataObject.players[j]], 
                  matchId: `${dataObject.tournamentId}${dataObject.players[i]}${dataObject.players[j]}`
                })
            }
        }
        socket.emit('matches', (newArray));
      })

      socket.on('tournamentGame', function (matchId) {
        const clients = io.sockets?.adapter.rooms.get(matchId) //set de clientes en room
        console.log(matchId)
        // io.to(matchId).emit('startGame');
        if(clients?.size < 2 || clients === undefined){ //revisar si la sala esta llena, para evitar que se unan mas, modificar el 2 con variable par ampliar luego a mas jugadores
          socket.join(matchId);           
        }
        if(clients?.size === 2) { //si la sala esta llena, empieza toda la preparacion de la partida
          io.to(matchId).emit("showGame", (matchId));
          let iterator = clients.values();
          const player1 = iterator.next().value;
          const player2 = iterator.next().value;
          console.log(clients.values())
          //dejar listo la propiedad con el id de la sala que contendra todo lo que ocurra en esta mientras dure la partida
          table.games[matchId]={};
          table.games[matchId].playerOne = {
            id: player1,
            name: "player1",
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
          table.games[matchId].playerTwo = {
            id: player2,
            name: "player2",
            nameRival: "player1",
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
            starts: false,
          };
          table.games[matchId].common = {
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
          }
    
          let deck = buildDeck(); //construye deck
          deck = shuffleDeck(deck); //baraja deck
          const [playerAhand, playerBhand] = getHands(deck); //obtiene manos de 3 cartas de dos jugadores
    
          //manos iniciales al iniciar partida
          table.games[matchId].playerOne.hand = playerAhand;
          table.games[matchId].playerTwo.hand = playerBhand;
    
          //dejar las apuestas al comienzo
          table.games[matchId].playerOne.betOptions = table.betsList.firstTurn;
          table.games[matchId].playerTwo.betOptions = table.betsList.firstTurn;
    
          //emitir como deberia ser el jugador de cada cliente
          io.to(player1).emit("gameStarts", table.games[matchId].playerOne);
          io.to(player2).emit("gameStarts", table.games[matchId].playerTwo);
    
        } //remover la sala de la lista si esta llena

      })

      socket.on('bringTournamentData', function (tournamentId) {
        let tournamentData;
        activeTournaments.forEach(t => t.tournamentId === tournamentId ? tournamentData = t : null)
        console.log(tournamentData)
        socket.emit('sendTournamentData', (tournamentData))
      })

      socket.on('bringActiveTournaments', function () {
        let idTournaments = [];
        activeTournaments.forEach(t => idTournaments.push(t.tournamentId))
        io.emit('showActiveTournaments', (idTournaments) );
      })
      
      

    });
}
