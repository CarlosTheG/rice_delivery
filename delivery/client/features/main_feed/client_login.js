// user login
Template.home_register.events({
	// create user
	'submit form': function(event) {
		event.preventDefault();
		console.log('registration form submitted');
		var nameVar = event.target.registerName.value;
		var emailVar = event.target.registerEmail.value;
		var passwordVar = event.target.registerPassword.value;
		// check rice email
		alert(nameVar);
		// if valid, create user:
		Accounts.createUser({
			email: emailVar,
			password: passwordVar,
		});
		alert(Meteor.user_Id());

		Meteor.loginWithPassword(emailVar, passwordVar);
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


// venmo authentication