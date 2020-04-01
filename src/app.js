const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const app = express();
const port = process.env.port || 3000;

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// Setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather App",
    name: "Andrew Mead"
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About me",
    name: "Andrew Mead"
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    message: "This is the help page",
    title: "Help",
    name: "Andrew Mead"
  });
});

app.get("/weather", (req, res) => {
  const { address } = req.query;

  if (!address) {
    return res.send({
      error: "You must provide an address"
    });
  }

  geocode(address, (error, data) => {
    if (error) {
      return res.send({ error });
    }

    const { latitude, longitude } = data;
    forecast(latitude, longitude, (error, forecastData) => {
      if (error) {
        return res.send({ error });
      }

      res.send({
        forecast: forecastData,
        location: data.location
      });
    });
  });
});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "You must provide a search term"
    });
  }

  console.log(req.query.search);

  res.send({
    products: []
  });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    message: "Help article not found",
    title: "404",
    name: "Andrew Mead"
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    message: "Page not found",
    title: "404",
    name: "Andrew Mead"
  });
});

app.listen(port, () => {
  console.log("Server is up 3000.");
});
