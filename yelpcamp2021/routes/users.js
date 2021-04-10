const express = require('express');
const router = express.Router();
const users = require('../controllers/users.js')
const User = require('../models/user');
const passport = require('passport');
const catchAsync = require('../utils/catchAsync');

router.route('/register')
  .get(users.registerForm)
  .post(catchAsync(users.register))

router.route('/login')
  .get(users.loginForm)
  .post(passport.authenticate('local',
  {failureFlash: true, failureRedirect: '/login'}), users.login)

router.get('/logout', users.logout);

module.exports = router;
