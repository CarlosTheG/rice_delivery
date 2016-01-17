var curr_Order = [];
var order_sum = Session.set("sum", 1.50);
var size = Session.set("size", "small");

var business_list = ["Coffee House", "Hoot"]; //todo: misc

var hoot_menu = [
	{name: "HBCB", price:2.50, checked:false}, 
	{name: "Other stuff", price:5, checked:false}, 
	{name: "expensive stuff", price: 6, checked:false}
];

var coffee_size = [
	{name: "small", checked: true}, 
	{name: "medium", checked: false},
	{name:"large", checked: false}
];
var coffee_menu = [
	{name: "frap", price: 5, checked: false }
];

var coffee_selected = {};


Template.order_form.helpers({

	curr_orders: function() {
		return curr_Order;
	},

	hoot_menu: function() {
		return hoot_menu;
	},

	coffee_menu: function(){
		return coffee_menu;
	},

	sum: function(){
		var hoot_sum = Session.get("sum");
		var selected_size = Session.get("size")

		var selected_size = $("input:radio[name='size']:checked").val();
		var coffee_sum = 0;
		if (selected_size === "small") {
			coffee_sum = 1;
		}

		return hoot_sum + coffee_sum;
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
			price: Session.get("sum"),
	        createdAt: new Date(), // current time
	        status: "active"
		});

		Router.go("/");
    }
});

Template.menu_items.events({
	'click .toggle_check': function() {
		this.checked = !this.checked;
		if (this.checked == true) { 
			Session.set("sum", Session.get("sum") + this.price);
			curr_Order.push(this.name);
		} else { 
			Session.set("sum", Session.get("sum") - this.price);
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