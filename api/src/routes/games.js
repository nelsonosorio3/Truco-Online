const { User, Friends, Games } = require("../db.js");
const { Router }  = require("express");
const Sequelize = require('sequelize');
// const Op = Sequelize.Op;
const jwt = require('jsonwebtoken');
const router = Router();



// Esto en la verificacion del token
function validarUsuario(req, res, next) {
    jwt.verify(req.headers['x-access-token'], req.app.get('secretKey'), function (err, decoded) {
      if (err) {
        res.json({
          status: "error",
          message: err.message, data: null
        })
      } else {
        req.body.userId = decoded.id
        next()
      }
    })
}

//Ruta para traer todos los juegos disputados
router.get('/' , (req , res) => {
    Games.findAll()
    .then(r => {
        res.json(r);
    })
})

//Agregar validacion
//Ruta para agregar una partida [TERMINADA] a un usuario /:idUsuarioLoegado/:idDeLaPartida
router.post('/:userid/:gameid' , (req , res) => {
    const {userid, gameid} = req.params

    let gamesData = null
    let userData = null

    Games.findOne({
        where: {id: gameid},
        raw: true
    })
    .then((gameFound) => {
        if(!gameFound) throw new Error("No existe la partida")
        if(gameFound.state === 'pendiente') throw new Error("La partida aun se encuentra pendiente")
        
        gamesData = gameFound
        return User.findOne({ 
            where: { id: userid},
        })
    })
    .then(user => {
        if(!user) throw new Error("No existe el usuario")
        userData = user.toJSON()

        if(gamesData.winner !== userData.username && gamesData.loser !== userData.username) throw new Error("El usuario no participo de la partida")

        return user.getGames({
            where: {id: gameid},
        })
    })
    .then(hasResult => {
        if(hasResult.length){
            throw new Error("El usuario ya tiene asignada esta partida")  
        } 
        return User.findOne({ 
            where: { id: userid},
        })
    })
    .then(user => {
        return user.addGames(gameid)
    })
    .then(response => {
        res.json(response)
    })
    .catch((err) => {
        return res.json({message: err.message})
    })
})

//Ruta para ver todas las partidas en las que participo el usuario logeado
//Middleware validarUsuario ----> se necesita el token
router.get('/mygames', validarUsuario, (req , res) => {
    const userid = req.body.userId
    let userData = null
    let userGamesData = null

    User.findOne({ 
        where: { id: userid},
        attributes: ['id', 'username'],
    })
    .then(user => {
        userData = user.toJSON()
        return user.getGames({
            attributes: ['id','state', "winner", "loser", "createdAt"]
        })
    })
    .then(result => {
        userGamesData = result.map(r => r.toJSON())
        userGamesData = userGamesData.map(d => {
            return {
                id: d.id,
                state: d.state,
                createdAt: d.createdAt,
                winner: d.winner,
                loser: d.loser
            }
        })
        const ans = {
            id: userData.id,
            username: userData.username,
            games: userGamesData
        }

        res.json(ans)
    })
    .catch((err) => {
        return res.json({message: err.message})
    })
    
})


module.exports = router;
