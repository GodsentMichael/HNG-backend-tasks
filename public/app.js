require("module-alias/register");
const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv").config();

// App Init
const app = express();

// Middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// App Home Route
app.get("/", (req, res) => {
  res.send("Welcome to the HNG TASKs API");
});

// Register Routes
require("../routes/index.routes")(app);


module.exports = app;
