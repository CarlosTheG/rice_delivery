// somehow import Orders from server and save as Orders to post when done

// hoot_menu = new Mongo.Collection('hoot_menu'); //hopefully imported in

var curr_Order = [];
var order_sum = Session.set("sum", 1.50);
var hoot_menu = [
	{name: "HBCB", price:2.50, checked:false}, 
	{name: "Other stuff", price:5, checked:false}, 
	{name:"expensive stuff", price: 6, checked:false}
];

// var delivery_options = [
// 	{name: "Normal Delivery", price: 1.50, checked: true},
// 	(name: "Faster Delivery", price: 3, checked: false)
// ];

if (Meteor.isClient) {
	Template.order_form.helpers({
		curr_orders: function() {
			return curr_Order;
		},

		hoot_menu: function() {
			return hoot_menu;
		},

		sum: function(){
			return Session.get("sum");
		}
	});


	Template.menu_items.events({
		'click .toggle_check': function() {
			var returned_array = checkedHelper(this.name, hoot_menu);

			var price = returned_array[1];
			if (returned_array[0] == true) { 
				Session.set("sum", Session.get("sum") + price);
			} else { 
				Session.set("sum", Session.get("sum") - price); 
			}
		}
	});

	// TODO: Create slider
	// Template.delivery.events({
	// 	'click .toggle_check': function() {
	// 		var returned_array = checkedHelper(this.name, delivery_options);

	// 		var price = returned_array[1]
	// 		if (returned_array[0] == true) {
	// 			Session.set("dsum", price);
	// 		} else {
				
	// 		}
	// 	}
	// })
};




function checkedHelper(element_name, obj_array){
	for (var i in obj_array) {
		if (obj_array[i].name == element_name) {
			obj_array[i].checked = !obj_array[i].checked;
			break;
		}
	}
	return [obj_array[i].checked, obj_array[i].price]
}