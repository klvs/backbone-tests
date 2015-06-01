var Book = Backbone.Model.extend({
	defaults: {
	        ID: '',
	        Name: ''
	    },  
	amDed: function(){
		alert('i, ' + this.get('Name') + ' am ded');
	},
	initialize: function(){
		console.log(this.get('Name') + 'has been initialized');
		this.on('change', function(){
			if(this.hasChanged('ID')){
				console.log('ID has changed');
			}
			if(this.hasChanged('Name')){
				console.log('Name has changed to ' + this.get('Name'))
			}
		});
	},
	constructor: function(attributes, options){
		console.log('Book\'s constructor has been called');
		Backbone.model.apply(this, arguments);
	},
	urlRoot: 'http://localhost:'
});

function setAttr(model){
	model.set('Name', 'poophed');
	model.set('ID', 4);
}

var book = new Book();
book.set('ID', 3);
book.set('Name', 'Johnny');

// book.destroy({
// 	success: function(){
// 		console.log('fuck shit poop');
// 	}
// });

// book.amDed();