const request = require('request');
const geocode = (address, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoiYmFnbGVuIiwiYSI6ImNrNGp6ZnZ2eDFsOWIzZXF3b3djNnR1MW0ifQ.sDDE32NA5saAoOCWKdistw&limit=1`;
    request({ url, json: true }, (error, response) => {
        const { features } = response.body
        if(error){
            callback('Unable to get connect location service', undefined);
        } else if(features.length === 0) {
            callback('Unable to get connect location, try another search', undefined);
        } else {
            callback(undefined, {
                longitude: features[0].center[0],
                latitude: features[0].center[1],
                location: features[0].place_name
            });
        }
    });
};

module.exports = geocode;
