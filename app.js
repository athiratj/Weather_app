const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, res) {


    res.sendFile(__dirname + "/index.html");
    

});

app.post("/", function (req, res) {
    const query = req.body.cityName;
    const city = "London";
    const appid = "738159b9305853e4a02d9c16defd84df";
    const units = "metric";
    const url ="https://api.openweathermap.org/data/2.5/weather?q="+city+"&units="+units+"&appid="+appid;
    https.get(url, function (response) {
        console.log(response.statusCode);

        response.on("data", function (data) {
            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp;
            const weatherDescription = weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon;
            const imageURL = "https://openweathermap.org/img/wn/" + icon + "@2x.png";

            res.write("<h1>The temperature in "+query+" is " + temp + " degree Celcius.</h1>");
            res.write("<p>Weather is currently "+weatherDescription+"</p>")
            res.write("<img src= " + imageURL + " >");
            res.send();
        })

    });
});


app.listen(3000, function (req, res) {
    console.log("Server running in port 3000.");
});