const express = require('express');
const router = express.Router();
const campgrounds = require('../controllers/campgrounds.js');
const catchAsync = require('../utils/catchAsync');
const ExpressError = require('../utils/ExpressError');
const Campground = require('../models/campground');
const { campgroundSchema } = require('../schemas.js')
const { isLoggedIn, validateCampground, isAuthorized } = require('../middleware.js');
const multer = require('multer');
const {storage} = require('../cloudinary');
const upload = multer({storage});

router.route('/')
  .get(catchAsync(campgrounds.index))
  .post(isLoggedIn, upload.array('campground[image]'), validateCampground,
  catchAsync(campgrounds.createCampground))

router.get("/new", isLoggedIn, campgrounds.createCampForm);

router.route('/:id')
  .get(catchAsync(campgrounds.detailPage))
  .put(isLoggedIn, isAuthorized, upload.array('campground[image]'), validateCampground, 
  catchAsync(campgrounds.alterCampground))
  .delete(isLoggedIn, isAuthorized,
  catchAsync(campgrounds.deleteCampground))

router.get("/:id/edit", isLoggedIn, isAuthorized,
  catchAsync(campgrounds.editCampground));

module.exports = router;
