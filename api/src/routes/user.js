const { Router } = require("express");
const Sequelize = require('sequelize');
//const User = require("../models/User");
const { User } = require("../db.js");
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

  console.log("entro1");
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