var express = require('express');
var app = express();

var logger = require('./logger');
app.use(logger);
app.use(express.static('public'));

app.set('view engine', 'jade'); //TODO this doesn't work?

var blocks = {
    'Fixed': 'Fastened securely in position',
    'Movable': 'Capable of being moved',
    'Rotating': 'Moving in a circle around its center'
};

app.get('/blocks/:name', function(request, response) {
    var description = blocks[request.params.name];
    if (!description) {
        response.status(404).json('No description found for ' + request.params.name);
    }else{
        response.json(description);
    }
    if (request.query.limit >= 0) {
        response.json(blocks.slice(0, request.query.limit));
    }else {
        response.json(blocks);
    }
});

app.listen(3000, function() {
    // curl http://localhost:3000/
    // curl -i http://localhost:3000/blocks
    console.log('listening on port 3000');
});
