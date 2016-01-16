if (Meteor.isClient) {
	Template.body.helpers{{
		order: function() {
			return Orders.find();
		}
	}}
}