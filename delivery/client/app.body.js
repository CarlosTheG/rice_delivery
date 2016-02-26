var click = 0;

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

// Template.nav_icon.onRendered({
//     click = 0;
// });
Template.body.events({
    'click .nav-link' : function() {
        if (click === 0) {
            $('#nav').css({'left': '0px'});
            $('.template-wrap').css({'left': '200px'});
            click = 1;
            console.log('click');
        } else {
            $('#nav').css({'left': '-200px'});
            $('.template-wrap').css({'left': '0px'});
            click = 0;
            console.log('click');
        }
    }
});
Template.nav_icon.events({
    'click .nav-icon' : function() {
        if (click === 0) {
            $('#nav').css({'left': '0px'});
            $('.template-wrap').css({'left': '200px'});
            click = 1;
            console.log('click');
        } else {
            $('#nav').css({'left': '-200px'});
            $('.template-wrap').css({'left': '0px'});
            click = 0;
            console.log('click');
        }
    }
});

Template.order_form.events({
    'click .hoot-box' : function() {
        $('#hoot-bg').css({'opacity': '1'});
        $('#chaus-bg').css({'opacity': '0.4'});
        $('.order-chaus').css({'display': 'none'});
        $('.order-hoot').css({'display': 'block'});
    },
    'click .chaus-box' : function() {
        $('#chaus-bg').css({'opacity': '1'});
        $('#hoot-bg').css({'opacity': '0.4'});
        $('.order-hoot').css({'display': 'none'});
        $('.order-chaus').css({'display': 'block'});
    }
})
// $(document).ready(function()  {
//     click = 0;
//     $('.nav-icon').click(function() {
//         if (click === 0) {
//             $('#nav').css({'left': '0px'});
//             $('.template-wrap').css({'left': '200px'});
//             click = 1;
//             console.log('click');
//         } else {
//             $('#nav').css({'left': '-200px'});
//             $('.template-wrap').css({'left': '0px'});
//             click = 0;
//             console.log('click');
//         }
//     });
//     $('.nav-link').click(function() {
//         if (click === 0) {
//             $('#nav').css({'left': '0px'});
//             $('.template-wrap').css({'left': '200px'});
//             click = 1;
//             console.log('click');
//         } else {
//             $('#nav').css({'left': '-200px'});
//             $('.template-wrap').css({'left': '0px'});
//             click = 0;
//             console.log('click');
//         }
//     });
// });


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