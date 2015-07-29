var cheerio = require('cheerio');
var request = require('request');
var http = require('http');
var jade = require('jade');
var async = require('async');

// Gets a random date between two given dates
function randomDate(start, end) {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

function getDilbert(date, callback) {
	// Get Dilbert page
	request('http://www.dilbert.com/strip/'+date, function(err, response, body) {
		if (err)  return;
		// User cheerio to access the html of the returned page
		$ = cheerio.load(body);
		
		// Create variables for jade
		return callback($('.img-comic').get(0).attribs.src);
	});
}

function genHTML(date, imgSrc) {
	return jade.renderFile('index.jade', {imageSrc: imgSrc, link: date});
}

// Create Server
http.createServer(function(req, res) {

	// The first Dilbert was created on April 16, 1989, and there's been one every single day since, so there shouldn't be any errors
	var date = randomDate(new Date(1989, 03, 17), new Date());
	var year = date.getFullYear(), month = date.getMonth(), day = date.getDay();
	var formattedDate = year + '-' + month + '-' + day;

	var img = '';
	if (req.url.indexOf('.json') < 0) {
		async.parallel([
			function(callback) {
				img = getDilbert(formattedDate, callback);
			}
		],
		function(data) {
			res.writeHead(200, {'Content-Type': 'text/html'});
			res.write(genHTML(formattedDate, data));		
			res.end();
		});	
	} else {
		async.parallel([
			function(callback) {
				img = getDilbert(formattedDate, callback);
			}
		],
		function(data) {
			res.writeHead(200, {'Content-Type': 'application/json'});
			res.write(data);		
			res.end();
		});	
	}
}).listen(8000, function() {
	console.log('Listening on 8000');
});
