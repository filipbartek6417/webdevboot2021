const express = require('express');
const app = express();
const path = require('path');
const {v4: uuid} = require('uuid');
const methodOverride = require('method-override');

app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(methodOverride('_method'));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'))

let comments = [
  {
    id: uuid(),
    user: "alzbetka",
    text: "where"
  },{
    id: uuid(),
    user: "betka",
    text: "is"
  },{
    id: uuid(),
    user: "cibetka",
    text: "my"
  },{
    id: uuid(),
    user: "debetka",
    text: "cocaine"
  }
]

app.get("/", (req, res) => {
  res.render('home');
})

app.get("/comments", (req, res) => {
  res.render('comments/index', {comments})
})

app.get("/comments/new", (req, res) => {
  res.render('comments/new')
})

app.get("/comments/:id", (req, res) => {
  const { id } = req.params;
  const comment = comments.find(c => c.id === id);
  res.render("comments/show", {comment})
})

app.get("/comments/:id/edit", (req, res) => {
  const { id } = req.params;
  const comment = comments.find(c => c.id === id);
  res.render("comments/edit", {comment});
})

app.patch("/comments/:id", (req, res) => {
  const {id} = req.params;
  const newText = req.body.text;
  const foundComment = comments.find(c => c.id === id);
  foundComment.text = newText;
  res.redirect("/comments");
})

app.delete("/comments/:id", (req, res) => {
  const {id} = req.params;
  comments = comments.filter(c => c.id !== id);
  res.redirect("/comments")
})

app.post("/comments", (req, res) => {
  const {user, text} = req.body;
  comments.push({ user, text, id: uuid() })
  res.redirect("/comments");
})

app.get("/r/:sub", (req,res) => {
  const {sub} = req.params;
  res.render("sub", {sub});
})

app.get("/rand", (req, res) => {
  const num = Math.floor(Math.random()*10)+1;
  res.render('rand', {num});
})

app.listen(3000, () => {
  console.log("Listening on port 3000");
})
