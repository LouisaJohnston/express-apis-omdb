// required packages
const express = require("express");
const ejsLayouts = require("express-ejs-layouts");
const rowdy = require("rowdy-logger");
const axios = require("axios");
// configure environmental variables
require("dotenv").config();

const OMDB_API_KEY = process.env.OMDB_API_KEY;

// configure express app
const app = express();
const PORT = 3000;
// (╯°□°）╯︵ ┻━┻
const rowdyResults = rowdy.begin(app);

// Sets EJS as the view engine
app.set("view engine", "ejs");
// Specifies the location of the static assets folder
app.use(express.static("static"));
// Enables EJS Layouts middleware
app.use(ejsLayouts);
// Sets up body-parser for parsing form data
app.use(express.urlencoded({ extended: false }));
// Adds some logging to each request
app.use(require("morgan")("dev"));

// Routes
app.get("/", (req, res) => {
  res.render("index")
});


app.get("/results", async (req, res) => {
  try {
    const results = await axios.get(
      `http://www.omdbapi.com/?apikey=${OMDB_API_KEY}&s=${req.query.search}`
    );
    res.render("results", { movies: results.data.Search });
  } catch (err) {
    console.log(err);
  }
});

app.get("/detail", async (req, res) => {
  res.json({ message: 'SHOW ME SOME DEETS!'})
})

// The app.listen function returns a server handle
app.listen(PORT, () => {
  console.log(`listening on PORT:${PORT}`);
  rowdyResults.print();
});
