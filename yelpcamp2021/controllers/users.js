const Campground = require('../models/campground');
const Review = require('../models/review');
const User = require('../models/user');

module.exports.registerForm = (req, res) => {
  res.render('users/register');
};

module.exports.register = async (req, res) => {
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
};

module.exports.loginForm = (req, res) => {
  res.render('users/login');
};

module.exports.login = (req, res) => {
  req.flash('success', `Welcome back, ${req.body.username}!`);
  const returnTo = req.session.returnTo || '/campgrounds';
  delete req.session.returnTo;
  res.redirect(returnTo);
};

module.exports.logout = (req, res) => {
  req.logout();
  req.flash('success', "You've been logged out!");
  res.redirect('/campgrounds');
};
