const Campground = require('../models/campground');
const mapboxGeocoding = require("@mapbox/mapbox-sdk/services/geocoding");
const mapboxtoken = process.env.MAPBOX_TOKEN;
const geocoder = mapboxGeocoding({accessToken: mapboxtoken});
const {cloudinary} = require('../cloudinary');


module.exports.index = async (req, res) => {
  const campgrounds = await Campground.find({});
  res.render("campgrounds/index", {campgrounds});
};

module.exports.createCampForm = (req, res) => {
  res.render("campgrounds/new");
};

module.exports.createCampground = async (req, res) => {
  const geoData = await geocoder.forwardGeocode({
    query: req.body.campground.location,
    limit: 1
  }).send();
  const campground = new Campground(req.body.campground);
  campground.geometry = geoData.body.features[0].geometry;
  campground.images = req.files.map(f => ({
    url: f.path,
    filename: f.filename
  }))
  campground.author = req.user._id;
  await campground.save();
  console.log(campground);
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
  const images = req.files.map(f => ({url: f.path,filename: f.filename}));
  campground.images.push(...images);
  await campground.save();
  if (req.body.deleteImages) {
    for await (let fn of req.body.deleteImages) {
      cloudinary.uploader.destroy(fn);
    }
    await campground.updateOne({$pull: {images: {filename: {$in: req.body.deleteImages}}}});
  }
  req.flash('success', 'You have succcessfuly updated this campground.');
  res.redirect(`/campgrounds/${campground._id}`);
};

module.exports.deleteCampground = async (req, res) => {
  const {id} = req.params;
  await Campground.findByIdAndDelete(id);
  req.flash('success', 'You have succcessfuly deleted a campground.');
  res.redirect("/campgrounds");
};
