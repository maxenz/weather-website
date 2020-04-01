const request = require("request");

const forecast = (latitude, longitude, callback) => {
  const url = `https://api.darksky.net/forecast/263764a238e446ff7791a4118d5855d9/${latitude},${longitude}?units=si`;
  request({ url, json: true }, (error, response) => {
    if (error) {
      callback("Unable to connect to forecast service!");
    } else if (response.body.error) {
      callback("Unable to find location");
    } else {
      callback(
        undefined,
        response.body.daily.data[0].summary +
          " It is currently " +
          response.body.currently.temperature +
          " degrees out. There is a " +
          response.body.currently.precipProbability +
          "% chance of rain today."
      );
    }
  });
};

module.exports = forecast;
