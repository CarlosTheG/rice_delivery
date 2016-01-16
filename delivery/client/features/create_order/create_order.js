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
}