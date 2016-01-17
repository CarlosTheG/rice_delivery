var curr_Order = [];
var order_sum = Session.set("sum", 1.50);
var size = Session.set("size", "small");
var coffee_sum = Session.set("coffee_sum", 0);

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
	{name: "frap", checked: false },
	{name: "crap", checked: false },
	{name: "keurig", checked: false }
];

var coffee_prices = {
	frap : {
		"small": 2.0,
		"medium": 3.0,
		"large": 4.0
	},
	crap : {
		"small": 0.25,  // ayyyyy dem profits
		"medium": 0.4,
		"large": 50
	},
	keurig : {
		"small": 0.5,
		"medium": 0.6,
		"large": 2
	}
};

var coffee_selected = [];


Template.order_form.helpers({

	curr_orders: function() {
		return curr_Order;
	},

	hoot_menu: function() {
		return hoot_menu;
	},

	coffee_house_menu: function(){
		return coffee_menu;
	},

	sum: function(){
		var hoot_sum = Session.get("sum");

		computeCoffeePrice(coffee_selected);
		var coffee_sum = Session.get("coffee_sum");

		return hoot_sum + coffee_sum;
	},
})

Template.order_form.events({
    'click .order-form': function(event) {
		// Prevent default browser form submit
      	event.preventDefault();

      	//insert new order into Orders
	  	Orders.insert({
			price: Session.get("sum"),
	        createdAt: new Date(), // current time
	        status: "Active",
	        items_ordered: getItemList(),
	        location: document.getElementById("location").value,
	        details: document.getElementById("details").value
		});

		Router.go("/");
    },

    'click .coffee-size-checkboxes': function(){
		Session.set("size", $('input[name="size"]:checked').val());
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

Template.coffee_flavors.events({
	'click .toggle_check':function() {
		this.checked = !this.checked;
		if (this.checked == true){
			coffee_selected.push(this.name);
		} else {
			var index = coffee_selected.indexOf(this.name);
			if (index > -1){
				coffee_selected.splice(index, 1);
			}
		}
		computeCoffeePrice(coffee_selected);
	}
})

function computeCoffeePrice(coffee_list){
	var size = Session.get("size");
	var coffee_sum = 0;

	for (var i = 0; i < coffee_list.length; i++) {
		var flavor = coffee_list[i];
		coffee_sum += coffee_prices[flavor][size];
	};

	Session.set("coffee_sum", coffee_sum);
}

function getItemList(){
	var item_list = curr_Order;
	for (var i=0; i< coffee_selected.length; i++){
		item_list.push(Session.get("size") +coffee_selected[i]);
	}
	return item_list;
}

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