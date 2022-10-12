require('dotenv').config();

const express = require('express');
const path = require('path');
const passport = require('passport');
const session = require('express-session');
const morgan = require('morgan');
const logger = require('./config/logger');

const routes = require('./controllers');
const app = express();
const PORT = process.env.PORT || 3001;

require('./config/passport');

app.use(morgan(':remote-addr :method :url :status ":user-agent"', {
  stream: {
    write: (message) => logger.info(message.trim())
  },
  skip: (req, res) => {
    return res.statusCode === 304;
  }
})
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  session({ 
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(routes);
app.use(express.static(path.join(__dirname, './public')));

const server = app.listen(PORT, () => {
  console.log(`Server started on port: ${PORT}`);
});
