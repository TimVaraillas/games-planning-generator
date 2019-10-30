let express = require("express");
let tournamentRoutes = express.Router();
let Tournament = require("../_models/Tournament");

// GET /tournament
tournamentRoutes.route("/").get(function (req, res) {
    Tournament.find(function (err, tournaments) {
        if (err) {
            console.log(err);
        } else {
            res.json(tournaments);
        }
    });
});

// GET /tournament/:id
tournamentRoutes.route("/:id").get(function (req, res) {
    let id = req.params.id;
    Tournament.findById(id, function (err, tournament) {
        res.json(tournament);
    });
});

// POST /tournament/add
tournamentRoutes.route("/add").post(function (req, res) {
    let tournament = new Tournament(req.body);
    tournament.save()
        .then(tournament => {
            res.status(200).json(tournament);
        })
        .catch(err => {
            res.status(400).send("unable to save to database");
        });
});

// DELETE /tournament/delete/:id
tournamentRoutes.route("/delete/:id").delete(function (req, res) {
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
tournamentRoutes.route("/update/:id").put(function (req, res) {
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



module.exports = tournamentRoutes;