var passport = require("passport");
var localStrategy = require("passport-local").Strategy;

var User = require("../models/user.model");

passport.use(
  new localStrategy({ usernameField: "email" }, 
    function (username, password, done) {
      User.findOne({ email: username },
        function(err, user) {
          if (err) {
            return done(err);
          }
          // unknown user
          if (!user) {
            return done(null, false, { message: { translationKey: "AUTHENTIFICATION.CONNEXION.TOAST.ERREUR.EMAIL"} });
          }
          // wrong password
          if (!user.verifyPassword(password)) {
            return done(null, false, { message: { translationKey: "AUTHENTIFICATION.CONNEXION.TOAST.ERREUR.MOT_DE_PASSE" } });
          }
          // authentication succeeded
          else {
            return done(null, user);
          }
        });
    })
);