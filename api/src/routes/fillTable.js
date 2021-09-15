const { Router } = require("express");
const Sequelize = require('sequelize');
//const User = require("../models/User");
const { User } = require("../db.js");
const Op = Sequelize.Op;

const router = Router();

const u1 = { username: "pedro", email: "pedro@mail.com", password: "1234", gamesPlayed: 0, gamesWon: 0, gamesLost: 0 }
const u2 = { username: "nelson", email: "nelson@mail.com", password: "1234", gamesPlayed: 0, gamesWon: 0, gamesLost: 0 }
const u3 = { username: "guille", email: "guille@mail.com", password: "1234", gamesPlayed: 0, gamesWon: 0, gamesLost: 0 }
const u4 = { username: "tomas", email: "tomas@mail.com", password: "1234", gamesPlayed: 0, gamesWon: 0, gamesLost: 0 }
const u5 = { username: "leo", email: "leo@mail.com", password: "1234", gamesPlayed: 0, gamesWon: 0, gamesLost: 0 }
const u6 = { username: "santiago", email: "santiago@mail.com", password: "1234", gamesPlayed: 0, gamesWon: 0, gamesLost: 0 }
const u7 = { username: "fede", email: "fede@mail.com", password: "1234", gamesPlayed: 0, gamesWon: 0, gamesLost: 0 }
const u8 = { username: "santiago", email: "santiago@mail.com", password: "1234", gamesPlayed: 0, gamesWon: 0, gamesLost: 0 }

const g1 = {}

router.post("/", async (req, res) => {

  var d1 = await User.create(u1)
  var d2 = await User.create(u2)
  var d3 = await User.create(u3)
  var d4 = await User.create(u4)
  var d5 = await User.create(u5)
  var d6 = await User.create(u6)
  var d7 = await User.create(u7)
  var d8 = await User.create(u8)
  res.status(404).json({ message: "Tabla de prueba llenada con éxito." });

})

module.exports = router;