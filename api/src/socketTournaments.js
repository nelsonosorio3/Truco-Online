var activeTournaments = []
var socketsInfo = []

exports = module.exports = function(io){
    io.sockets.on('connection', function (socket) {

      socket.on('createTournament', function (tournamentID) {
        console.log('Tournament ID:', tournamentID);
        if(activeTournaments.indexOf(tournamentID) === -1){
            activeTournaments = [...activeTournaments, tournamentID]
            socket.join(tournamentID);
            socketsInfo.push({socketId: socket.id, tournamentID})
        }
        else console.log(tournamentID, 'ya existe');
        console.log("active rooms: ", activeTournaments)
      });

      socket.on('joinTournament', function (tournamentID) {
        socket.join(tournamentID);
      })

      socket.on('bringActiveTournaments', function () {
        io.emit('showActiveTournaments', { activeTournaments });
      })
      
    });
}
