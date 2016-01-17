// user login
Template.home_register.events({
	// create user
	'submit form': function(event) {
		event.preventDefault();
		var nameVar = event.target.registerName.value;
		var emailVar = event.target.registerEmail.value;
		var passwordVar = event.target.registerPassword.value;
		console.log('registration form submitted');
		Accounts.createUser({
		    email: emailVar,
		    password: passwordVar,
		    profile: {
		    	name: nameVar,
		    }
		});
	}
});

Template.home_login.events({
	// login user
    'submit form': function(event){
    	console.log('login form submitted');
        event.preventDefault();
        var emailVar = event.target.loginEmail.value;
        var passwordVar = event.target.loginPassword.value;
        Meteor.loginWithPassword(emailVar, passwordVar);
    }
});

Template.dashboard.events({
	// logout user
    'click .logout': function(event){
        event.preventDefault();
        Meteor.logout();
    }
});

Meteor.users.deny({
  update() { return true; }
});

// $(document).ready(function()  {

	

// });