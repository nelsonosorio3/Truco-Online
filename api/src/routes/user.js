const { Router, response } = require("express");
const Sequelize = require('sequelize');
const { isConstructorDeclaration } = require("typescript");
//const User = require("../models/User");
const { User, Friends, Games } = require("../db.js");
const Op = Sequelize.Op;
const router = Router();
//jwt es necesario para crear el token luego del login
const jwt = require('jsonwebtoken');
// Funcion para validar usuario
const {validarUsuario} = require('../controller/index')

//todas las rutas /api/user 
router.get('/', async (req, res) => {
  try {
    const users = await User.findAll();
    return res.json(users)
  } catch (error) {
    console.log(error)
    res.sendStatus(404).send(error);
  }
});

router.get('/login', async (req, res) => {

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
      const token = jwt.sign({ id: user[0].id }, req.app.get('secretKey'), { expiresIn: '7d' });
      var resp = {
        username: user[0].username,
        id: user[0].id,
        login: true,
        token: token,
        message: "Autenticacion exitosa!"
      }
      return res.status(200).json(resp)
    }
    console.log(error);
    res.sendStatus(404).send(error);
  } catch {
    e => console.log(e)
  }
})

//Ruta para obtener datos del perfil del usuario
router.get("/profile", validarUsuario,  async (req, res) => {
  // userId ---> viene del middleware para autenticacion(req.body.userId) - Se utiliza para el query
  console.log("Authenticated for /profile userId: ", req.body.userId)
  try{
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
});

//Ruta para traer todos los amigos de un usuario
router.get("/friends",validarUsuario, async (req, res) => {
  console.log("Authenticated for /friends userId: ", req.body.userId)

  let userInfo = {
    //usuarios que aceptaron la solicitud del usuario logeado, tambien los usuarios a los que se envio una solicitud
    userSender: null, 
    //usuarios que enviaron una solicitud al usuario logeado
    userRequested: null
  }

  User.findOne({
    where: {id: req.body.userId},
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
    let userRequestedAccepted = userRequestedResults.filter( el => el.Friends.status === "accepted")
    let userRequestedPending = userRequestedResults.filter( el => el.Friends.status === "pending")
    
    userInfo.userSender = userInfo.userSender.userSender.concat(userRequestedAccepted)
    userInfo.userRequested = userRequestedPending

    return res.json(userInfo)
  })
});

router.get("/:id/history", async (req, res) => {

  //No se esta usando -----> se usa la ruta de /games/mygames

  const userId = req.params.id
  const userData = await User.findAll({
    where: {
      id: userId
    }
  });

  console.log("userData is:")
  console.log(userData)

  var username = userData[0].dataValues.username;

  Games.findAll({
    where: {
      [Op.or]: [
        { winner: username },
        { loser: username }
      ]
    }
  })
    .then(result => {
      return res.json(result)
    })
    .catch(e => res.status(404).send(e))
})

router.get("/:id/friend_requests_received", async (req, res) => {
  // const {id} = req.params;
  // const friend_requests_reveived = await User.findByPk(parseInt(id), {include: Friends, attributes:["name"], where:{status: "pending"}});
  // if(!friend_requests_reveived) res.sendStatus(404);
  // res.json(friend_requests_reveived);
  const { id } = req.params;
  var user = await User.findByPk(parseInt(id), {
    include: {
      model: User,
      as: "userRequested",
      through: {
        where: {
          status: "pending"
        }
      }
    }
  });
  var result = [...user.userRequested]

  var result2 = result.filter(f => f.Friends.status === "pending");

  res.status(200).json(result2);

});

router.get("/:id/friend_requests_sent", async (req, res) => {
  // const {id} = req.params;
  // const friend_requests_reveived = await User.findByPk(parseInt(id), {include: Friends, attributes:["name"], where:{[Op.or]: [{status: "pending"},{status: "reject"}]}});
  // if(!friend_requests_reveived) res.sendStatus(404);
  // res.json(friend_requests_reveived);
  const { id } = req.params;
  var user = await User.findByPk(parseInt(id), {
    where: {
      '$Friends.status$': { [Op.ne]: "pending" }
    },
    include: {
      model: User,
      as: "userSender",
    }
  }
  );
  var result = [...user.userSender]

  //implemento filter, porque no puedo generar la consulta con sequelize.
  var result2 = result.filter(f => f.Friends.status === "pending" || f.Friends.status === "rejected");

  res.status(200).json(result2);
})

router.post("/", async (req, res) => {

  console.log("ingreso aca 1")

  var { username, email, password } = req.body;

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
})


module.exports = router;