

Template.history_feed.helpers({
  order: function() {
    return Orders.find( {creator : Meteor.userId() } );
    //return Orders.find();
  }
});

Template.user_order.helpers({
    createdAt: function() {
        return moment(this.createdAt).fromNow();
    }
});

Template.user_order.events({
    'click .delete' : function() {
        Orders.remove(this._id);
    }
});

$(document).ready(function()  {
    var click = 0;
    $('.nav-icon').click(function() {
        if (click === 0) {
            $('#nav').css({'left': '0px'});
            $('.template-wrap').css({'left': '200px'});
            click = 1;
        } else {
            $('#nav').css({'left': '-200px'});
            $('.template-wrap').css({'left': '0px'});
            click = 0;
        }
    });
    $('.nav-link').click(function() {
        if (click === 0) {
            $('#nav').css({'left': '0px'});
            $('.template-wrap').css({'left': '200px'});
            click = 1;
        } else {
            $('#nav').css({'left': '-200px'});
            $('.template-wrap').css({'left': '0px'});
            click = 0;
        }
    });
});


Template.user_order.helpers({
  createdAt: function() {
    return moment(this.createdAt).fromNow();
  },
  button_text: function() {
    if (this.status === "Active"){
      return "Cancel Order";
    } else if (this.status === "Pending Delivery") {
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