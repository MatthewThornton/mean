
var express = require('express');
var app = express();

app.get('/', function(request, response) {
    response.write('Hello world');
    response.end();
});

app.listen(3000, function() {
    // curl http://localhost:3000/
    console.log('listening on port 3000');
});

