const Blog = require("../models/blog");

const blog_index = (req, res) => {
  const blogs = Blog.find()
    .sort({ createdAt: -1 })
    .then((result) => {
      res.render("blogs/index", { title: "All Blogs", blogs: result });
    })
    .catch((err) => {
      console.log("error on reading Blogs");
    });
};

const blog_create_get = (req, res) => {
  res.render("blogs/create", { title: "Create a new Blog" });
};
const blog_create_post = (req, res) => {
  const blog = new Blog(req.body);
  blog
    .save()
    .then((result) => {
      console.log("record saved", result);
      res.redirect("/blogs");
    })
    .catch((err) => console.log("error on saving data", err));
};

const blog_details = (req, res) => {
  const id = req.params.id;
  console.log(id);
  Blog.findById(id)
    .then((result) => {
      res.render("blogs/details", { blog: result, title: "Blog Details" });
      // console.log(result);
    })
    .catch((err) => {
      console.log("error on getting blog by id", err);
    });
};

const blog_delete = (req, res) => {
  Blog.findByIdAndDelete(req.params.id)
    .then((result) => {
      res.json({ redirect: "/blogs" });
    })
    .catch((err) => {
      console.log("error on deleting blog 22", err);
    });
};
module.exports = {
  blog_index,
  blog_create_get,
  blog_create_post,
  blog_details,
  blog_delete,
};
