const express = require('express');
const router = express.Router();
const User = require('../models/user');
const passport = require('passport');
const catchAsync = require('../utils/catchAsync');

router.get('/register', (req, res) => {
  res.render('users/register');
})

router.post('/register', catchAsync(async (req, res) => {
  try {
    const {email, username, password} = req.body;
    const user = new User({email, username});
    const regUser = await User.register(user, password);
    req.login(regUser, err => {
      if(err) return next(err);
      req.flash('success', 'Welcome to Yelp Camp!');
      res.redirect('/campgrounds')
    });
  } catch (e) {
    req.flash('error', e.message);
    res.redirect('/register');
  }
}));

router.get('/login', (req, res) => {
  res.render('users/login');
})

router.post('/login', passport.authenticate('local', {failureFlash: true, failureRedirect: '/login'}), (req, res) => {
  req.flash('success', `Welcome back!`);
  const returnTo = req.session.returnTo || '/campgrounds';
  delete req.session.returnTo;
  res.redirect(returnTo);
})

router.get('/logout', (req, res) => {
  req.logout();
  req.flash('success', "You've been logged out!");
  res.redirect('/campgrounds');
})

// router.get('/fakeUser', async (req, res) => {
//   const user = new User({email: 'lozorno@borinka.lab', username: 'lozorno'});
//   const registered = await User.register(user, 'passgoodword'); // does all the auth for us
//   res.send(registered);
// })

module.exports = router;
