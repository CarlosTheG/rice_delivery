var curr_Order = [];
var order_sum = Session.set("sum", 1.50);
var hoot_menu = [
	{name: "HBCB", price:2.50, checked:false}, 
	{name: "Other stuff", price:5, checked:false}, 
	{name:"expensive stuff", price: 6, checked:false}
];

Template.order_form.helpers({

	curr_orders: function() {
		return curr_Order;
	},

	hoot_menu: function() {
		return hoot_menu;
	},

	sum: function(){
		return Session.get("sum");
	},
})

Template.order_form.events({
    'click .order-form': function(event) {

		// Prevent default browser form submit
      	event.preventDefault();
	 	
      	//window.alert("hello");

      	// Get value from form element
    	// var text = event.target.text.value;

	  	Orders.insert({
			price: Session.set("sum"),
	        createdAt: new Date() // current time
		});
    }
});

Template.menu_items.events({
	'click .toggle_check': function() {
		var returned_array = checkedHelper(this.name, hoot_menu);

		var price = returned_array[1];
		if (returned_array[0] == true) { 
			Session.set("sum", Session.get("sum") + price);
			curr_Order.push(this.name);
		} else { 
			Session.set("sum", Session.get("sum") - price);
			var index = curr_Order.indexOf(this.name);
			if (index > -1) {
				curr_Order.splice(index, 1);
			}
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

function checkedHelper(element_name, obj_array) {
	for (var i in obj_array) {
		if (obj_array[i].name == element_name) {
			obj_array[i].checked = !obj_array[i].checked;
			break;
		}
	}
	return [obj_array[i].checked, obj_array[i].price]
}