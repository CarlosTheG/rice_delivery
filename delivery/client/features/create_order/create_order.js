var order_sum = Session.set("sum", 1.50);
var size = Session.set("size", "large"); //needs to be fixed. start up has bugs
var coffee_sum = Session.set("coffee_sum", 0.0); 
Session.set("total_order", {});
Session.set("hoot_order", {});
Session.set("coffee_order", {});

//var business_list = ["Coffee House", "Hoot"]; //todo: misc

var hoot_menu = [
	{name: "HBCB", price: 2.50, checked: false}, 
	{name: "Other stuff", price: 5.0, checked: false}, 
	{name: "expensive stuff", price: 6.0, checked: false}
];

var coffee_size = [
	{name: "small", checked: false}, 
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


Template.order_form.helpers({
	hoot_menu: function() {
		return hoot_menu;
	},

	coffee_house_menu: function(){
		return coffee_menu;
	},

	sum: function(){
		var hoot_sum = Session.get("sum");

		computeCoffeePrice(Session.get("coffee_order"));
		var coffee_sum = Session.get("coffee_sum");

		return hoot_sum + coffee_sum;
	},

	full_order: function(){
		obj = mergeDict(Session.get("hoot_order"), Session.get("coffee_order"));
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

      	//window.alert(Meteor.userId());
      	var cost = Session.get("sum") + Session.get("coffee_sum");

      	//insert new order into Orders
	  	Orders.insert({
			price: cost,
	        createdAt: new Date(), // current time
	        status: "Active",
	        items_ordered: getItemList(),
	        location: document.getElementById("location").value,
	        details: document.getElementById("details").value,
	        creator: Meteor.userId()
		});

	  	sweetAlert("Your order has been placed!", "Have fun eating your food.", "success");
		Router.go("/");
    },

    'click .coffee-size-checkboxes': function(){
		Session.set("size", $('input[name="size"]:checked').val());
	},
	// reset current order 
	'click .reset-order': function(event){
		Session.set("sum", 1.50);
		Session.set("coffee_sum", 0.0);
		Session.set("total_order", {});
		Session.set("hoot_order", {});
		Session.set("coffee_order", {});
		for (var i=0; i<hoot_menu.length; i++){
			hoot_menu[i].checked = false;
			hoot_menu[i].count = 0;
			$('input[name="'+hoot_menu[i].name+'"]').attr('checked', false);
		}
		
		for (var i=0; i<coffee_menu.length; i++){
			coffee_menu[i].checked = false;
			coffee_menu[i].count = 0;
			$('input[name="'+coffee_menu[i].name+'"]').attr('checked', false);

		}
	},
});

Template.menu_items.events({
	'click .toggle_check': function() {
		this.checked = !this.checked;
		var temp = Session.get("hoot_order");
		if (this.checked == true) { 
			Session.set("sum", Session.get("sum") + this.price);
			this.count = 1; // starts count of number of this item
			temp[this.name] = 1;
		} else { 
			// when deselecting a food item, subtract the price * quantity
			Session.set("sum", Session.get("sum") - this.price * this.count);
			
			delete temp[this.name];
		}

		Session.set("hoot_order", temp);
	}
});

Template.coffee_flavors.events({
	'click .toggle_check':function() {
		this.checked = !this.checked;
		var temp = Session.get("coffee_order");
		if (this.checked == true){
			temp[this.name] = 1;
		} else {
			delete temp[this.name];
		}
		Session.set("coffee_order", temp);

		computeCoffeePrice(Session.get("coffee_order"));
	}

})

Template.order_review.helpers({
	number: function() {
		if (this in Session.get("coffee_order")) {
			var coffee_selected = Session.get("coffee_order");
			return coffee_selected[this];
		} 
		var curr_Order = Session.get("hoot_order");
		return curr_Order[this];
	}, 
	item: function() {
		return this;
	}
})

Template.order_review.events({
	'click .order-count-inc': function() {
		var flag = false;
		var object = {};
		for (i=0; i<hoot_menu.length; i++){
			if (hoot_menu[i].name == this){
				object = hoot_menu[i];
				flag = true;
				break;
			}
		}

		if (flag){
			object.count += 1;  // increment count for this item
			Session.set("sum", Session.get("sum") + object.price);

			var temp = Session.get("hoot_order");
			temp[this] += 1;
			Session.set("hoot_order", temp);
		} else {
			for (i=0; i<coffee_menu.length; i++){
				if (coffee_menu[i].name == this){
					object = coffee_menu[i];
					break;
				}
			}

			var temp = Session.get("coffee_order");
			temp[this] += 1;
			Session.set("coffee_order", temp);

			computeCoffeePrice(Session.get("coffee_order"));
		}
	},

	'click .order-count-dec': function() {
		var flag = false;
		var object = {};
		for (i=0; i<hoot_menu.length; i++){
			if (hoot_menu[i].name == this){
				object = hoot_menu[i];
				flag = true;
				break;
			}
		}

		if (flag){
			object.count -= 1; // decerement count for this item
			Session.set("sum", Session.get("sum") - object.price);

			var temp = Session.get("hoot_order");
			temp[this] -= 1;
			if (temp[this] == 0){
				delete temp[this];
				uncheck(this); //unchecks the checkbox
			}
			Session.set("hoot_order", temp);
		} else {
			for (i=0; i<coffee_menu.length; i++){
				if (coffee_menu[i].name == this){
					object = coffee_menu[i];
					break;
				}
			}

			var temp = Session.get("coffee_order");
			temp[this] -= 1;
			if (temp[this] == 0){
				delete temp[this];
				uncheck(this)  //unchecks the checkbox
			}
			Session.set("coffee_order", temp);

			computeCoffeePrice(Session.get("coffee_order"));
		}
	}
})

function computeCoffeePrice(coffee_array){
	var size = Session.get("size");
	var coffee_sum = 0.0;

	for (key in coffee_array) {
		coffee_sum += coffee_prices[key][size] * coffee_array[key];
	};

	Session.set("coffee_sum", coffee_sum);
}

function getItemList(){
	//returns a user friendly version of the item arrays
	var item_list = []
	var curr_Order = Session.get("hoot_order");
	var coffee_selected = Session.get("coffee_order");

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

function uncheck(item_name){
	//searches through both menus and unchecks the item
	for (i=0; i<coffee_menu.length; i++){
		if (coffee_menu[i].name == item_name){
			coffee_menu[i].checked = false;
			$('input[name="'+item_name+'"]').attr('checked', false);
			return
		}
	}
	for (i=0; i<hoot_menu.length; i++){
		if (hoot_menu[i].name == item_name){
			hoot_menu[i].checked = false;
			$('input[name="'+item_name+'"]').attr('checked', false);
			return
		}
	}
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

