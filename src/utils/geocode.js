require('dotenv').config({ path: __dirname + '/../../.env' });
const request = require('request')

const MAPBOX_API_KEY = process.env.MAPBOX_API_KEY

const geocode = (address, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=${MAPBOX_API_KEY}`

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('geocode => Unable to connect to location services!', undefined)
        }  else if (body.features.length === 0) {
            callback('geocode => Unable to find location. Try another search.', undefined)
        } else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode