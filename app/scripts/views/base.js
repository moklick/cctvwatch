var BaseView = Backbone.View.extend({
  constructor: function() {
    _.bindAll(this, 'closeDetails', 'render');
    this.$details = $('#details');
    Backbone.View.apply(this, arguments);
  },
  closeDetails: function(){

  	this.$details.css({ bottom : '-1000px'});
    this.vent.trigger('goto', '');
    this.vent.trigger('map:removeMarker');

    this.stopListening();
  },
  showLoginReq: function(){
    this.vent.trigger('goto', '');
    $('.loginreq-msg').fadeIn().delay(3000).fadeOut();
  },
  render: function(){
    this.$details.empty();
  	this.$el.html(this.template());
    this.$details.css({bottom : 0});

    return this;
  }
});

module.exports = BaseView;