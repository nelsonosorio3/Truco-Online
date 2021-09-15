const { Router }  = require("express");
const Sequelize = require('sequelize');
const User = require("../models/User");
const Op = Sequelize.Op;

const router = Router();

//todas las rutas /api/user
router.get('/' , async(req , res) => {
  // const users = await User.findAll();
  // res.json(users)
});

router.get("/:id", async(req, res)=>{
  // const {id} = req.params;
  // const user = await User.findByPk(parseInt(id));
  // if(!user) return res.sendStatus(404);
  // res.json(user);
});

router.get(":id/friends", async(req, res)=>{
  // const {id} = req.params;
  // const user = await User.findByPk(parseInt(id), {include: friends});
  // const friends = [];
  // if(user){
  //   for await(let friend of user.friends){
  //     friends.push(friend);
  //   };
  //   return res.json(friends);
  // };
  // res.sendStatus(404);
})

module.exports = router;