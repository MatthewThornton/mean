var express = require('express');
var app = express();

app.set('view engine', 'jade');

app.use(express.static('public'));

app.get('/blocks', function(request, response) {
    var blocks = ['Fixed', 'Movable', 'Rotating'];
    response.json(blocks);
});

app.listen(3000, function() {
    // curl http://localhost:3000/
    // curl -i http://localhost:3000/blocks
    console.log('listening on port 3000');
});
