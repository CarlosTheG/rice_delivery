// home_feed: access orders db
Template.home_feed.helpers({
	order: function() {
		return Orders.find();
	}
});

Template.home_feed.helpers({
	order: function() {
		return Orders.find( {status: "Active"});
	}
});

Template.individual_order.helpers({
	createdAt: function() {
		return moment(this.createdAt).fromNow();
	},

});

Template.individual_order.events({
    'click .accept' : function() {
      id = this._id;
    	swal({   title: "Confirm delivery?",   text: "You will be responsible for this delivery.",   
        type: "warning",   showCancelButton: true,   confirmButtonColor: "#008fb3",   
        confirmButtonText: "Yes, I accept!",   cancelButtonText: "No, take me back!",   
        closeOnConfirm: false,   closeOnCancel: true }, 
        function(isConfirm){   
          if (isConfirm) {     
            swal("Sweet!", "Check your feed for delivery details.", "success");
            // Need to update deliverer
            Orders.update({_id: id}, {$set: {status: "Pending Delivery"}})
          }  
      });}


  });

