var Book = Backbone.Model.extend({
	defaults: {
	        isbn: '',
	        name: ''
	},  
	idAttribute: '_id',
	initialize: function(){
		console.log(this.get('name') + ' has been initialized');
		this.on('change', function(){
			if(this.hasChanged('isbn')){
				console.log('isbn has changed');
			}
			if(this.hasChanged('name')){
				console.log('name has changed to ' + this.get('name'))
			}
		});
	},
	constructor: function(attributes, options){
		console.log('Book\'s constructor has been called');
		Backbone.Model.apply(this, arguments);
	},
	validate: function(attr){
		if(!attr.isbn){
			return "Invalid isbn provided";
		}
	},
	urlRoot: 'http://localhost:8081/api/books'
});


// var book = new Book({
// 	// name: "Testing a Model: A Novel",
// 	// genre: "Occult Instructional",
// 	// isbn: 684655,
// 	_id: "5577df9dcc29878b499a6c0e"
// });

/* 
	Create
*/
// book.save({}, {
//     success: function (model, respose, options) {
//         console.log("The model has been saved to the server");
//     },
//     error: function (model, xhr, options) {
//         console.log("Something went wrong while saving the model");
//     }
// });


/* 
	Read 
*/
// book.fetch({
//     success: function (bookResponse) {
//         console.log("Found the book: " + bookResponse.get("name"));
//         console.log(bookResponse.get('_id'));
//     }
// });

/* 
	Update 
*/
// book.fetch({
//     success: function (bookResponse) {
//         console.log("Found the book: " + bookResponse.get("name"));
//         // Let us update this retreived book now (doing it in the callback) [UPDATE]
//         bookResponse.set("isbn", 88888);
//         bookResponse.save({}, {
//             success: function (model, respose, options) {
//                 console.log("The model has been updated to the server");
//             },
//             error: function (model, xhr, options) {
//                 console.log("Something went wrong while updating the model");
//             }
//         });
//     }
// });

/* 
	Delete
*/
// book.destroy({
//     success: function (model, respose, options) {
//         console.log("The model has been deleted from the server");
//     },
//     error: function (model, xhr, options) {
//         console.log("Something went wrong while deleting the model");
//     }
// });


/*
	Started working on collections
 */

var BooksCollection = Backbone.Collection.extend({
	model: Book,
	url: 'http://localhost:8081/api/books'
});

// var book1 = new Book({
// 	name: "Testing a Model: A Novel",
// 	genre: "Occult Instructional",
// 	isbn: 685664,
// });
// var book2 = new Book({
// 	name: "Learning About Collections",
// 	genre: "Informative Fiction",
// 	isbn: 684038,
// });


// var collection1 = new BooksCollection([book1, book2]);
// var collection2 = new BooksCollection();
// collection2.fetch();
// book1.set('isbn', 666666);
// console.log(book1.get('cid'));
// var bookFromColl = collection1.at(0);
// console.log(bookFromColl.get('name'));

// for (var i = 0; i <= collection1.length -1; i++) {
// 	console.log(collection1.at(i).get('name'));
// };

// for (var i = 0; i <= collection2.length -1; i++) {
// 	console.log(collection2.at(i).get('name'));
// };



/*
	Started working on views
 */
var book1 = new Book({
	name: "Testing a Model: A Novel",
	// genre: "Occult Instructional",
	// isbn: 684655,
	// _id: "5577df9dcc29878b499a6c0e"
});
var bookView = Backbone.View.extend({
	model: Book,
	template: '',
	tagName: 'span',
	initialize: function(){
		this.template = _.template($('#bookItem').html());
	},
	render: function(){
		this.$el.html(this.template(this.model.attributes));
		return this;
	}
});

// var view1 = new bookView({model: book1});
// var view1 = new bookView({
// 	el: $('#testDiv'),
// 	model: book1
// });
// var view1 = new bookView();

var bookListView = Backbone.View.extend({
	model: BooksCollection,
	// tagName: 'li',
	render: function(){
		this.$el.html();
		for(var i = 0; i < this.model.length; i++){
			// create book view to render
			var m_bookView = new bookView({model: this.model.at(i)});

			// add book to list view
			this.$el.append(m_bookView.$el);
			m_bookView.render();
		}
		return this;
	}
});



var book1 = new Book({ _id: 1, name: "Book 1" });
var book2 = new Book({ _id: 2, name: "Book 2" });
var book3 = new Book({ _id: 3, name: "Book 3" });
var book4 = new Book({ _id: 4, name: "Book 4" });
var book5 = new Book({ _id: 5, name: "Book 5" });
var bookCollection = new BooksCollection([book1, book2, book3, book4, book5]);

var bookList = null;

$(document).ready(function () {
    bookList = new bookListView({ 
    	el: $("#testDiv"), 
    	model: bookCollection 
    });
    bookList.render();
    // view1.render();
});












