var express = require('express');
var app = express();

app.set('view engine', 'jade');

app.get('/', function(request, response) {
    console.log("someone made a request.");
    response.sendFile(__dirname + '/public/index');
});

app.listen(3000, function() {
    // curl http://localhost:3000/
    // curl -i http://localhost:3000/blocks
    console.log('listening on port 3000');
});
