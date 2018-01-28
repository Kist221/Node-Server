// built in node packages
var http = require("http");
var fs = require("fs");
// define port
const PORT = 8080;

// function to handle requests
function handleRequest(req, res) {
  // Capture the url the request is made to
  var path = req.url;
  // Depending on the URL, display a different HTML file.
  switch (path) {
    case "/":
      return displayRoot(path, req, res);
    case "/thanks":
      return displayThanks(path, req, res);
    default:
      return display404(path, req, res);
  }
};

// When someone visits the "http://localhost:PORT/" path, this function is run.
function displayRoot(url, req, res) {
  // Here we use the fs package to read our index.html file
  fs.readFile(__dirname + "/form/index.html", function(err, data) {
    // We then respond to the client with the HTML page by specifically telling the browser that we are delivering an html file.
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(data);
  });
};

// When someone visits the "http://localhost:PORT/" path, this function is run.
function displayThanks(url, req, res) {
    // Saving the request data as a variable
  var newData = "";
  // When the server receives data...
  req.on("data", function(data) {
    // Add it to requestData.
    newData += data;
    console.log(newData);
  });
  // When the request has ended...
  req.on("end", function() {
	// Log (server-side) the request method, as well as the data received!
	console.log("You did a", req.method, "with the data:\n", newData);
	  // Here we use the fs package to read our index.html file
	  fs.readFile(__dirname + "/form/thanks.html", function(err, data) {
	    // We then respond to the client with the HTML page by specifically telling the browser that we are delivering an html file.
	    res.writeHead(200, { "Content-Type": "text/html" });
	    res.end(data);
	  });
  });
};

// When someone visits any path that is not specifically defined, this function is run.
function display404(url, req, res) {
  var myHTML =  "<html>" +
    "<body><h1>404 Not Found </h1>" +
    "<p>The page you were looking for: " + url + " can not be found</p>" +
    "</body></html>";
  // Configure the response to return a status code of 404 (meaning the page/resource asked for couldn't be found), and to be an HTML document
  res.writeHead(404, { "Content-Type": "text/html" });
  // End the response by sending the client the myHTML string (which gets rendered as an HTML document thanks to the code above)
  res.end(myHTML);
};

// create servers and give them the functions to handle requests
var server = http.createServer(handleRequest);
// export listener
module.exports = function() {
	// start the server and listen
	server.listen(PORT, function() {
		console.log("Server Found At: http://localhost:" + PORT);
	});
};
