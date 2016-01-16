// somehow import Orders from server and save as Orders

if (Meteor.isClient) {
	Template.body.helpers({
		orders: function() {
			return Orders.find();
		}
	})

	Template.order.events({
		'click .delete' : function(){
			Tasks.remove(this._id);
		}
	})

	Template.body.events({
	    "submit .order-form": function (event) {
	      // Prevent default browser form submit
	      event.preventDefault();
	 
	      // Get value from form element
	      var text = event.target.text.value;
	 
	      // Insert a task into the collection
	      Orders.insert({
	        text: text,
	        createdAt: new Date() // current time
	      });
	 
	      // Clear form
	      event.target.text.value = "";
	    }
  	});
}