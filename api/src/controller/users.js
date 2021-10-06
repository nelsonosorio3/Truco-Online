const { User, Friends, Games } = require("../db.js");
const jwt = require('jsonwebtoken');

module.exports = {
  //Funciones controller para la ruta /user

  allUsers: async (req, res) => {
    try {
      const users = await User.findAll({
        include: {
          model: User,
          as: "reportedUser",
        }
      });
      return res.json(users)
    } catch (error) {
      console.log(error)
      return res.sendStatus(404).send(error);
    }
  },

  facebookLogin: (req, res) => {
    const { emailInput, usernameInput } = req.query
    User.findOrCreate({
      where: { email: emailInput },
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
        if (isNew) {
          const userData = {
            token: token,
            login: true,
            username: user.username,
            id: user.id,
            message: "Se creo un nuevo usuario"
          }
          return res.json(userData)
        }
        else {
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

  userLogin: async (req, res) => {

    //Recibe las argumentos por query ---> req.quey
    var { emailInput, passwordInput } = req.query;

    var users = await User.findAll({
      where: {
        email: emailInput
      }
    });
    if (users.length === 0) return res.status(200).json(
      {
        message: "El correo ingresado no existe.",
        login: false
      }
    )
    try {
      if (users.length > 0) {
        var user = users.filter(u => u.password === passwordInput);
        if (user.length === 0) return res.status(200).json({ message: "Los datos ingresados son incorrectos", login: false })
        if (user.length > 1) return res.status(200).json({ message: "Error! Hay más de un usuario con ese mail y contraseña", login: false })

        //token autentication - Se crea el token y se envia al cliente
        const token = jwt.sign({ id: user[0].id, isAdmin: user[0].isAdmin }, req.app.get('secretKey'), { expiresIn: '7d' });
        var resp = {
          username: user[0].username,
          id: user[0].id,
          login: true,
          token: token,
          isAdmin: user[0].isAdmin,
          message: "Autenticacion exitosa!"
        }
        return res.status(200).json(resp)
      }
      console.log(error);
      res.sendStatus(404).send(error);
    } catch {
      e => console.log(e)
    }
  },

  getUserProfile: async (req, res) => {
    // userId ---> viene del middleware para autenticacion(req.body.userId) - Se utiliza para el query
    console.log("Authenticated for /profile userId: ", req.body.userId)
    try {
      let user = await User.findAll({
        attributes: { exclude: 'password' },
        where: {
          id: req.body.userId
        }
      })
      if (!user) throw new Error("El usuario no se encontro")
      res.json(user);
    }
    catch (err) {
      res.json(err.message)
    }
  },

  getUserFriends: async (req, res) => {
    console.log("Authenticated for /friends userId: ", req.body.userId)

    let userInfo = {
      //usuarios que aceptaron la solicitud del usuario logeado, tambien los usuarios a los que se envio una solicitud
      userSender: null,
      //usuarios que enviaron una solicitud al usuario logeado
      userRequested: null
    }

    User.findOne({
      where: { id: req.body.userId },
      attributes: ["id", "username"],
      include: {
        model: User,
        as: "userSender",
        attributes: ["username", "id", "email"],
        through: {
          attributes: ["status", "createdAt", "userRequestedId"]
        }
      },
    })
      .then(userSenderResults => {
        userInfo.userSender = userSenderResults
        return userSenderResults.getUserRequested({
          attributes: ["username", "id", "email"],
        })
      })
      .then(userRequestedResults => {
        //Solucion momentanea, se va a tratar de implementar algo ams optimo
        let userRequestedAccepted = userRequestedResults.filter(el => el.Friends.status === "accepted")
        let userRequestedPending = userRequestedResults.filter(el => el.Friends.status === "pending")

        userInfo.userSender = userInfo.userSender.userSender.concat(userRequestedAccepted)
        userInfo.userRequested = userRequestedPending

        return res.json(userInfo)
      })
  },

  createNewUser: async (req, res) => {

    console.log("ingreso aca 1")

    var { username, email, password, image } = req.body;

    const userData = await User.findAll({
      where: {
        email: email
      }
    });

    if (userData.length > 0) return res.status(200).send({
      message: "Esa dirección de correo ya está registrada",
      registered: false,
      validEmail: false
    });

    try {
      await User.create({
        username,
        email,
        password,
        image,
        gamesPlayed: 0,
        gamesWon: 0,
        gamesLost: 0
      })
      return res.status(200).json({
        message: "Usuario creado con éxito",
        registered: true,
        validEmail: true
      });
    } catch (error) {
      console.log(error)
      return res.status(404).send({
        message: "No se generó usuario",
        registered: false,
        validEmail: true
      });
    }
  },

  getEditProfile: async (req, res) => {
    console.log("Authenticated for /edit userId: ", req.body.userId);
    try {
      let user = await User.findAll({
        where: {
          id: req.body.userId,
        },
      });
      if (!user) throw new Error("El usuario no se encontro")
      res.json(user);
    } catch (err) {
      res.json(err.message);
    };
  },

  updateUser: (req, res) => {
    const { userId } = req.body
    const { username, email, password, image } = req.body

    User.findByPk(userId)
      .then(updateUser => {

        updateUser.username = username
        updateUser.email = email
        updateUser.password = password
        updateUser.image = image

        return updateUser.save()
      })
      .then(response => {
        res.json({ message: "El usuario se actualizo con exito", status: true, data: response })
      })
      .catch(err => {
        res.json({ message: "No se ha podido actualizar el usuario", status: false })
      })
  }
}