require('dotenv').config();

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const { User } = require('../models');

passport.use(new LocalStrategy(
  async (username, password, done) => {
    const { rows, rowCount } = await User.findUser({ username, password });

    if (rowCount > 0) {
      return done(null, rows[0]);
    }
    else {
      return done(null, false);
    }
  }
));

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});
