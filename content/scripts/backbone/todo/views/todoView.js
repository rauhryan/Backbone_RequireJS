define(["text!../templates/todo.js"], function (templateText) {
	var TodoView = Backbone.View.extend({
		tagName:"li",
	    template: function(data, options){ return $.tmpl(templateText, data, options)},
	    events: {
		    "click .check" : "toggleDone",
	    "dblclick div.todo-content" : "edit",
	    "click span.todo-destroy" : "clear",
	    "keypress .todo-input" : "updateOnEnter"
	    },
	    initialize : function(){
				 _.bindAll(this, 'render', this.render);
				 this.model.bind('change', this.render);
				 this.model.view = this;
			 },

	    render : function(){
			     $(this.el).html(this.template(this.model.toJSON()));
			     this.setContent();
			     return this;
		     },
		// To avoid XSS (not that it would be harmful in this particular app),
		// we use `jQuery.text` to set the contents of the todo item.
		setContent: function() {
		  var content = this.model.get('content');
		  this.$('.todo-content').text(content);
		  this.input = this.$('.todo-input');
		  this.input.bind('blur', this.close);
		  this.input.val(content);
		},
	    // Toggle the `"done"` state of the model.
	    toggleDone: function() {
				this.model.toggle();
			},

	    // Switch this view into `"editing"` mode, displaying the input field.
	    edit: function() {
			  $(this.el).addClass("editing");
			  this.input.focus();
		  },

	    // Close the `"editing"` mode, saving changes to the todo.
	    close: function() {
			   this.model.save({content: this.input.val()});
			   $(this.el).removeClass("editing");
		   },

	    // If you hit `enter`, we're through editing the item.
	    updateOnEnter: function(e) {
				   if (e.keyCode == 13) this.close();
			   },

	    // Remove this view from the DOM.
	    remove: function() {
			    $(this.el).remove();
		    },

	    // Remove the item, destroy the model.
	    clear: function() {
			   this.model.clear();
		   }


	});
	return TodoView;
});
