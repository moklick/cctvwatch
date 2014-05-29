var BaseView = Backbone.View.extend({
  constructor: function() {
    Backbone.View.apply(this, arguments);
  },
  closeDetails: function(){
  	this.$el.css({bottom : '-1000px'});
    this.vent.trigger('goto', '');
  },
  renderDetails: function(){
  	this.$el.html(this.template());
    this.$el.css({bottom : 0});

    return this;
  }
});

module.exports = BaseView;