
Template.home_feed.helpers({
	order: function() {
		return Orders.find( {status: "Active"});
	}
});

Template.individual_order.helpers({
	createdAt: function() {
		return moment(this.createdAt).fromNow();
	}
});

Template.individual_order.events({
    'click .delete' : function() {
      Orders.remove(this._id);
    },

    'click .accept' : function() {
    	window.alert("accepted");
    }
  });