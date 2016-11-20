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
/*app.get('/modifyProduct', function (req, res) {
   res.send('Hello World');
})

app.get('/modifyProduct', function (req, res) {
   res.send('Hello World');
})

app.get('/process_get', function (req, res) {
   // Prepare output in JSON format
   response = {
      first_name:req.query.first_name,
      last_name:req.query.last_name
   };
   console.log(response);
   res.end(JSON.stringify(response));
})
*/






/*

app.get('/index.htm', function (req, res) {
   res.sendFile( __dirname + "/" + "index.htm" );
})

app.get('/process_get', function (req, res) {
   // Prepare output in JSON format
   response = {
      first_name:req.query.first_name,
      last_name:req.query.last_name
   };
   console.log(response);
   res.end(JSON.stringify(response));
})


*/



var User = {logn:'', pass:'', listId:''};
var isLocked = false;




app.get('/', function (req, res) {
   res.sendFile( __dirname + "/" + "login.html" );
})

/*app.post('/', urlencodedParser, function (req, res) {
   // Prepare output in JSON format
   response = {
      first_name:req.body.first_name,
      last_name:req.body.last_name
   };
   console.log(response);
   res.end(JSON.stringify(response));


   var string = encodeURIComponent('something that would break');
	res.redirect('/?valid=' + string);
})*/


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
		//User.login
	redis.hgetall('user:test', function (err, result) {
		var items = [];
		for (i in result) {
			items.push(result[i]);
		}
			//User.pass === items[0]
		if('test1' === 'test1') {
			User.list = items[1];
			console.log("==== lista ASYNC: " + items[0]+' '+items[1]);
		}

		res.render(__dirname + "/" +'list.html',{user: User.login });

	});
	// res.sendFile( __dirname + "/" + "list.htm" );
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