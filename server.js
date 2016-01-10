var http = require('http');
var url = require('url');
var fs = require('fs');

function sendText(res, url) {
  //access homepage
  if (url === '/') {
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

  if (url_parts.pathname.startsWith('/sounds')) {
    var stat = fs.statSync(url_parts.pathname.substr(1));
    var total = stat.size;

    if (req.headers.range) {
      var range = req.headers.range;
      var parts = range.replace(/bytes=/, "").split("-");
      var partialstart = parts[0];
      var partialend = parts[1];

      var start = parseInt(partialstart, 10);
      var end = partialend ? parseInt(partialend, 10) : total-1;
      var chunksize = (end-start)+1;

      var stream = fs.createReadStream(url_parts.pathname.substr(1));
      res.writeHead(206, {'Content-Range': 'bytes ' + start + '-' + end + '/' + total,
                          'Accept-Ranges': 'bytes', 
                          'Content-Length': chunksize
                         });
      stream.on('open', function() {
        stream.pipe(res);
      });
    } else {
      var stream = fs.createReadStream(url_parts.pathname.substr(1));
      stream.on('open', function() {
        stream.pipe(res);
      });
    }
  }

  else {
    sendText(res, url_parts.pathname);
  }

});

server.listen(process.env.PORT || 8080, function(err) {
  console.log('Server listening on port 8080');
})