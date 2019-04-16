var express = require('express');
var bodyParser = require('body-parser');
var apiRouter = require('./api/index');

var app = express();

app.use(express.static('public'));
app.use(bodyParser.json());
app.use('/api', apiRouter);

app.listen(3000, function () {
	console.log('run server on localhost:3000');
});