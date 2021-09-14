const { Router }  = require("express")
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

const router = Router();

router.get('/' , (req , res) => {
    res.json({msg : 'Ruta a /api corriendo'})
})


router.get('/user' , (req , res) => {
     res.json({msg:'ruta /api/user'})
})

router.get('/friends' , (req , res) => {
    res.json({msg:'ruta /api/friends'})
})



module.exports = router;