var express = require('express');
var app     = express();
var mongoose = require("mongoose");
var bodyParser = require('body-parser');
var Schema = mongoose.Schema;

app.use( bodyParser.json() );       // to support JSON-encoded bodies


// db shit
mongoose.connect('mongodb://localhost/books')

var bookSchema = new Schema({
	name: String,
	genre: String,
	isbn: String
});

var Book = mongoose.model('Book', bookSchema);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function (callback){
	console.log('connected to database');
});


// creates books
app.post('/api/books/create', function(req, res, next){
	var book = new Book({
		name:req.body.name,
		genre:req.body.genre,
		isbn:req.body.isbn
	});

	book.save(function(err, books){
		if(err){
			console.log('error @ /api/books/create');
			// return next();
		} else {
			res.status(201).send(books);
		}
	});
});

// list all
app.get('/api/books', function(req, res){
	Book.find({}, function(err, docs){
		res.json(docs);
	});
});

// gets books w/ id
app.get('/api/books/:id/', function(req, res){
	var id = req.params.id;
	Book.findOne( {isbn:id}, function(err, doc){
		res.json(doc);
	});
});

// update
app.put('/api/books/:id/update', function(req, res){
	var id = req.params.id;
	Book.find({isbn:id}, function(err, book){
		if(err){
			console.log('error @ /api/books/:id/')
			res.status(400).send(err);
		}
		console.log(req.body);
		Book.update({isbn: id}, {$set : req.body})
		res.send(req.body);
	});
});

// delete
app.delete('/api/books/:id/delete', function(req, res){
	var id = req.params.id;
	Book.remove({isbn:id}, function(err, removed){
		if(err){
			console.log('error @ /api/books/:id/delete');
			res.status(400).send(err);
		}
		res.json(removed);
	});
});


// drops db CAREFUL!
app.get('/api/delete/books/', function(req, res){
	// res.send(('id'));
	// console.log(req.params);
	// res.send('temp');
	Book.remove({}, function(err, removed){
		if(err){
			console.log('error @ /api/books/cleardb');
			res.status(400).send('error');
		} else {
			res.json(removed);
		}
	});
});



app.listen('8081');
console.log('party on port 8081');
exports = module.exports = app;

