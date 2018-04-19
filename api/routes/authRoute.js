const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const passport = require('passport');

//Login
router.post('/login', function (request, response) {

  passport.authenticate('local', { session: false }, (err, user, info) => {

    if (err || !user) {
      return response.status(400).json({
        message: info.message,
        user: user
      });
    }


    request.login(user, { session: false }, (err) => {
      if (err) {
        res.send(err);
      }

      //If no error, then generate a signed web token with user object
      console.log('User object in authRoute', user);
      const token = jwt.sign({
        username: user._id              //unique id of user
      },'jwtsecretinstring');
      return response.status(200).json({ user, token });

    });
  })(request, response);


});

module.exports = router;