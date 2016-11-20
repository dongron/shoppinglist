var express = require('express');

var bodyParser = require('body-parser');
var app = express();

var engines = require('consolidate');
app.set('views', __dirname + '/views');
app.engine('html', engines.mustache);
app.set('view engine', 'html');

app.use(bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 
app.use(express.static('resources'));
app.use('/resources', express.static('resources'));

var Redis = require('ioredis');
var redis = new Redis();

var server = app.listen(8082, function () {
	var host = server.address().address;
	var port = server.address().port;
	// var urlencodedParser = bodyParser.urlencoded({ extended: false })
	console.log("Example app listening at http://%s:%s", host, port)
})
// jeszcze do przemyslenia zmiana uzytkownika
// 1. ekran - startowy : dodawanie z pola pod, usuwanie z listy,  
// 2. ekran edycji elementu

var User = {logn:'test', pass:'test1', list:'list1'};
var isLocked = false;




app.get('/', function (req, res) {
   res.sendFile( __dirname + "/" + "login.html" );
})


// assuming POST: name=foo&color=red            <-- URL encoding
//
// or       POST: {"name":"foo","color":"red"}  <-- JSON encoding

/*app.post('/', upload.array(), function(req, res, next) {
    var name = req.body.login,
        color = req.body.pass;
    res.send(name);	
})
*/

app.post('/', function(req, res) {
    User.login = req.body.login;  
    User.pass = req.body.pass; 
	console.log(User.login);

	if(User.login && User.pass) {
		res.redirect('/list');
	}
})


app.get('/list', function (req, res) {
	redis.hgetall('user:'+User.login, function (err, result) {
		var items = [];
		var listItems = [];
		for (i in result) {
			items.push(result[i]);
		}
			//User.pass === items[0] 'test1'
		if(User.pass === items[0]) {
			User.list = items[1];
			console.log("==== lista ASYNC: " + items[0]+' '+items[1]);
			redis.lrange(User.list, 0, -1, function (err, resultL) {
				for (i in resultL) {
					listItems.push(resultL[i]);
					console.log(listItems[i]);
				}

				res.render(__dirname + "/" +'list.html',{user: User.login, list: listItems});
			})
		}
	});
})

app.post('/del', function(req, res) {
	var item = req.body.item;
	console.log("kasowanie: "+ item);
	redis.lrem(User.list, -1, item);
	res.redirect('/list');
})

app.post('/add', function(req, res) {
	var newItem = req.body.newItem; 

	if(!newItem) return;
	redis.rpush(User.list, newItem);
	console.log("dodano: "+ newItem);
	res.redirect('/list');
})


var listHTML = "<br> Your list: <div>	Siema </div>";

/*function getResForUser() {
	isLocked = true;
	var items = [];
	//User.login
	redis.hgetall('user:test', function (err, result) {
		for (i in result) {
			items[i] = result[i];
			console.log("====" + items[i]);
		}
			//User.pass === items[0]
		if('test1' === 'test1') {
			User.list = items[1];
			console.log("==== lista ASYNC: " + User.list);
		}
		isLocked = false;
	});

	console.log("==== lista SYNC: " + User.list);
}*/


    // res.redirect(__dirname + '/list.htm');