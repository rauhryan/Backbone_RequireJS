define(["text!../templates/stats.js","../collections/todoList","./todoView"], function(statsTemplate, Todos,TodoView){
	var AppView = Backbone.View.extend({
		el : $("#todoapp"),
		statsTemplate: function(data, options){return $.tmpl(statsTemplate, data, options);},
	    events: {
		    "keypress #new-todo":"createOnEnter",
	    "keyup #new-todo" : "showTooltip",
	    "click .todo-clear a": "clearCompleted"
	    },
	    initialize: function(){
				_.bindAll(this, 'addOne', 'addAll', 'render');
				this.input = this.$("#new-todo");

				Todos.bind('add', this.addOne);
				Todos.bind('refresh', this.addAll);
				Todos.bind('all', this.render);

				Todos.fetch();
			},
	    render: function(){
			    var done = Todos.done().length;
			    this.$('#todo-stats').html(this.statsTemplate({
				    total: Todos.length,
				    done: Todos.done().length,
				    remaining: Todos.remaining().length
			    }))
		    },
	    addOne : function(todo){
			     var view = new TodoView({model:todo});
			     this.$("#todo-list").append(view.render().el);
		     },
	    addAll : function() {
			     Todos.each(this.addOne);
		     },
	    newAttributes : function(){
				    return {
					    content: this.input.val(),
					    order: Todos.nextOrder(),
					    done: false
				    };
			    },
	    createOnEnter: function(e) {
				   if (e.keyCode != 13) return;
				   Todos.create(this.newAttributes());
				   this.input.val('');
			   },
	    clearCompleted: function() {
				    _.each(Todos.done(), function(todo){ todo.clear(); });
				    return false;
			    },
	    showTooltip: function(e) {
				 var tooltip = this.$(".ui-tooltip-top");
				 var val = this.input.val();
				 tooltip.fadeOut();
				 if (this.tooltipTimeout) clearTimeout(this.tooltipTimeout);
				 if (val == '' || val == this.input.attr('placeholder')) return;
				 var show = function(){ tooltip.show().fadeIn(); };
				 this.tooltipTimeout = _.delay(show, 1000);
			 }

	});
	return AppView;

});

