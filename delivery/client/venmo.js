// if (Meteor.isServer) {
//     Meteor.methods({
//         checkAccountInfo: function (userAccessToken) {
//             this.unblock();
//             return Meteor.http.call("GET", "https://api.venmo.com/v1/payments?access_token=" + userAccessToken,
//             	{params: {access_token: userAccessToken}});
// 		}});
// }


Template.venmo.venmoInfo = function(){
	var userAccessToken = "d02568d40844cc0d814c55e954472de239690aaffb6ca72212567c6424143fd1"
	Meteor.call('checkAccountInfo',userAccessToken,function(error,results){
		console.log(results.content);
		Session.set('accountInfo', JSON.parse(results.content))
	})
	return Session.get(accountInfo);
}


/*
//invoke the server method
if (Meteor.isClient) {
    Meteor.call("checkAccountInfo", function(error, results) {
        console.log(results.content); //results.data should be a JSON object
    });
}
*/
