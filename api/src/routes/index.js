const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const express = require("express");
const videogamesRouter = require("../routes/videoGames")

const router = Router();


// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use(express.json());
router.use('/videogames', videogamesRouter);


module.exports = router;
