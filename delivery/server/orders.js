
if (Meteor.isClient) {



	// Router.go("https://api.venmo.com/v1/oauth/authorize?client_id=<client_id>&scope=<scopes>")
  
};


if (Meteor.isServer) {
	Meteor.startup(function () {
		// ServiceConfiguration.configurations.upsert(
		// 	{ service: "venmo" }, 
		// 	{
  //   		  $set: {
  //     			clientId: "3428",
  //     			scope: "make_payments+access_email+access_balance",
  //     			secret: "efFYfmDRbygAsmNHmffXMhaCAFt8GG5N",
  //               loginStyle: "redirect"
  //   		}
		// });
	});
}
