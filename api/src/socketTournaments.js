const axios = require("axios");

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
        // console.log("active tournaments: ", activeTournaments)
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

//////////////////////////// LÓGICA PARA LA SUCUESIÓN DE PARTIDAS ////////////////////////////

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

      socket.on('setWinner', function(data) {
        console.log('DATA DE WINS:', data)
        tournamentsInCourse.map(t => {
          if(t.tournamentId === data.tournamentId) { 
            if(!t.results) t.results = [];
            t.results = [...t.results, data.playerWins]
          }
          if(t.results.length===4) io.to(data.tournamentId).emit('showWinner', (t.results));
        })
      })

      socket.on('tournamentGame', async function (data) {
        const clients = io.sockets?.adapter.rooms.get(data.matchId) //set de clientes en room
        console.log('DATA', data)

        io.to(data.matchId).emit('startGame');
        if(clients?.size < 2 || clients === undefined){ //revisar si la sala esta llena, para evitar que se unan mas, modificar el 2 con variable par ampliar luego a mas jugadores
          socket.join(data.matchId);           
      
          if(!table.games[data.matchId]){

            table.games[data.matchId]={};
            table.games[data.matchId].playerOne = {
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
            
            table.games[data.matchId].common = {
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
              // gameId: matchNumber.data
            }
            
          }
          else{
            console.log('AQUÍ LA SALA YA SE LLENÓ')
            table.games[data.matchId].playerTwo = {
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
            // axios.patch(`http://localhost:3001/api/games/${table.games[data.matchId].common.gameId}`,{},{
            //     headers: {
            //         "x-access-token": socket.handshake.auth.token,
            //     }});
          }
          let matchNumber = await axios.post(`https://trucohenry.com/api/games`,{},{
                headers: {
                    "x-access-token": socket.handshake.auth.token || 1,
          }});
          if(!table.games[data.matchId].common.gameId) table.games[data.matchId].common.gameId = matchNumber.data
        }
      
        if(clients?.size === 2) { //si la sala esta llena, empieza toda la preparacion de la partida
          console.log('TEST:', table.games[data.matchId])

          axios.patch(`https://trucohenry.com/api/games/${table.games[data.matchId].common.gameId}`,{},{
                headers: {
                    "x-access-token": socket.handshake.auth.token,
                }});
          if(data.matchNumber === 2) {
            io.to(data.matchId).emit("showGameTwo", (data.matchId));
          }
          else if(data.matchNumber === 3) {
            console.log('SE HA LLENADO LA CAPACIDAD PARA LA TERCERA PARTIDA')
            io.to(data.matchId).emit("showGameThree", (data.matchId));
          }
          else io.to(data.matchId).emit("showGame", (data.matchId));

          let iterator = clients.values();
          const player1 = iterator.next().value;
          const player2 = iterator.next().value;
          console.log('PLAYER 1:', player1, 'PLAYER 2:', player2)
          table.games[data.matchId].playerOne.id = player1;
          table.games[data.matchId].playerTwo.id = player2;
          table.games[data.matchId].playerOne.nameRival = table.games[data.matchId].playerTwo.name;
          table.games[data.matchId].playerTwo.nameRival = table.games[data.matchId].playerOne.name;
          //dejar listo la propiedad con el id de la sala que contendra todo lo que ocurra en esta mientras dure la partida
      
          let deck = buildDeck(); //construye deck
          deck = shuffleDeck(deck); //baraja deck
          const [playerAhand, playerBhand] = getHands(deck); //obtiene manos de 3 cartas de dos jugadores
      
          //manos iniciales al iniciar partida
          table.games[data.matchId].playerOne.hand = playerAhand;
          table.games[data.matchId].playerTwo.hand = playerBhand;
      
          //dejar las apuestas al comienzo
          table.games[data.matchId].playerOne.betOptions = table.betsList.firstTurn;
          table.games[data.matchId].playerTwo.betOptions = table.betsList.firstTurn;
      
          //emitir como deberia ser el jugador de cada cliente
          io.to(player1).emit("gameStarts", table.games[data.matchId].playerOne);
          io.to(player2).emit("gameStarts", table.games[data.matchId].playerTwo);
      
        } //remover la sala de la lista si esta llena
        console.log('CLIENTES', clients)
      })

      
////////////////////////////////////////////////////////////////////////////////////////////////


      socket.on('addMatchesList', function(data){
        let dataCopy = Object.assign({},data)
        if(dataCopy.matchesList.length > 0){
          tournamentsInCourse.map(t => {
            if(t.tournamentId === dataCopy.savedData[0].tournamentId) { 
              if(!t.matchesList && dataCopy.matchesList) {
                t.matchesList = dataCopy.matchesList;
                // socket.emit('setMatchesList', t.matchesList)
                io.to(dataCopy.savedData[0].tournamentId).emit('setMatchesList', t.matchesList)
              }
            }
          })
        }
      })

      socket.on('bringTournamentData', function (tournamentId) {
        let tournamentData;
        activeTournaments.forEach(t => t.tournamentId === tournamentId ? tournamentData = t : null)
        // console.log(tournamentData)
        socket.emit('sendTournamentData', (tournamentData))
      })

      socket.on('bringActiveTournaments', function () {
        let idTournaments = [];
        activeTournaments.forEach(t => idTournaments.push(t.tournamentId))
        io.emit('showActiveTournaments', (idTournaments) );
      })
      
      

    });
}
