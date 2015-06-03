var Book = Backbone.Model.extend({
	defaults: {
	        isbn: '',
	        name: ''
	},  
	// amDed: function(){
	// 	alert('i, ' + this.get('name') + ' am ded');
	// },
	// idAttribute: 'isbn',
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
	name: "Backbone 101",
	genre: "non-fiction",
	isbn: 154543
});

/* 
	Create
	works with idAttribute line disabled
*/
book.save({}, {
    success: function (model, respose, options) {
        console.log("The model has been saved to the server");
    },
    error: function (model, xhr, options) {
        console.log("Something went wrong while saving the model");
    }
});


/* 
	Read 
	works with idAttribute line enabled
*/
// book.fetch({
//     success: function (bookResponse) {
//         console.log("Found the book: " + bookResponse.get("name"));
//     }
// });

/* 
	Update 
	updates name only 
	works with idAttribute line disabled
*/
// book.fetch({
//     success: function (bookResponse) {
//         console.log("Found the book: " + bookResponse.get("name"));
//         // Let us update this retreived book now (doing it in the callback) [UPDATE]
//         bookResponse.set("name", bookResponse.get("name") + "_updated");
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
	updates name only 
	works with idAttribute line disabled
*/
// book.destroy({
//     success: function (model, respose, options) {
//         console.log("The model has deleted the server");
//     },
//     error: function (model, xhr, options) {
//         console.log("Something went wrong while deleting the model");
//     }
// });
