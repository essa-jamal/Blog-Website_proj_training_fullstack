const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const blogRoutes=require('./routes/blogRoutes')

// app express
const app = express();
//connect to mongodb
// and listen to server when connected
dbURL =
  "mongodb+srv://abcd:abcd.abcd@cluster0.eiy7m.mongodb.net/abcd?retryWrites=true&w=majority";
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


//routes
app.get("/", (req, res) => {
  res.redirect("/blogs");

});
//about page
app.get("/about", (req, res) => {
  res.render("about", { title: "About" });
});
//blog routes
app.use( '/blogs',blogRoutes);
//404 page
app.use((req, res) => {
  res.status(404).render("404", { title: "404" });
});
