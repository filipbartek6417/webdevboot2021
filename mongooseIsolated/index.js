const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/movieApp', {useNewUrlParser: true, useUnifiedTopology: true})
  .then(() => console.log('connected'))
  .catch(err => console.log(err))

const movieSchema = new mongoose.Schema({
  title: String,
  year: Number,
  score: Number,
  rating: String
});
const Movie = mongoose.model('Movie', movieSchema);
const amadeus = new Movie({title: "Amadeus", year: 1986, score: 9.2, rating: 'R'})
