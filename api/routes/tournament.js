var express = require("express");
var router = express.Router();
var Tournament = require("../models/Tournament");

// GET /tournament
router.route("/").get(function (req, res) {
    Tournament.find(function (err, tournaments) {
        if (err) {
            console.log(err);
        } else {
            res.json(tournaments);
        }
    });
});

// GET /tournament/:id
router.route("/:id").get(function (req, res) {
    var id = req.params.id;
    Tournament.findById(id, function (err, tournament) {
        res.json(tournament);
    });
});

// POST /tournament/add
router.route("/add").post(function (req, res) {
    var tournament = new Tournament(req.body);
    tournament.save()
        .then(tournament => {
            res.status(200).json(tournament);
        })
        .catch(err => {
            res.status(400).send("unable to save to database");
        });
});

// DELETE /tournament/delete/:id
router.route("/delete/:id").delete(function (req, res) {
    Tournament.findByIdAndRemove({
        _id: req.params.id
    }, function (err, tournament) {
        if (err) { 
            res.json(err); 
        } else { 
            res.json(tournament); 
        }
    });
});

// PUT /tournament/update/:id
router.route("/update/:id").put(function (req, res) {
    Tournament.findById(req.params.id, function (err, tournament) {
        if (!tournament) {
            res.status(404).send('tournament does not exists')
        } else {
            tournament.name = req.body.name;
            tournament.save().then(tournament => {
                res.json(tournament);
            })
            .catch(err => {
                res.status(400).send("unable to update the database");
            });
        }
    });
});

module.exports = router;