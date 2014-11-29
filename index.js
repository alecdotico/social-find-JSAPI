// Social Networks finder API
var API = require('./api');

// Routing
var express = require("express");
var logfmt = require("logfmt");
var app = express();

// Set logger
app.use(logfmt.requestLogger());

// Routes definitions
var routes = {
	root: '/',
	searchUser: '/user/:name'
}

// API response headers
var apiHeaders = {
	'Content-Type': 'application/json',
	'Access-Control-Allow-Origin': '*',
	'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE',
	'Access-Control-Allow-Headers': 'Content-Type'
}

// Routing Root
app.get(routes.root, function(req, res) {
	var warningString = "Check if a username exists in social channels. <br />"
	warningString += "Usage: /user/:name"+ " <br/>"+" Example: /user/alecdotico";
	res.send(warningString);
});

// Routing App
app.get(routes.searchUser, function(req, res) {

	res.writeHead(200, apiHeaders);

	// Get options from request
	var options = {
		name: req.params.name
	};

	API.searchUser(options, function(json) {
		res.end(json);
	});
});

// Initialize
var port = Number(process.env.PORT || 5000);
app.listen(port, function() {
	console.log("Listening on " + port);
});
