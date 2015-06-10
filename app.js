var Book = Backbone.Model.extend({
	defaults: {
	        isbn: '',
	        name: ''
	},  
	idAttribute: '_id',
	initialize: function(){
		console.log(this.get('name') + 'has been initialized');
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


var book = new Book({
	// name: "Testing a Model: A Novel",
	// genre: "Occult Instructional",
	// isbn: 684655,
	_id: "5577df9dcc29878b499a6c0e"
});

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
