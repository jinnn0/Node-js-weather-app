const express = require('express')
const path = require('path')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const PORT = 3000

// Define paths for Express config
const publicDirPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebar and views location
app.set('view engine', 'hbs');
app.set('views',viewsPath );
hbs.registerPartials(partialsPath)

// Setip static directory to serve
app.use(express.static(publicDirPath))


// Routes
app.get('', (req, res) => {
    res.render('index', {title : 'Home page 🏡'})
})

app.get('/about', (req, res) => { 
    res.render('about', {title : 'About page 😀'})
})

app.get('/weather', (req, res) => {
    const address = req.query.address

    if (!address) {
        res.send({error : 'Please provide an address'})
    } else {
        geocode(address, (error, { latitude, longitude } = {}) => {
            if (error) {
                return res.send({error})
            }

            forecast(latitude, longitude, (error, {location, current}) => {
                if (error) {
                    return res.send({error})
                }

                res.send({location : location.name, temperature : current.temperature, description : current.weather_descriptions[0]})
            })
        })
    }
})


app.get('/help', (req, res) => {
    res.render('help', {title : 'Help page 😙'})
})

// Help 404
app.get('/help/*', (req, res) => {
    res.render('404', {errorMessage : 'NOT FOUND'})

})
// 404
app.get('*', (req, res) => {
    res.render('404',  {errorMessage : 'NOT FOUND 2 '})

})


app.listen(PORT, () => {
    console.log("Server is up on port 3000.")
})

