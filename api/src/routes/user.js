const { Router } = require("express");
const Sequelize = require('sequelize');
const { isConstructorDeclaration } = require("typescript");
//const User = require("../models/User");
const { User, Friends, Games } = require("../db.js");
const Op = Sequelize.Op;

const router = Router();

//todas las rutas /api/user
router.get('/', async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users)
    res.sendStatus(404);
    res.status(400).json({ message: "Conexión OK." })
  } catch (error) {
    console.log(error)
    res.sendStatus(404).send(error);
  }

});

router.get("/:id", async (req, res) => {

  var { id } = req.params;
  id = parseInt(id);
  var user = await User.findAll({
    attributes: { exclude: 'password' },
    where: {
      id: id
    }
  });
  if (!user) return res.sendStatus(404);
  res.json(user);
  res.sendStatus(404);
});

router.get("/:id/friends", async (req, res) => {
  const { id } = req.params;
  var user = await User.findByPk(parseInt(id), {
    include: { model: User, as: "userSender", }
  });
  var user2 = await User.findByPk(parseInt(id), {
    include: { model: User, as: "userRequested", }
  });
  var result = [...user.userSender, ...user2.userRequested]

  res.status(200).json(result);
  res.sendStatus(404);
});

router.get("/:id/history", async (req, res) => {

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

  var { username, email, password } = req.body;

  try {
    var newUser = await User.create({
      username,
      email,
      password,
      gamesPlayed: 0,
      gamesWon: 0,
      gamesLost: 0
    })
    res.status(200).json({ message: "Usuario creado con éxito" });
  } catch (error) {
    console.log(error)
    res.sendStatus(404).send(error);
  }
})


module.exports = router;