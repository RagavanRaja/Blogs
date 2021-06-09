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

app.get("/", (req, res) => {
  res.render("index", { title: "Home" });
});
app.get("/about", (req, res) => {
  res.render("about");
});
app.get("/blogs/create", (req, res) => {
  res.render("create");
});
app.get("/add-blog", (req, res) => {
  const blog = new Blog({
    title: "New Blog",
    snippet: "About my new Blog",
    body: "Bla lalalalalalla",
  });

  blog
    .save()
    .then((result) => res.send(result))
    .catch((err) => {
      console.log(err);
    });
});

app.use((req, res) => {
  res.status(404).render("404");
});
