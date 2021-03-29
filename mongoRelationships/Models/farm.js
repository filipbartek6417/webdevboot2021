const mongoose = require('mongoose');
const { Schema } = mongoose;

mongoose.connect('mongodb://localhost:27017/mongoRelationship', { useNewUrlParser: true, useUrlEncoded: true })
  .then(() => {
    console.log("Mongo connected");
  })
  .catch(err => {
    console.log("Mongo error");
    console.log(err);
  })

const productSchema = new Schema({
  name: String,
  price: Number,
  season: {
    type: String,
    enum: ['Spring', 'Summer', 'Fall', 'Winter']
  }
})


// Product.insertMany([
//   {name: 'Goddess Melon', price: 4.99, season: 'Summer'},
//   {name: 'Delicious Golden Apple', price: 7.99, season: 'Fall'},
//   {name: 'Hot Cranberries', price: 13.99, season: 'Winter'}
// ])

const farmSchema = new Schema({
  name: String,
  city: String,
  products: [{type: Schema.Types.ObjectId, ref: 'Product'}]
})

const Product = mongoose.model('Product', productSchema);
const Farm = mongoose.model('Farm', farmSchema);

const makeFarm = async () => {
  const farm = new Farm({name: 'Zavodna mlikarna', city: 'Zavod' });
  const melon = await Product.findOne({name: 'Goddess Melon'});
  farm.products.push(melon);
  await farm.save();
  console.log(farm);
}

makeFarm();

const addProduct = async () => {
  const farm = await Farm.findOne({name: 'Zavodna mlikarna'});
  const melon = await Product.findOne({name: 'Goddess Melon'})
  farm.products.push(melon);
  await farm.save();
  console.log(farm);
}

addProduct();

Farm.findOne({name: 'Zavodna mlikarna'}).populate('products').then(farm => console.log(farm));
