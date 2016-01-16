
  Template.history_feed.helpers({
    order: function() {
      return Orders.find();
    }
  });