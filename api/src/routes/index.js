const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const user = require('./user');
const message = require("./message");
const friends = require("./friends");
const games = require("./games");
const signup = require("./signup");

const filltable = require("./filltable") // Borrar línea en proyecto final

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use('/user', user);
router.use("/message", message);
router.use("/friends", friends);
router.use("/signup", signup);
router.use("/games", games)
router.use("/filltable", filltable); // Borrar línea en proyecto final

module.exports = router;