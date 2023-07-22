require('dotenv').config({ path: __dirname + '/../../.env' });
const request = require('request')

const WEATHERSTACK_API_KEY = process.env.WEATHERSTACK_API_KEY

const forecast = (latitude, longitude, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=${WEATHERSTACK_API_KEY}&query=${latitude},${longitude}`

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('forecast => Unable to connect to weather service!', undefined)
        } else if (body.error) {
            callback(`forecast => ${body.error.info}`, undefined)
        } else {
            callback(undefined, body)
        }


    })
} 

module.exports = forecast