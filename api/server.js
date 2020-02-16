var express = require('express');
var bodyParser = require('body-parser');
var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.all('/*', function (req, res, next) {
        res.header('Access-Control-Allow-Origin', '*'); // restrict it to the required domain
        res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
        res.header('Access-Control-Allow-Headers', 'Content-Type,Content-type');
        if (req.method == 'OPTIONS') {
            res.status(200).end();
        } else {
            next();
        }
    });
app.use('/', require('./index.js'));

var server = app.listen(1338, function () {
        console.log('Express server listening on port ' + server.address().port);
});

