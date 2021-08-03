"use strict";
require('dotenv').config();
const express = require('express');
const server = express();
const axios = require('axios');
const cors = require('cors');
server.use(cors());


const PORT = 3050
server.get('/weather', getWeatherHandler);


// const urlServer = `http://localhost:3004/weather?name=${inputName}&lon=${this.state.long}&lat=${this.state.lat}`

async function getWeatherHandler(req, res){
  const query = req.query.name
  const longtitude= req.query.lon
  const latitude = req.query.lat
  let weatherArray = [];

  const weatherURL = `http://api.weatherbit.io/v2.0/forecast/daily?lat=${latitude}&lon=${longtitude}&key=${process.env.WEATHER_API_KEY}`


  axios
  .get(weatherURL)
  .then(weatherOutputs => {
  weatherArray = weatherOutputs.data.data.map(item =>{
    return new Weather(item)


  })
  // res.send(weatherArray) 
})

.catch(err =>{res.send(err)})

}




class Weather {
constructor(item){
  this.date = item.datetime
  this.desc = item.weather.description
}
}

server.get('/test',(req,res) => {
  res.send('this is a test route');
})


server.get('*',(req,res) => {
  res.status(404).send('Not Found');
})


server.listen(PORT,()=>{
  console.log(`I'm'on port: ${PORT}`);
})

