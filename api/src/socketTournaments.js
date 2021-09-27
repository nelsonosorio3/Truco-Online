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
        console.log("active rooms: ", activeTournaments)
      });

      socket.on('joinTournament', function (tournamentData) {
        socket.join(tournamentData.tournamentId);
        activeTournaments.forEach(t => {if(t.tournamentId===tournamentData.tournamentId) t.players.push(tournamentData.user)})
      })

      socket.on('bringTournamentData', function (tournamentId) {
        let tournamentData;
        activeTournaments.forEach(t => {if(t.tournamentId===tournamentId) io.emit('sendTournamentData', { t })})
      })

      socket.on('bringActiveTournaments', function () {
        let idTournaments = [];
        activeTournaments.forEach(t => idTournaments.push(t.tournamentId))
        io.emit('showActiveTournaments', (idTournaments) );
      })
      
    });
}
