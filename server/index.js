const express = require('express');
require('dotenv').config();
const cors = require('cors');
const passport = require('passport');
const session = require('express-session');
const passportSetup = require('./passport');
const authRoute = require('./routes/auth');

const app = express();

app.use((req, res, next) => {
  if (req.isAuthenticated()) {
    // user is authenticated, proceed to next middleware/route
    return next();
  } else {
    // user is not authenticated, redirect to login page
    res.redirect('/login');
  }
});

app.use(
  session({
    secret: 'session',
    cookie: { maxAge: 24 * 60 * 60 * 100 },
    saveUninitialized: false,
  })
);

app.use(passport.initialize());

app.use(
  cors({
    origin: 'http://localhost/3000',
    methods: 'GET,POST,PUT,DELETE',
    credentials: true,
  })
);

app.use('/auth', authRoute);

const port = process.env.PORT || 3001;

app.listen(port, () => {
  console.log(`Listening on port  ${port}`);
});
