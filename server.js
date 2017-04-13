var express = require('express');
var app = express();
var bodyParser = require('body-parser');

var data = {};
console.log("script running");
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.get('/api/data', (req,res) => res.json(data));
app.post('/api/data', (req,res) => res.json(data = req.body));
app.get('*',(req,res) => res.sendFile(__dirname + '/public/index.html'));
app.listen(3000, function(){
        console.log("Server Started!111");
    });
