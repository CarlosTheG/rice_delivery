Router.configure({
	// general routing configuration

	// general template
	// layoutTemplate: 'main'
});

// venmo routes
Router.route('/venmo/:clientId/:scope', {where: 'server'}).get(function() {
	this.response.writeHead(302, {
    	'Location': "https://api.venmo.com/v1/oauth/authorize?client_id=" + this.params.clientId + "&scope=" + this.params.scope
  	});
  	console.log('redirecting...');
  	this.response.end();
});

Router.route('/_oauth/:accessToken', {
	data: function(){
		var token = this.params.query
		console.log(token);
    }
});




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
	template: 'history'
});

Router.route('/profile', {
	template: 'profile'
});

Router.route('/active', {
	template: 'active'
});
