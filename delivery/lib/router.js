Router.configure({
	// general routing configuration

	// general template
	// layoutTemplate: 'main'
});

// venmo routes
Router.route('/venmo/:clientId/:scope', {where: 'server'}).get(function() {
	this.response.writeHead(302, {
    	'Location': "https://api.venmo.com/v1/oauth/authorize?client_id=" + this.params.clientId + "&scope=" + this.params.scope 
    	// TODO: ADD THIS FOR SERVER-SIDE:
    	//+ "&response_type=code"
  	});
  	console.log('redirecting...');
  	this.response.end();
});
	
// CLIENT-SIDE FLOW AUTH-TOKEN
Router.route('/_oauth/:accessToken', {
	data: function() {
		var token = this.params.query;
		console.log(token);
		console.log(token["access_token"]);
		// Meteor.users.update(Meteor.userId(), {$set: {"profile.venmo": true}});
		Meteor.users.update(Meteor.userId(), {$set: {"profile.accessToken": token["access_token"]}});
		this.redirect('/');
	}
})


// TODO: SERVER-SIDE FLOW AUTH-TOKEN 
	// Router.route('/_oauth/:authToken', {
	// 	data: function(){
	// 		var token = this.params.query;
	// 		var code = token.code;
	// 		var response = HTTP.call('POST', "https://api.venmo.com/v1/oauth/access_token", {
	// 			data: {
	// 				"client_id": "3428",
	// 				"client_secret": "efFYfmDRbygAsmNHmffXMhaCAFt8GG5N",
	// 				"code": code
	// 			},
	// 			options: {
	// 				headers: {
	// 			      	'Access-Control-Allow-Origin': '*',
	// 			       	'Access-Control-Allow-Methods': 'POST, PUT, DELETE, GET, OPTIONS',
	// 			       	'Access-Control-Request-Method': '*',
	// 			       	'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept, Authorization'
	// 			    }
	// 			}
	// 		}, function(error, response) {
	// 			if (error) {
	// 				console.log('FUCK');
	// 				console.log(error);
	// 			} else {
	// 				response.setHeader( 'access-control-allow-origin', '*' );
	// 				console.log(response);
	// 			}
	// 		});
	//     }
	// }, {where: 'server'});

// login routes

Router.route('/', {
	name: 'home',
	template: 'home'
});

Router.route('/order', {
	name: 'order',
	template: 'order_form'
});

Router.route('/accept', {
	template: 'accept'
});


// later routes
Router.route('/history', {
	name: 'history',
	template: 'user_history'
});

Router.route('/profile', {
	template: 'profile'
});

Router.route('/active', {
	template: 'active'
});
