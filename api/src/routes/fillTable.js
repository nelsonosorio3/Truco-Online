const { Router } = require("express");
const Sequelize = require('sequelize');
//const User = require("../models/User");

const { User, Friends, Games } = require("../db.js");

const Op = Sequelize.Op;

const router = Router();

// Users

const u1 = { username: "pedro", email: "pedro@mail.com", password: "1234", gamesPlayed: 0, gamesWon: 0, gamesLost: 0 }
const u2 = { username: "nelson", email: "nelson@mail.com", password: "1234", gamesPlayed: 0, gamesWon: 0, gamesLost: 0 }
const u3 = { username: "guille", email: "guille@mail.com", password: "1234", gamesPlayed: 0, gamesWon: 0, gamesLost: 0 }
const u4 = { username: "tomas", email: "tomas@mail.com", password: "1234", gamesPlayed: 0, gamesWon: 0, gamesLost: 0 }
const u5 = { username: "leo", email: "leo@mail.com", password: "1234", gamesPlayed: 0, gamesWon: 0, gamesLost: 0 }
const u6 = { username: "santiago", email: "santiago@mail.com", password: "1234", gamesPlayed: 0, gamesWon: 0, gamesLost: 0 }
const u7 = { username: "fede", email: "fede@mail.com", password: "1234", gamesPlayed: 0, gamesWon: 0, gamesLost: 0 }
const u8 = { username: "santiago", email: "santiago@mail.com", password: "1234", gamesPlayed: 0, gamesWon: 0, gamesLost: 0 }

// Friends (friendships)

const f1 = { status: "pending", userSenderId: 1, userRequestedId: 7 }
const f2 = { status: "pending", userSenderId: 2, userRequestedId: 8 }
const f3 = { status: "pending", userSenderId: 3, userRequestedId: 4 }
const f4 = { status: "pending", userSenderId: 4, userRequestedId: 5 }
const f5 = { status: "pending", userSenderId: 5, userRequestedId: 6 }
const f6 = { status: "pending", userSenderId: 6, userRequestedId: 8 }
const f7 = { status: "pending", userSenderId: 1, userRequestedId: 3 }
const f8 = { status: "pending", userSenderId: 2, userRequestedId: 4 }
const f9 = { status: "accepted", userSenderId: 1, userRequestedId: 5 }
const f10 = { status: "accepted", userSenderId: 2, userRequestedId: 6 }
const f11 = { status: "accepted", userSenderId: 3, userRequestedId: 5 }
const f12 = { status: "accepted", userSenderId: 7, userRequestedId: 6 }
const f13 = { status: "accepted", userSenderId: 8, userRequestedId: 7 }
const f14 = { status: "accepted", userSenderId: 1, userRequestedId: 8 }
const f15 = { status: "accepted", userSenderId: 2, userRequestedId: 3 }

var friendships = [f1, f2, f3, f4, f5, f6, f7, f8, f9, f10, f11, f12, f13, f14]

// Games


router.post("/", async (req, res) => {


  await Games.create({
    state: "finished",
    winner: 1,
    loser: 2,
    results: "12|23"
  })

  await Games.create({
    state: "pending",
    winner: 4,
    loser: 6,
    results: "11|13"
  })

  await Games.create({
    state: "finished",
    winner: 1,
    loser: 5,
    results: "11|13"
  })

  await Games.create({
    state: "finished",
    winner: 1,
    loser: 6,
    results: "11|13"
  })

  var d1 = await User.create(u1)
  var d2 = await User.create(u2)
  var d3 = await User.create(u3)
  var d4 = await User.create(u4)
  var d5 = await User.create(u5)
  var d6 = await User.create(u6)
  var d7 = await User.create(u7)
  var d8 = await User.create(u8)

  await Friends.create(f15)

  for await (f of friendships) {
    Friends.create(f)
  }

  res.json({ message: "Tabla de prueba llenada con éxito." });

})

module.exports = router;