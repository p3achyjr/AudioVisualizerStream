var http = require('http');
var url = require('url');
var fs = require('fs');

function sendText(res, url) {
  //access homepage
  if(url === '/') {
    fs.readFile('index.html', function(err, data) {
      res.end(data);
    });
  } else {
    fs.readFile(url.substr(1), function(err, data) {
      res.end(data);
    });
  }
}

var server = http.createServer(function (req, res) {
  var url_parts = url.parse(req.url);

  console.log(url_parts);

  if(url_parts.pathname.startsWith('/sounds')) {
    var stream = fs.createReadStream(url_parts.pathname.substr(1));
    stream.on('open', function() {
      stream.pipe(res);
    });
  }

  else {
    sendText(res, url_parts.pathname);
  }

});

server.listen(process.env.port || 8080, function(err) {
  console.log('Server listening on port 8080');
})