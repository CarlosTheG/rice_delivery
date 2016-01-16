
	Template.home_feed.helpers({
		order: function() {
			return Orders.find();
		}
	});