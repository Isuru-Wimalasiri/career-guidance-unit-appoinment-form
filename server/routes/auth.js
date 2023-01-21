const router = require('express').Router();
const passport = require('passport');

router.get(
  '/google/callback',
  passport.authenticate('google', {
    failureRedirect: process.env.CLIENT_URL,
  }),
  function (req, res) {
    // Successful authentication, redirect home.
    res.redirect(process.env.CLIENT_URL + '/home');
  }
);

router.get('/google', passport.authenticate('google', ['profile', 'email']));
router.get('/logout', (req, res) => {
  req.logout();
  req.redirect(process.env.CLIENT_URL);
});

module.exports = router;
