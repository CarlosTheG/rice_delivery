

Template.history_feed.helpers({
  order: function() {
    return Orders.find( {creator : Meteor.userId() } );
    //return Orders.find();
  }
});

Template.user_order.helpers({
  createdAt: function() {
    return moment(this.createdAt).fromNow();
  },
  button_text: function() {
    if (this.status === "Active"){
      return "Cancel Order";
    } else if (this.status == "Pending Delivery") {
      return "Complete Order";
    } else {
      return "Delete Order";
    }
  }
});

Template.user_order.events({
  'click .delete' : function() {
    if (this.status == "Pending Delivery"){
      Orders.update({_id: this._id}, {$set: {status: "Completed"}});
    } else {
      Orders.remove(this._id);
    }
  }
});

