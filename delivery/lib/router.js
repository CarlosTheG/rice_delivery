Router.configure({
	// general routing configuration

	// general template
	// layoutTemplate: 'main'
});


// login routes
Router.route('/venmo_login', {
	template: 'venmo_login'
});

Router.route('/google_login', {
	template: 'google_login'
});

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
