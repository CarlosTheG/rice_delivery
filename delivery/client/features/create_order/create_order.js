var order_sum = Session.set("sum", 1.50);
var size = Session.set("size", "large"); //needs to be fixed. start up has bugs
var coffee_sum = Session.set("coffee_sum", 0); 
Session.set("total_order", {})

//var business_list = ["Coffee House", "Hoot"]; //todo: misc

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

var curr_Order = {};
var coffee_selected = {};


Template.order_form.helpers({
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

	full_order: function(){
		var obj = Session.get("total_order");
		if (obj == undefined){
			obj = {};
		} 
		return Object.keys(obj);
	}
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
			curr_Order[this.name] = 1;
		} else { 
			Session.set("sum", Session.get("sum") - this.price);
			delete curr_Order[this.name];
		}

		Session.set("total_order", mergeDict(curr_Order, coffee_selected));

	}
});

Template.coffee_flavors.events({
	'click .toggle_check':function() {
		this.checked = !this.checked;
		if (this.checked == true){
			coffee_selected[this.name] = 1;
		} else {
			delete coffee_selected[this.name];
		}
		computeCoffeePrice(coffee_selected);
		Session.set("total_order", mergeDict(curr_Order, coffee_selected));
	}

})

Template.order_review.helpers({
	number: function() {
		if (this in coffee_selected) return coffee_selected[this];

		return curr_Order[this];
	}, 
	item: function() {
		return this;
	}
})

function computeCoffeePrice(coffee_array){
	var size = Session.get("size");
	var coffee_sum = 0;

	for (key in coffee_array) {
		coffee_sum += coffee_prices[key][size] * coffee_array[key];
	};

	Session.set("coffee_sum", coffee_sum);
}

function getItemList(){
	//returns a user friendly version of the item arrays
	var item_list = []
	for (key in curr_Order){
		item_list.push(" "+curr_Order[key] +" "+ key);
	}
	for (key in coffee_selected){
		item_list.push(" "+coffee_selected[key] + " " + 
					Session.get("size") + " " + 
					key);
	}
	return item_list;
}

function mergeDict(dict1, dict2){
	//merges two 1 dimensional associative arrays
	dict3 = {}
	for (key in dict1)
		dict3[key] = dict1[key];
	for (key in dict2)
		dict3[key] = dict2[key];
	return dict3;
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