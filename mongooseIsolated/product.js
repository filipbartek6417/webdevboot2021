const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/shopApp', {useNewUrlParser: true, useUnifiedTopology: true})
  .then(() => console.log('connected'))
  .catch(err => console.log(err))

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  price: Number,
  isOnSale: Boolean
})

const Product = mongoose.model('Product', productSchema);
const bike = new Product({name: 'mountainBike', price: 500, isOnSale: true})
bike.save().then(data => console.log(data))
