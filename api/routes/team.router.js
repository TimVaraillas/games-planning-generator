var express = require("express");
var router = express.Router();
var Team = require("../models/team.model");

// GET /team
router.route("/").get(function (req, res) {
  Team.find(function (err, teams) {
    if (err) {
      console.log(err);
    } else {
      res.json(teams);
    }
  });
});

// GET /team/:id
router.route("/:id").get(function (req, res) {
  var id = req.params.id;
  Team.findById(id, function (err, team) {
    res.json(team);
  });
});

// POST /team/add
router.route("/add").post(function (req, res) {
  var team = new Team(req.body);
  team.save()
    .then(team => {
      res.status(200).json(team);
    })
    .catch(err => {
      res.status(400).send("unable to save to database");
    });
});

// DELETE /team/delete/:id
router.route("/delete/:id").delete(function (req, res) {
  Team.findByIdAndRemove({
    _id: req.params.id
  }, function (err, team) {
    if (err) {
      res.json(err);
    } else {
      res.json(team);
    }
  });
});

// PUT /team/update/:id
router.route("/update/:id").put(function (req, res) {
  Team.findById(req.params.id, function (err, team) {
    if (!team) {
      res.status(404).send('team does not exists')
    } else {
      team.name = req.body.name;
      team.save().then(team => {
          res.json(team);
        })
        .catch(err => {
          res.status(400).send("unable to update the database");
        });
    }
  });
});

module.exports = router;