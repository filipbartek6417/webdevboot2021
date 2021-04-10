const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const ExpressError = require('../utils/ExpressError');
const Campground = require('../models/campground');
const { campgroundSchema } = require('../schemas.js')
const { isLoggedIn, validateCampground, isAuthorized } = require('../middleware.js');

router.get("/", catchAsync(async (req, res) => {
  const campgrounds = await Campground.find({});
  res.render("campgrounds/index", {campgrounds});
}))

router.get("/new", isLoggedIn, (req, res) => {
  res.render("campgrounds/new");
})

router.post("/", isLoggedIn, validateCampground, catchAsync(async (req, res) => {
  const campground = new Campground(req.body.campground);
  campground.author = req.user._id;
  await campground.save();
  req.flash('success', 'Succcessfuly created new campground!');
  res.redirect(`/campgrounds/${campground._id}`);
}))

router.get("/:id", catchAsync(async (req, res) => {
  const campground = await Campground.findById(req.params.id).populate({
    path: 'reviews',
    populate: {
      path: 'author'
    }
  }).populate('author');
  console.log(campground);
  if (!campground) {
    req.flash('error', `Sorry, we couldn't find that campground.`);
    return res.redirect('/campgrounds');
  }
  res.render("campgrounds/show", {campground});
}))

router.get("/:id/edit", isLoggedIn, isAuthorized, catchAsync(async (req, res) => {
  const campground = await Campground.findById(req.params.id);
  if (!campground) {
    req.flash('error', `Sorry, we couldn't find that campground.`);
    return res.redirect('/campgrounds');
  }
  res.render("campgrounds/edit", {campground});
}))

router.put("/:id", isLoggedIn, validateCampground, isAuthorized, catchAsync(async (req, res) => {
  const {id} = req.params;
  const campground = await Campground.findByIdAndUpdate(id,{ ...req.body.campground });
  req.flash('success', 'You have succcessfuly updated this campground.');
  res.redirect(`/campgrounds/${campground._id}`);
}))

router.delete("/:id", isLoggedIn, isAuthorized, catchAsync(async (req, res) => {
  const {id} = req.params;
  await Campground.findByIdAndDelete(id);
  req.flash('success', 'You have succcessfuly deleted a campground.');
  res.redirect("/campgrounds");
}))

module.exports = router;
