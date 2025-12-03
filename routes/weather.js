// Create a new router
const express = require("express")
const router = express.Router()
const request = require('request')

//Handle our routes
router.get('/', function (req, res, next) {
    res.render('weather.ejs');
});


// Handle the weather search form submission

router.get('/search', function (req, res, next) {

    let apiKey = '7346bc3752d1978ccbc43f4450628809';
    let city = req.query.city;

    if (!city) {
        return res.send("Please enter a city in the ?city= URL.");
    }

    let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

    request(url, function (err, response, body) {
        if (err) {
            return next(err);
        }

        let weather = JSON.parse(body);

        if (!weather || !weather.main) {
            return res.send("No data found – please check the city name.");
        }

        let wmsg =
            'It is ' + weather.main.temp +
            ' degrees in ' + weather.name +
            '! <br> The humidity now is: ' + weather.main.humidity + '%' +
            '<br> The wind speed is: ' + weather.wind.speed + ' m/s.' +
            '<br> The weather condition is: ' + weather.weather[0].description + '.';

        return res.send(wmsg);
    });
});



// Export the router object so index.js can access it
module.exports = router