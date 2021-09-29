const { User, Friends, Games } = require("../db.js");
const jwt = require('jsonwebtoken');

module.exports = {

    allUsers: async (req, res) => {
        try {
          const users = await User.findAll();
          return res.json(users)
        } catch (error) {
          console.log(error)
          res.sendStatus(404).send(error);
        }
    },

    facebookLogin: (req, res) => {
        const {emailInput, usernameInput} = req.query

        console.log("Entro a la ruta")

        User.findOrCreate({
            where: {email : emailInput},
            defaults: {
                username: usernameInput,
                email: emailInput,
                gamesPlayed: 0,
                gamesWon: 0,
                gamesLost: 0
            }
        })
        .then(response => {
            const [user, isNew] = response
            const token = jwt.sign({ id: user.id }, req.app.get('secretKey'), { expiresIn: '7d' });
            if(isNew){
                const userData = {
                    token: token,
                    login: true,
                    username: user.username,
                    id: user.id,
                    message: "Se creo un nuevo usuario"
                }
                return res.json(userData)
            }
            else{
                const userData = {
                    token: token,
                    login: true,
                    username: user.username,
                    id: user.id,
                    message: "El usuario ya existe"
                }
                return res.json(userData)
            }
        })
    },
}