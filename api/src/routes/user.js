const { Router }  = require("express");
const Sequelize = require('sequelize');
const User = require("../models/User");
const Op = Sequelize.Op;

const router = Router();

//todas las rutas /api/user
router.get('/' , (req , res) => {
  res.json({msg:'ruta /api/user'});
});

module.exports = router;