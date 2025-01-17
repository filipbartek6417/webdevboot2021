const mongoose = require('mongoose');
const {Schema} = mongoose;
const productSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  category: {
    type: String,
    lowercase: true,
    enum: ['fruit', 'vegetable', 'dairy', 'baked goods']
  },
  farm: {
    type: Schema.Types.ObjectId,
    ref: 'Farm'
  }
})

module.exports = mongoose.model('Product', productSchema);
