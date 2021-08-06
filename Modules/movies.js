// const urlServer = `http://localhost:3060/movies?name=${inputName}

"use strict";
const axios = require("axios");
const memoryArr = {};

async function getMoviesHandler(req, res) {
  const query2 = req.query.name;

  if (memoryArr[query2] !== undefined) {
    res.send(memoryArr[query2]);
  } else {
    const moviesURL = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&&page=1&query=${query2}`;

    axios
      .get(moviesURL)
      .then((moviesOutputs) => {
        let moviesArray = moviesOutputs.data.results.map((item) => {
          return new Movies(item);
        });
        memoryArr[query2] = moviesArray;
        res.send(moviesArray);
      })

      .catch((err) => {
        res.send(res.send(err));
      });
  }
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
module.exports = getMoviesHandler;
