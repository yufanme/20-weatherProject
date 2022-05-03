const express = require('express');
const https = require('https');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;
app.use(bodyParser.urlencoded({ extended: true }));


app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.post('/', (req, res) => {

    const query = req.body.cityName;
    
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=cf348c19923690dbd343239d75fb8d4a&lang=zh_cn&units=metric`
    
https.get(url, (response) => {
    response.on('data',function(data) {
        res.write('<head><meta charset="utf-8"></head>');
        const weatherData = JSON.parse(data);
        const temp = weatherData.main.temp;
        const description = weatherData.weather[0].description;
        const icon = weatherData.weather[0].icon;
        const iconUrl = `http://openweathermap.org/img/wn/${icon}@2x.png`;
        res.write(`<img src=${iconUrl}>`);
        // console.log(description);
        console.log(temp);
        res.write(`<h1>Temp in ${query} is:${temp}℃</h1>`);
        res.write(`<h1>Weather in ${query} is:${description}</h1>`);
        res.send();
    })

})
})



app.listen(port, function(){
    console.log('listening on port ' + port);
});