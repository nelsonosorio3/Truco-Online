var activeTournaments = []
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
      });

      socket.on('joinTournament', function (tournamentData) {
        socket.join(tournamentData.tournamentId);
        const clients = io.sockets?.adapter.rooms.get(tournamentData.tournamentId)
        activeTournaments.forEach(t => {if(t.tournamentId===tournamentData.tournamentId) t.players.push(tournamentData.user)})
        if(clients.size === 4){
          activeTournaments = activeTournaments.filter(t => t.tournamentId !== tournamentData.tournamentId)
          socket.emit("tournamentFull", false);
        }
        io.emit("newTournamentCreated");
      })

      socket.on('bringTournamentData', function (tournamentId) {
        let tournamentData;
        activeTournaments.forEach(t => t.tournamentId === tournamentId ? tournamentData = t : null)
        console.log(tournamentData)
        socket.emit('sendTournamentData', (tournamentData))
      })

      socket.on('bringActiveTournaments', function () {
        console.log('entramos')
        let idTournaments = [];
        activeTournaments.forEach(t => idTournaments.push(t.tournamentId))
        io.emit('showActiveTournaments', (idTournaments) );
      })
      
    });
}
