
const { Router }  = require("express");
const { json } = require("sequelize");
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const { User } = require("../db.js");
const Friends = require("../models/Friends.js");

const router = Router();

//todas las rutas /api/friends
router.get('/' , (req , res) => {
  res.json({msg:'ruta /api/friends'});
})

router.post('/:id/:email' , (req , res) => {
  const {id, email} = req.params
  if(!id || !email) return res.status(404).json({message: "Missing parameters!"})
  const userSender = User.findByPk(id)
  .then(sender => {
    if(!sender) throw new TypeError
    User.findOne({where: {email: email}})
    .then(requested => {
      if(!requested) throw new TypeError
      //Revisar teoria
      requested.Friends = {
        status: "pending"
      }
      sender.addUserSender(requested) 
      res.status(201).json({message: "Se envio una solicitud de amistad a " + requested.email})
    })
    .catch(err => {
      return res.status(404).json({message: "Email wans't found"})
    })
  })
  .catch(err => {
    return res.status(404).json({message: "User wans't found"})
  })
})

router.put('/:id/:email' , (req , res) => {
  const {id, email} = req.params
  const {response} = req.query
  if(!id || !email) return res.status(404).json({message: "Missing parameters!"})

  User.findByPk(id)
  .then(requested => {
    if(!requested) throw new TypeError
    User.findOne({where: {email: email}})
    .then(sender => {
      if(!sender) throw new Error()
      //Revisar teoria
      requested.Friends = {
        status: response
      }
      sender.addUserSender(requested) 
      if(response == "accepted"){
        res.status(201).json({message: "La solicitud fue aceptada por "+ requested.email})
      }else{
        res.status(201).json({message: "La solicitud fue rechaza por "+ requested.email})
      }
    })
    .catch(err => {
      return res.status(404).json({message: "Error: email wasn't found"})
    })
  })
  .catch(err => {
    return res.status(404).json({message: "User wans't found"})
  })
})

module.exports = router;
