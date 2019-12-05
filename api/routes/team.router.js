var express = require("express");
var router = express.Router();
var Team = require("../models/team.model");

// GET /game
router.route("/").get(function (req, res) {
  Team.find(function (err, teams) {
    if (err) {
      console.log(err);
    } else {
      res.json(teams);
    }
  });
});

// GET /game/:id
router.route("/:id").get(function (req, res) {
  var id = req.params.id;
  Team.findById(id, function (err, game) {
    res.json(game);
  });
});

// POST /game/add
router.route("/add").post(function (req, res) {
  var game = new Team(req.body);
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
  Team.findByIdAndRemove({
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
  Team.findById(req.params.id, function (err, game) {
    if (!game) {
      res.status(404).send('game does not exists')
    } else {
      game.name = req.body.name;
      game.save().then(game => {
          res.json(game);
        })
        .catch(err => {
          res.status(400).send("unable to update the database");
        });
    }
  });
});

module.exports = router;