Orders = new Mongo.Collection('Orders');

if (Meteor.isClient) {
	Template.body.helpers({
		order: function() {
			return Orders.find();
		},
		'submit .order_form': function(event) {
			var new_item = event.target.menu-item.value;

			Orders.insert({
				item_name: new_item,
				createdAt: new Date()
			})
		}
	});
}