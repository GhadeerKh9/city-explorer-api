"use strict";
require("dotenv").config();
const express = require("express");
const server = express();
const axios = require("axios");
const cors = require("cors");
server.use(cors());

const PORT = process.env.PORT;
server.get("/weather", getWeatherHandler);

// const urlServer = `http://localhost:3060/weather?name=${inputName}&lon=${this.state.long}&lat=${this.state.lat}`

async function getWeatherHandler(req, res) {
  const query = req.query.name;
  const longtitude = req.query.lon;
  const latitude = req.query.lat;
  // let weatherArray = [];

  const weatherURL = `http://api.weatherbit.io/v2.0/forecast/daily?lat=${latitude}&lon=${longtitude}&key=${process.env.WEATHER_API_KEY}`;

  axios
    .get(weatherURL)
    .then((weatherOutputs) => {
      let weatherArray = weatherOutputs.data.data.map((item) => {
        return new Weather(item);

        // console.log(weatherOutputs)
      });
      console.log(weatherOutputs);
      res.send(weatherArray);
    })

    .catch((err) => {
      res.send(res.send(err));
    });
}

class Weather {
  constructor(item) {
    this.date = item.datetime;
    this.desc = item.weather.description;
  }
}

server.get("/movies", getMoviesHandler);

// const urlServer = `http://localhost:3060/movies?name=${inputName}

async function getMoviesHandler(req, res) {
  const query2 = req.query.name;

  const moviesURL = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&&page=1&query=${query2}`;

  axios
    .get(moviesURL)
    .then((moviesOutputs) => {
      let moviesArray = moviesOutputs.data.results.map((item) => {
        return new Movies(item);
      });

      res.send(moviesArray);
    })

    .catch((err) => {
      res.send(res.send(err));
    });
}

class Movies {
  constructor(item) {
    this.title = item.title;
    this.overview = item.overview;
    this.avgVotes = item.vote_average;
    this.count = item.vote_count;
    this.poster = `https://www.themoviedb.org/t/p/w600_and_h900_bestv2${item.poster_path}`;
    this.popularity = item.popularity;
    this.release = item.release_date;
  }
}

server.get("/test", (req, res) => {
  res.send("this is a test route");
});

server.get("*", (req, res) => {
  res.status(404).send("NOT found");
});

server.listen(PORT, () => {
  console.log(`I'm'on port: ${PORT}`);
});
