const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const Blog = require("./models/blog");
const { render } = require("ejs");

// app express
const app = express();
//connect to mongodb
// and listen to server when connected
dbURL =
  "mongodb+srv://essa:essa.jamal@cluster0.eiy7m.mongodb.net/essadb?retryWrites=true&w=majority";
mongoose
  .connect(dbURL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => {
    console.log("Connected to mongoose db");
    app.listen(3000, () => {
      console.log("Server Listening for port 3000");
    });
  })
  .catch((err) => console.log("error during db connection", err));

//register view engine
app.set("view engine", "ejs");
//app.set('views','myviews');

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

app.get("/", (req, res) => {
  const blogs = Blog.find()
    .sort({ createdAt: -1 })
    .then((result) => {
      res.render("index", { title: "All Blogs", blogs: result });
    })
    .catch((err) => {
      console.log("error on reading Blogs");
    });
});
app.post("/new-blog", (req, res) => {
  const blog = new Blog(req.body);
  blog
    .save()
    .then((result) => {
      console.log("record saved", result);
      res.redirect("/blogs");
    })
    .catch((err) => console.log("error on saving data", err));
});
app.get("/blogs/create", (req, res) => {
  res.render("create", { title: "Create a new Blog" });
});
app.get("/blogs/:id", (req, res) => {
  const id = req.params.id;
  console.log(id);
  Blog.findById(id)
    .then((result) => {
      res.render("details", { blog: result, title: "Blog Details" });
      // console.log(result);
    })
    .catch((err) => {
      console.log("error on getting blog by id", err);
    });
});
app.delete("/blogs/:id", (req, res) => {
  Blog.findByIdAndDelete(req.params.id)
    .then((result) => {
      res.json({ redirect: "/blogs" });
    })
    .catch((err) => {
      console.log("error on deleting blog 22", err);
    });
});
app.get("/blogs", (req, res) => {
  res.redirect("/");
});

app.get("/about", (req, res) => {
  res.render("about", { title: "About" });
});
app.get("/add-blog", (req, res) => {
  const blog = new Blog({
    title: "New Blog by mongoose 2",
    snippet: "Blog Snippet test , test is awesome",
    body: "Blog Snippet test , test is awesome Blog Snippet test , test is awesome Blog Snippet test , test is awesome Blog Snippet test , test is awesome",
  });
  blog
    .save()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => console.log("error on svaing a blog to DB"));
});
app.get("/all-blogs", (req, res) => {
  Blog.find()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log("error on reading list of blogs", err);
    });
});

app.get("/single-blog", (req, res) => {
  // Blog.findOne()
  Blog.findById("613d096426d728751536b70d")
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log("error on findOne of Blog", err);
    });
});

app.use((req, res) => {
  res.status(404).render("404", { title: "404" });
});
