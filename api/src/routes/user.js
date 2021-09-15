const { Router } = require("express");
const Sequelize = require('sequelize');
//const User = require("../models/User");
const { User } = require("../db.js");
const Op = Sequelize.Op;

const router = Router();

//todas las rutas /api/user
router.get('/', async (req, res) => {
  // const users = await User.findAll();
  // res.json(users)
  // res.sendStatus(404);
  res.status(400).json({ message: "Conexión OK." })
});

router.get("/:id", async (req, res) => {
  // const {id} = req.params;
  // const user = await User.findByPk(parseInt(id));
  // if(!user) return res.sendStatus(404);
  // res.json(user);
  res.sendStatus(404);
});

router.get("/:id/friends", async (req, res) => {
  // const {id} = req.params;
  // const user = await User.findByPk(parseInt(id), {include: Friends});
  // const friends = [];
  // if(user){
  //   for await(let friend of user.friends){
  //     friends.push(friend);
  //   };
  //   return res.json(friends);
  // };
  // res.sendStatus(404);
  res.sendStatus(404);
});

router.get("/:id/history", async (req, res) => {
  // const {id} = req.params;
  // const history = await User.findByPk(parseInt(id), {attributes: ["history"]});
  // if(!history) return res.sendStatus(404);
  // res.json(history);
  res.sendStatus(404);
});

router.get("/:id/friend_requests_reveived", async (req, res) => {
  // const {id} = req.params;
  // const friend_requests_reveived = await User.findByPk(parseInt(id), {include: Friends, attributes:["name"], where:{status: "pending"}});
  // if(!friend_requests_reveived) res.sendStatus(404);
  // res.json(friend_requests_reveived);
  res.sendStatus(404);
});

router.get("/:id/friend_requests_sent", async (req, res) => {
  // const {id} = req.params;
  // const friend_requests_reveived = await User.findByPk(parseInt(id), {include: Friends, attributes:["name"], where:{[Op.or]: [{status: "pending"},{status: "reject"}]}});
  // if(!friend_requests_reveived) res.sendStatus(404);
  // res.json(friend_requests_reveived);
  res.sendStatus(404);
})

router.post("/", async (req, res) => {

  var { username, email } = req.body;

  try {
    var newUser = await User.create({
      username,
      email,
      gamesPlayed: 0,
      gamesWon: 0,
      gamesLost: 0
    })
    res.status(404).json({ message: "Usuario creado con éxito" });
  } catch (error) {
    console.log(error)
    res.send(error);
  }
})


module.exports = router;