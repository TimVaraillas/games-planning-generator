var express = require("express");
var router = express.Router();
var Game = require("../models/game.model");

// GET /game
router.route("/").get(function (req, res) {
  Game.find()
    .populate('localTeam')
    .populate('awayTeam')
    .exec(function (err, games) {
      if (err) {
        console.log(err);
      } else {
        res.json(games);
      }
    });
});

// GET /game/:id
router.route("/:id").get(function (req, res) {
  var id = req.params.id;
  Game.findById(id)
    .populate('localTeam')
    .populate('awayTeam')
    .exec(function (err, game) {
      res.json(game);
    });
});

// POST /game/add
router.route("/add").post(function (req, res) {
  var game = new Game(req.body);
  game.save()
    .then(game => {
      res.status(200).json(game);
    })
    .catch(err => {
      res.status(400).send("unable to save to database");
    });
});

// DELETE /game/delete/:id
router.route("/delete/:id").delete(function (req, res) {
  Game.findByIdAndRemove({
    _id: req.params.id
  }, function (err, game) {
    if (err) {
      res.json(err);
    } else {
      res.json(game);
    }
  });
});

// PUT /game/update/:id
router.route("/update/:id").put(function (req, res) {
  Game.findOneAndUpdate({
        _id: req.params.id
      },
      req.body
    ).then(game => {
      res.status(200).json(game);
    })
    .catch(err => {
      res.status(400).send("unable to save to database");
    });
});

module.exports = router;