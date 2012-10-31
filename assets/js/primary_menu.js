$(document).ready( function() {
  
  window.PrimaryLi = Backbone.Model.extend({
  });
  
  window.PrimaryLis = Backbone.Collection.extend({
    
    url: 'primary_menu/',
    
    model: window.PrimaryLi
    
  });
  
  window.PrimaryLiView = Backbone.View.extend({
    
    tagName: 'li',
    
    initialize: function() {
      _.bindAll( this, 'render' );
    },
    
    render: function() {
      var template = _.template( $('#primary-li-template').html(), this.model.toJSON() );
      $('ul#primary-menu').append( $(this.el).html( template ) );
    }
    
  });
  
});