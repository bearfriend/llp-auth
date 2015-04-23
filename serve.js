var static = require('node-static');

process.env.SSO_PORT = process.env.SSO_PORT || 8000;

//
// Create a node-static server instance to serve the './dist' folder
//
var file = new static.Server('./dist');

require('http').createServer(function (request, response) {
	request.addListener('end', function () {
		//
		// Serve files!
		//
		file.serve(request, response);
	}).resume();
}).listen(process.env.SSO_PORT);

console.log('Server running on port '+process.env.SSO_PORT);