var express = require('express');
var bodyParser = require('body-parser');
var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/', require('./index.js'));



var server = app.listen(3000, function () {
        console.log('Express server listening on port ' + server.address().port);
});

