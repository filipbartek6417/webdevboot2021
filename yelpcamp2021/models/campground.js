const mongoose = require('mongoose');
const {Schema} = mongoose;
<<<<<<< HEAD
const Review = require('./review');
=======
const Review = require('./models/review');
>>>>>>> bfc3e24fe1879f0b6f89972f986ac5c757e32ae5

const CampgroundSchema = new Schema({
  title: String,
  image: String,
  price: Number,
  description: String,
  location: String,
  reviews: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Review'
    }
  ]
})

CampgroundSchema.post('findOneAndDelete', async function (doc) {
  if (doc) {
    await Review.deleteMany({
      _id: {
        $in: doc.reviews
      }
    })
  }
})

module.exports = mongoose.model('Campground', CampgroundSchema);
