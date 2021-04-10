const express = require('express');
const router = express.Router({mergeParams: true});
const reviews = require('../controllers/reviews.js')
const catchAsync = require('../utils/catchAsync');
const ExpressError = require('../utils/ExpressError');
const Campground = require('../models/campground');
const Review = require('../models/review');
const { reviewSchema } = require('../schemas.js')
const { validateReview, isLoggedIn, isReviewAuthorized } = require('../middleware.js')

router.post("/", isLoggedIn, validateReview, catchAsync(reviews.createReview));

router.delete("/:reviewId", isLoggedIn, isReviewAuthorized,
catchAsync(reviews.deleteReview));

module.exports = router;
