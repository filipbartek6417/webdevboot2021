const Campground = require('../models/campground');

module.exports.index = async (req, res) => {
  const campgrounds = await Campground.find({});
  res.render("campgrounds/index", {campgrounds});
};

module.exports.createCampForm = (req, res) => {
  res.render("campgrounds/new");
};

module.exports.createCampground = async (req, res) => {
  const campground = new Campground(req.body.campground);
  campground.author = req.user._id;
  await campground.save();
  req.flash('success', 'Succcessfuly created new campground!');
  res.redirect(`/campgrounds/${campground._id}`);
};

module.exports.detailPage = async (req, res) => {
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
};

module.exports.editCampground = async (req, res) => {
  const campground = await Campground.findById(req.params.id);
  if (!campground) {
    req.flash('error', `Sorry, we couldn't find that campground.`);
    return res.redirect('/campgrounds');
  }
  res.render("campgrounds/edit", {campground});
};

module.exports.alterCampground = async (req, res) => {
  const {id} = req.params;
  const campground = await Campground.findByIdAndUpdate(id,{ ...req.body.campground });
  req.flash('success', 'You have succcessfuly updated this campground.');
  res.redirect(`/campgrounds/${campground._id}`);
};

module.exports.deleteCampground = async (req, res) => {
  const {id} = req.params;
  await Campground.findByIdAndDelete(id);
  req.flash('success', 'You have succcessfuly deleted a campground.');
  res.redirect("/campgrounds");
};
