

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

