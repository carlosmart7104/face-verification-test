var express = require('express');
var bodyParser = require('body-parser');
var apiRouter = require('./api/index');

var app = express();

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.use('/api', apiRouter);

app.listen(process.env.PORT || 3000, function () {
	console.log('run server on localhost:3000');
});