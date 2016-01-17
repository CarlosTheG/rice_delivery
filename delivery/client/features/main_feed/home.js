
Template.home_feed.helpers({
	order: function() {
		return Orders.find();
	}
});

Template.individual_order.events({
    'click .delete' : function() {
      Orders.remove(this._id);
    }
  });