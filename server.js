var express = require('express');
var app = express();
var path = require('path');

app.use(express.static('dist/app'));
app.use(express.static('dist'));
app.use('/bower_components', express.static('bower_components'));

app.get('*', function(req, res, next) {
    res.sendFile(path.resolve(__dirname, './dist/index.html'));
});

app.listen(3000, function() {
    console.log('server listening on port 3000');
});