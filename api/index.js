var express = require('express');
var faceapi = require('../face-api/index');
var api = express.Router();

api.post('/match', function (req, res) {
	console.log('/api/match');
	faceapi.match(req.body)
		.then(function(data) {
			res.json(data);
		})
		.catch(function (err) {
			res.json(err);
		});
});

api.post('/verify', function (req, res) {
	console.log('/api/verify');
	faceapi.verify(req.body)
		.then(function(data) {
			res.json(data);
		})
		.catch(function (err) {
			res.json(err);
		});
});

module.exports = api;