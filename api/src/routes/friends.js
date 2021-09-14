const { Router }  = require("express");
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

const router = Router();

//todas las rutas /api/friends
router.get('/' , (req , res) => {
  res.json({msg:'ruta /api/friends'});
})

module.exports = router;