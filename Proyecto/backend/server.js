var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var api = require('./modules/api');
var colors = require('colors');
var http = require('http');
var port = 3000;
var delay = 1000; 

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});



app.get('/',function (req, res) {
    res.redirect('http://localhost:8080' + req.url);
});

app.get('/api', function(req, res, next) {
  
});

app.post('/api', function(req, res, next) {
 
 console.log("hola")
});

app.use(express.static(__dirname + '/'));
app.use(bodyParser.urlencoded({'extended':true}));
app.use(bodyParser.json());

app.use(function(req, res, next) {
	res.type('json');
	setTimeout(next, delay);
});

app.use('/api', api);

app.use(function(err, req, res, next) {
	res.status(500).send({ error: '500: Internal Server Error' });
	console.log(('Error: ' + err).red);
});

app.use(function(req, res) {
	res.status(404).send({ error: '404: Not found' });
	console.log(('Not found: ' + req.method + ' - ' + req.url).yellow);
});

var server = app.listen(port, function() {
	console.log(("Backend listening on http://localhost:" + port + '/').green);
});

module.exports.closeServer = function() {
	server.close();
	console.log('Server closed'.grey);
};

