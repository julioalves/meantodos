var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var todos = require('./routes/todos');

//View Engine
var app = express();

//app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);
app.set(express.static(path.join(__dirname,'client/src')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use('/', index);
app.use('/api/v1/', todos);

app.listen(4200, function () {
    console.log('server listnening to port 4200');
});

