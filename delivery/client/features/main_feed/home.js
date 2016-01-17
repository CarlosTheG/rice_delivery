// home_feed: access orders db
Template.home_feed.helpers({
	order: function() {
		return Orders.find();
	}
});


