
if (Meteor.isClient) {
	//venmo
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
		ServiceConfiguration.configurations.upsert(
			{ service: "venmo" }, 
			{
    		  $set: {
      			clientId: "3428",
      			scope: "make_payments+access_email+access_balance",
      			secret: "efFYfmDRbygAsmNHmffXMhaCAFt8GG5N"
    		}
		});
	})
}
