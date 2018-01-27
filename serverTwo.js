// built in node packages
var http = require("http");
var fs = require("fs");
// define port
const PORT = 8080;

// function to handle requests
function handleRequest(request, response) {
	// response when port is visited
	response.end("What you want punk?!");
};

// create servers and give them the functions to handle requests
var server = http.createServer(handleRequest);

module.exports = function() {
	// start the server and listen
	server.listen(PORT, function() {
		console.log("Server Found At: http://localhost:" + PORT);
	});
};
