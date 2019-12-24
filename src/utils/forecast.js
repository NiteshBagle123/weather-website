const request = require('request');
const forecast = (lat, long, callback) => {
    const url = `https://api.darksky.net/forecast/534ae9e102512f2b80b2995786a7662c/${lat},${long}`;
    request({ url, json: true }, (error, { body }) => {
        if(error){
            callback('Unable to connect weather service', undefined);
        } else if(body.error){
            callback('Unable to find location', undefined);
        } else {
            const { temperature, precipProbability, pressure, windSpeed } = body.currently;
            callback(undefined, `${body.daily.data[0].summary} It is currently ${temperature} out. There is ${precipProbability}% chance of rain. Pressure is ${pressure} and wind speed is ${windSpeed}`);
        }
    });
}

module.exports = forecast;