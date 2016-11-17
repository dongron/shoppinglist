var express = require('express');
var app = express();
app.use(express.static('resources'));

var server = app.listen(8081, function () {
   var host = server.address().address;
   var port = server.address().port;
   
   console.log("Example app listening at http://%s:%s", host, port)
})
// jeszcze do przemyslenia zmiana uzytkownika
// 1. ekran - startowy : dodawanie z pola pod, usuwanie z listy,  
app.get('/', function (req, res) {	//request, response 
   res.send('Hello World');	//show all products 
})

app.post('/addProduct', function (req, res) {
   res.send('Hello World');
})

app.get('/removeProduct', function (req, res) {
   res.send('Hello World');
})

// 2. ekran edycji elementu
app.get('/modifyProduct', function (req, res) {
   res.send('Hello World');
})

app.get('/modifyProduct', function (req, res) {
   res.send('Hello World');
})




