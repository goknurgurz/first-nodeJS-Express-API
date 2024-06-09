const express = require('express');
const https = require('https');

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true })); /* Kullanıcıdan aldığımız inputu çekip kendi değişkenimizde saklayabiliyoruz */

app.listen(port, function () {
    console.log('dinleniyorr ' + port);
});

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html'); /* index dosyamızı göreceğiz */
})

app.post('/', function (req, res) {
    let id = Number(req.body.rickandmorty);
    let url = 'https://rickandmortyapi.com/api/character/' + id; /* ID'yi kendimiz veriyoruz */
    let rickImg = 'https://rickandmortyapi.com/api/character/avatar/' + id + '.jpeg';

    https.get(url, function (response) { /* Parse çalışmıyor */
        let responseData = '';
        response.on('data', function (dataSanchez) {
            responseData += dataSanchez;
        });
        response.on('end', function () {
            let rickInfo = JSON.parse(responseData);
            let rickName = rickInfo.name;
            const rickStatus = rickInfo.status;

            res.write("<h1>Character Name: " + rickName + "</h1>");
            res.write('<img src="' + rickImg + '">');
            
            res.write("<h2>Status: " + rickStatus + "</h2>");
                        // Check if the character is alive and display a green button if true
                        if (rickStatus.toLowerCase() === 'alive') {
                            res.write('<div style="height: 20px; width: 20px; background-color: green; border-radius: 50%; display: inline-block; margin-left: 10px;"></div>');
                        }
                        else if (rickStatus.toLowerCase() === 'dead') {
                            res.write('<div style="height: 20px; width: 20px; background-color: red; border-radius: 50%; display: inline-block; margin-left: 10px;"></div>');
                        }
            
            res.send();
        });
    });
});