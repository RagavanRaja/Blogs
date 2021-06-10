const { render } = require("ejs");
const express = require("express");
//express app
const app = express();

const mongoose = require("mongoose");
const Blog = require("./models/blog");

const dbURI =
  "mongodb+srv://Ragavan:ragavan5@nodepractise.4osdz.mongodb.net/Node-Start?retryWrites=true&w=majority";
mongoose
  .connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => {
    //listen for request
    app.listen(3000);

    console.log("Connected to DB");
  })
  .catch((err) => console.log(err));

//register view engine
app.set("view engine", "ejs");
// middleware & static files
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

//Routes
app.get("/", (req, res) => {
  res.redirect("/blogs");
});
app.get("/about", (req, res) => {
  res.render("about");
});

app.get("/blogs", (req, res) => {
  Blog.find()
    .then((result) => {
      res.render("index", { blogs: result });
    })
    .catch((err) => console.log(err));
});
app.post("/blogs", (req, res) => {
  const blog = new Blog(req.body);
  blog
    .save()
    .then((result) => {
      res.redirect("/blogs");
    })
    .catch((err) => {
      console.log(err);
    });
});

app.get('/blogs/:id',(req,res)=>{
  const id=req.params.id;
  Blog.findById(id)
  .then((result)=>{
    res.render('details',{blog:result});
  })
  .catch((err)=>{
    console.log(err);
  })
})

app.delete('/blogs/:id',(req,res)=>{
  const id=req.params.id;
  Blog.findByIdAndDelete(id)
  .then((result)=>{
    res.json({redirect:'/blogs'});
  })
  .catch((err)=>{
    console.log(err);
  })
})

app.get("/blogs/create", (req, res) => {
  res.render("create");
});

app.use((req, res) => {
  res.status(404).render("404");
});
