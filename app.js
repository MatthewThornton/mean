var express = require('express');
var app = express();

var bodyParser = require('body-parser');
var parseUrlencoded = bodyParser.urlencoded({ extended: false });

app.route('/blocks')
    .get(function(request, response){
        if (request.query.limit >= 0) {
            response.json(blocks.slice(0, request.query.limit));
        }else {
            response.json(Object.keys(blocks));
        }
    })
    .post(parseUrlencoded, function(request, response){
        var newBlock = request.body;
        blocks[newBlock.name] = newBlock.description; // <input name='name'><input name='description'>

        response.status(201).json(newBlock.name);
    });
app.route('/blocks/:name')
    .get(function(request, response){
        var description = blocks[request.blockName];
        if (!description) {
            response.status(404).json('No description found for ' + request.params.name);
        }else{
            response.json(description);
        }
    })
    .delete(function(request, response){
        delete blocks[request.blockName];
        response.sendStatus(200); //sets response body to 'OK'
    });

var logger = require('./logger');
app.use(logger);
app.use(express.static('public'));

app.set('view engine', 'jade'); //TODO this doesn't work?

var blocks = {
    'Fixed': 'Fastened securely in position',
    'Movable': 'Capable of being moved',
    'Rotating': 'Moving in a circle around its center'
};

var locations = {
    'Fixed': 'First floor',
    'Movable': 'Second floor',
    'Rotating': 'Penthouse'
};

// Post checks
app.param('name', function(request, response, next){
    var name = request.params.name;
    var block = name[0].toUpperCase() + name.slice(1).toLowerCase();

    request.blockName = block;

    next();
});

app.get('/locations/:name', function(request, response){
    var location = locations[request.blockName];
    if (!location) {
        response.status(404).json('No location found for ' + request.params.name);
    }else {
        response.json(location);
    }
});

app.listen(3000, function() {
    console.log('listening on port 3000');
});
