"use strict";
const express = require("express");
const server = express();
const PORT = 3001;
require("cors");
require("dotenv").config();
// const dataArr = require("weather.json");

server.listen(PORT, () => {
  console.log(`Hi ${PORT}`);
});

server.get("/weather", (request, response) => {
  let str = "Hi";
  response.send(str);
  console.log(str);
});

/localhost:3001/weather
server.get('/weather', (request, response) => {

    response.send()
}

