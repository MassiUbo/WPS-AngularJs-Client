var http = require('http');

var fs = require('fs');

var server = http.createServer(function(req, res) {
  console.log('req was made :'+ req.url)
  res.writeHead(200, {'Content-type':'text/plain'});
  var myReadStream = fs.createReadStream(__dirname + '/ClientWPS.html','utf8');
  myReadStream.pipe(res); 
  
});
server.listen(8080);