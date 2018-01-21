var express = require('express');

var app = express();

app.use(express.static('public'));

var path= require('path');
var port = process.env.PORTH || 8080;
app.get('/',function (req,res){
   res.sendFile(path.join(__dirname + '/ClientWPS.html'));

});

app.listen(port, function() {
  console.log('Server is running on: '+port)
});