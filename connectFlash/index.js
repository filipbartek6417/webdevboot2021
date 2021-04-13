const express = require('express');
const app = express();
const path = require('path');
const methodOverride = require('method-override');
const mongoose = require('mongoose');
const session = require('express-session');
const flash = require('connect-flash');
const Product = require('./models/product');
const Farm = require('./models/farm');

mongoose.connect('mongodb://localhost:27017/connectFlash', {useNewUrlParser: true, useUnifiedTopology: true})
  .then(() => console.log('mongo connected'))
  .catch(err => console.log(err))

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.urlencoded({extended: true}));
app.use(methodOverride('_method'));
const sessionOpts = {secret: 'someOtherEnvVar', resave: false, saveUninitialized: false}
app.use(session(sessionOpts));
app.use(flash());

app.use((req, res, next) => {
  res.locals.messages = req.flash('success');
  next();
})

const categories = ['fruit', 'vegetable', 'dairy', 'baked goods'];
//Farm routes
app.get("/farms", async (req, res) => {
  const farms = await Farm.find({});
  res.render("farms/index", {farms});
})

app.get("/farms/new", (req, res) => {
  res.render('farms/new');
})

app.get("/farms/:id", async (req, res) => {
  const farm = await Farm.findById(req.params.id).populate('products');
  res.render("farms/show", {farm})
})

app.get("/farms/:id/products/new", async (req, res) => {
  const {id} = req.params;
  const farm = await Farm.findById(id)
  res.render("products/new", {categories, farm})
})

app.delete('/farms/:id', async (req, res) => {
  const farm = await Farm.findByIdAndDelete(req.params.id);
  res.redirect('/farms');
})

app.post("/farms", async (req, res) => {
  const farm = new Farm(req.body);
  await farm.save();
  req.flash('success', 'Successfuly created a new farm!');
  res.redirect('/farms')
})

app.post("/farms/:id/products", async (req, res) => {
  const {id} = req.params;
  const farm = await Farm.findById(id);
  const {name, price, category} = req.body;
  const product = new Product({name, price, category});
  farm.products.push(product);
  product.farm = farm;
  await farm.save();
  await product.save();
  res.redirect(`/farms/${id}`);
})


app.get("/products", async (req, res) => {
  const {category} = req.query;
  if (category) {
    const products = await Product.find({category});
    res.render("products/index", {products, category});
  } else {
    const products = await Product.find({});
    res.render("products/index", {products, category: "All"});
  }
})

app.get("/products/new", (req, res) => {
  res.render("products/new", {categories});
})

app.post("/products", async (req, res) => {
  const newProduct = new Product(req.body);
  await newProduct.save();
  res.redirect(`/products/${newProduct._id}`);
})

app.get("/products/:id", async (req, res) => {
  const {id} = req.params;
  const foundProduct = await Product.findById(id).populate('farm', 'name');
  res.render("products/show",{foundProduct});
})

app.get("/products/:id/edit", async (req, res) => {
  const {id} = req.params;
  const product = await Product.findById(id);
  res.render("products/edit", {product, categories});
})

app.put("/products/:id", async (req, res) => {
  const {id} = req.params;
  await Product.findByIdAndUpdate(id, req.body, {runValidators: true});
  res.redirect(`/products/${id}`);
})

app.delete("/products/:id", async (req, res) => {
  const {id} = req.params;
  await Product.findByIdAndDelete(id);
  res.redirect("/products");
})

app.listen(3000, () => {
  console.log("Running on port 3000");
})