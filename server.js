"use strict";

const express = require("express");
require("dotenv").config();
const server = express();

const cors = require("cors");

const PORT = process.env.PORT;

const weatherVar = require("./Modules/weather");
const moviesVar = require("./Modules/movies");

server.use(cors());

// const urlServer = `http://localhost:3070/weather?name=${inputName}&lon=${this.state.long}&lat=${this.state.lat}`

server.get("/weather", weatherVar);

// const urlServer = `http://localhost:3070/movies?name=${inputName}

server.get("/movies", moviesVar);

server.get("/test", (req, res) => {
  res.send("this is a test route");
});

server.get("*", (req, res) => {
  res.status(404).send("NOT found");
});

server.listen(PORT, () => {
  console.log(`I'm'on port: ${PORT}`);
});
