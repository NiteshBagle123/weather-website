const path = require('path');
const express = require('express');
const hbs = require('hbs');
const app = express();
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

// defien paths for express configuration
const publicDirPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// set up for static directory to serve
app.use(express.static(publicDirPath));

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather Page',
        name: 'Nitesh Bagle'
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Page',
        name: 'Nitesh Bagle'
    });
});

app.get('/help', (req, res) => {
    res.render('help', {
        message: 'Help page information',
        title: 'Help Page',
        name: 'Nitesh Bagle'
    });
});

app.get('/weather', (req, res) => {
    const { address } = req.query;
    if(!address){
        return res.send({
            code: 400,
            message: 'You must provide Address'
        })
    }
    geocode(address, (error, { longitude, latitude, location } = {}) => {
        if(error){
            return res.send({ code: 400, message: error });
        }
        forecast(longitude, latitude, (err, forecastData) => {
            if(err){
                return res.send({ code: 400, message: err });
            }
            res.send({ forecast: forecastData, location, address })
        })
    });
});

app.get('/help/*', (req, res) => {
    res.render('not-found', {
        message: 'Help article not found',
        title: 'Help Page does not exist',
        name: 'Nitesh Bagle'
    });
});

app.get('/products', (req, res) => {
    const { search } = req.query;
    if(!search) {
        return res.send({
            code: 400,
            message: 'You must provide search term'
        })
    }
    res.send({
        products: []
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        message: 'Page not found',
        title: 'Page does not exist',
        name: 'Nitesh Bagle'
    });
});

app.listen(3000, () => {
    console.log('Running on port 3000');
});