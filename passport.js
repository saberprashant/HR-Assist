const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('./api/models/userModel');
const passportJWT = require("passport-jwt");
const JWTStrategy = passportJWT.Strategy;
const { ExtractJwt } = passportJWT;


passport.use(new LocalStrategy({
  usernameField: 'username',
  passwordField: 'password'
},
  function (username, password, cb) {
    return User.findOne({ username, password })
      .then(function (user) {
        if (!user) {
          return cb(null, false, { 'message': 'Incorrect email or password' });
        }


        return cb(null, user, { 'message': 'You\'re Logged in successfully' });
      })
      .catch(function (err) {
        console.log('error from passport', err);
        cb(err);
      });
  }
));


passport.use(new JWTStrategy({
  jwtFromRequest: ExtractJwt.fromHeader("authorization"),
  secretOrKey: "jwtsecretinstring"
},
  function (jwtPayload, cb) {
    return cb(null, jwtPayload);
  }
));