var express = require('express');
var app = express();
app.use(express.static('public'));
app.set('view engine', 'jade'); //TODO this doesn't work?

// Routes
var blocks = require('./routes/blocks');
app.use('/blocks', blocks);

// Logger
var logger = require('./logger');
app.use(logger);


var locations = {
    'Fixed': 'First floor',
    'Movable': 'Second floor',
    'Rotating': 'Penthouse'
};


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
