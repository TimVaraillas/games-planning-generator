const express = require("express");
const app = express();
const tournamentRoutes = express.Router();

// Require Business model in our routes module
let Tournament = require("../_models/Tournament");

// GET /
tournamentRoutes.route("/").get(function (req, res) {
    Tournament.find(function (err, tournaments) {
        if (err) {
            console.log(err);
        } else {
            res.json(tournaments);
        }
    });
});

// POST /add
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

// DELETE /delete/:id
tournamentRoutes.route("/delete/:id").delete(function (req, res) {
    Tournament.findByIdAndRemove({
        _id: req.params.id
    }, function (err, tournament) {
        if (err) res.json(err);
        else res.json(tournament);
    });
});

// // Defined edit route
// tournamentRoutes.route("/edit/:id").get(function (req, res) {
//     let id = req.params.id;
//     Business.findById(id, function (err, business) {
//         res.json(business);
//     });
// });

// //  Defined update route
// tournamentRoutes.route("/update/:id").post(function (req, res) {
//     Business.findById(req.params.id, function (err, next, business) {
//         if (!business)
//             return next(new Error("Could not load Document"));
//         else {
//             business.person_name = req.body.person_name;
//             business.business_name = req.body.business_name;
//             business.business_gst_number = req.body.business_gst_number;

//             business.save().then(business => {
//                     res.json("Update complete");
//                 })
//                 .catch(err => {
//                     res.status(400).send("unable to update the database");
//                 });
//         }
//     });
// });



module.exports = tournamentRoutes;