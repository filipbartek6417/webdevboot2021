const mongoose = require('mongoose');
const cities = require('./cities');
const {descriptors, places} = require('./seedHelpers');
const Campground = require('../models/campground')
mongoose.connect("mongodb://localhost:27017/yelpcamp", {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
})
const db = mongoose.connection;
db.on("error", console.error.bind(console, "Connection error:"));
db.once("open", () => {
  console.log("Database connected");
})

const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
  await Campground.deleteMany({});
  for(let i = 0; i < 50; i++){
    const random1000 = Math.floor(Math.random() * 1000);
    const price = Math.floor(Math.random() * 30) + 10;
    const camp = new Campground({
      //My user id
      author: '607020d402448f4724b645bd',
      location: `${cities[random1000].city}, ${cities[random1000].state}`,
      title: `${sample(descriptors)} ${sample(places)}`,
      geometry: { type: 'Point', coordinates: [ -74.08083, 4.59889 ] },
      images: [
        {
            url: 'https://res.cloudinary.com/dznraveek/image/upload/v1618293807/yelpcamp/lsy580cm48rkbydhtntv.jpg',
            filename: 'yelpcamp/lsy580cm48rkbydhtntv'
        },
        {
            url: 'https://res.cloudinary.com/dznraveek/image/upload/v1618293045/yelpcamp/srpj3sxj1vbk2tsjbcjj.jpg',
            filename: 'yelpcamp/srpj3sxj1vbk2tsjbcjj'
        },
      ],
      description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      price
    })
    await camp.save();
  }
}

seedDB().then(() => {
  mongoose.connection.close();
})
