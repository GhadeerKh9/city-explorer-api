const axios = require("axios");
const memoryArr = {};

async function getWeatherHandler(req, res) {
  const query = req.query.name;
  const longtitude = req.query.lon;
  const latitude = req.query.lat;
  // let weatherArray = [];

  if (memoryArr[query] !== undefined) {
    res.send(memoryArr[query]);
  } else {
    const weatherURL = `http://api.weatherbit.io/v2.0/forecast/daily?lat=${latitude}&lon=${longtitude}&key=${process.env.WEATHER_API_KEY}`;

    axios
      .get(weatherURL)
      .then((weatherOutputs) => {
        let weatherArray = weatherOutputs.data.data.map((item) => {
          return new Weather(item);

          // console.log(weatherOutputs)
        });
        // console.log(weatherOutputs);
        memoryArr[query] = weatherArray;
        res.status(200).send(weatherArray);
      })

      .catch((err) => {
        res.send(res.send(err));
      });
  }
}
class Weather {
  constructor(item) {
    this.date = item.datetime;
    this.desc = item.weather.description;
  }
}

module.exports = getWeatherHandler;
