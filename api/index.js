var express = require('express');
var verify = require('../face-api/verify');
var api = express.Router();

api.post('/verify', function (req, res) {
	verify.match(req.body)
		.then(function(data) {
			res.json(data);
		})
		.catch(function (err) {
			res.json(err);
		});
});

module.exports = api;