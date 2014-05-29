var SerialPort  = require('serialport2').SerialPort;
var portName = 'COM8';



var PORT = 8080;
var http = require("http");
var url = require("url");
var fs = require("fs");
var path = require("path");
var mime = require("./mime").types;
var config = require("./config");
var zlib = require("zlib");

var server = http.createServer(function(request, response) {
    response.setHeader("Server", "Node/V5");
    var pathname = url.parse(request.url).pathname;console.log(pathname);
    if (pathname.slice(-1) === "/") {
        pathname = pathname + config.Welcome.file;
    }
    var realPath = path.join("assets", path.normalize(pathname.replace(/\.\./g, "")));

    var pathHandle = function (realPath) {
        fs.stat(realPath, function (err, stats) {
            if (err) {
                response.writeHead(404, "Not Found", {'Content-Type': 'text/plain'});
                response.write("This request URL " + pathname + " was not found on this server.");
                response.end();
            } else {
                if (stats.isDirectory()) {
                    realPath = path.join(realPath, "/", config.Welcome.file);
                    pathHandle(realPath);
                } else {
                    var ext = path.extname(realPath);
                    ext = ext ? ext.slice(1) : 'unknown';
                    var contentType = mime[ext] || "text/plain";
                    response.setHeader("Content-Type", contentType);

                    var lastModified = stats.mtime.toUTCString();
                    var ifModifiedSince = "If-Modified-Since".toLowerCase();
                    response.setHeader("Last-Modified", lastModified);

                    if (ext.match(config.Expires.fileMatch)) {
                        var expires = new Date();
                        expires.setTime(expires.getTime() + config.Expires.maxAge * 1000);
                        response.setHeader("Expires", expires.toUTCString());
                        response.setHeader("Cache-Control", "max-age=" + config.Expires.maxAge);
                    }

                    if (request.headers[ifModifiedSince] && lastModified == request.headers[ifModifiedSince]) {
                        response.writeHead(304, "Not Modified");
                        response.end();
                    } else {
                        var raw = fs.createReadStream(realPath);
                        var acceptEncoding = request.headers['accept-encoding'] || "";
                        var matched = ext.match(config.Compress.match);

                        if (matched && acceptEncoding.match(/\bgzip\b/)) {
                            response.writeHead(200, "Ok", {'Content-Encoding': 'gzip'});
                            raw.pipe(zlib.createGzip()).pipe(response);
                        } else if (matched && acceptEncoding.match(/\bdeflate\b/)) {
                            response.writeHead(200, "Ok", {'Content-Encoding': 'deflate'});
                            raw.pipe(zlib.createDeflate()).pipe(response);
                        } else {
                            response.writeHead(200, "Ok");
                            raw.pipe(response);
                        }
                    }
                }
            }
        });
    };

    pathHandle(realPath);
});

server.listen(PORT);
console.log("Server runing at port: " + PORT + ".");



var io = require('socket.io').listen(server);




var sp = new SerialPort(); // instantiate the serial port.
sp.open(portName, { // portName is instatiated to be COM8, replace as necessary
   baudRate: 9600, // this is synced to what was set for the Arduino Code
   dataBits: 8, // this is the default for Arduino serial communication
   parity: 'none', // this is the default for Arduino serial communication
   stopBits: 1, // this is the default for Arduino serial communication
   flowControl: false // this is the default for Arduino serial communication
});

/*io.sockets.on('connection', function (socket) {
	// If socket.io receives message from the client browser then 
    // this call back will be executed.
    socket.on('message', function (msg) {
    	console.log(msg);
    });
    // If a web browser disconnects from Socket.IO then this callback is called.
    socket.on('disconnect', function () {
    	console.log('disconnected');
    });
});*/


io.sockets.on('connection', function(socket){
  console.log("Connection " + socket.id + " accepted.");
  socket.on('disconnect', function(){
    console.log("Connection " + socket.id + " terminated.");
  });
});


var cleanData = ''; // this stores the clean data
var readData = '';  // this stores the buffer
sp.on('data', function (data) { // call back when data is received
    readData += data.toString(); // append data to buffer
    // if the letters 'A' and 'B' are found on the buffer then isolate what's in the middle
    // as clean data. Then clear the buffer. 
	//sensor0
    if (readData.indexOf('B') >= 0 && readData.indexOf('A') >= 0) {
        cleanData = readData.substring(readData.indexOf('A') + 1, readData.indexOf('B'));
        readData = '';
        io.sockets.emit('message', cleanData);
	}
	//sensor1
	if (readData.indexOf('D') >= 0 && readData.indexOf('C') >= 0) {
        cleanData = readData.substring(readData.indexOf('C') + 1, readData.indexOf('D'));
        readData = '';
        io.sockets.emit('message', cleanData);
	}
	//sensor2
	if (readData.indexOf('F') >= 0 && readData.indexOf('E') >= 0) {
        cleanData = readData.substring(readData.indexOf('E') + 1, readData.indexOf('F'));
        readData = '';
        io.sockets.emit('message', cleanData);
	}
	//sensor3
		if (readData.indexOf('H') >= 0 && readData.indexOf('G') >= 0) {
        cleanData = readData.substring(readData.indexOf('G') + 1, readData.indexOf('H'));
        readData = '';
        io.sockets.emit('message', cleanData);
	}
});