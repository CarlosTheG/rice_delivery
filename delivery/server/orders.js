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
	Meteor.loginWithVenmo(function (err) {
  		if (err) {
    		throw new Meteor.Error("login-failed", 
      		"Authentication with Venmo failed");
  		}
});
	Meteor.logout(function(err){
  		if (err) {
    		throw new Meteor.Error("logout-failed",
      		"Log out failed");
  		}
	});
};


if (Meteor.isServer) {
	Meteor.startup(function () {

		ServiceConfiguration.configurations.upsert({
		  service: "venmo"
		  }, {
		    $set {
		      clientId: "3428",
		      scope: "make_payments + access_email + access_balance",
		      secret: "efFYfmDRbygAsmNHmffXMhaCAFt8GG5N"
		    }
		});	
	})
}
