var express = require("express");
var passport = require("passport");
var router = express.Router();

var jwtHelpers = require("../helpers/jwt.helpers");
var userController = require ("../controllers/user.controller");


/**
 * POST /register
 * Enregistre un nouvel utilisateur
 */
router.post("/register", userController.register);

/**
 * POST /login
 * Connexion de l'utilisateur avec la stratégie 'local'
 */
router.post("/login", userController.authenticate);

/**
 * GET /profile/:id
 * Retourner le profil d'un utilisateur
 */
router.get("/profile/:id", jwtHelpers.verifyJwtToken, userController.userProfile);

module.exports = router;