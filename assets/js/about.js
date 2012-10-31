$(document).ready( function() {
  
  window.About = Backbone.Model.extend({
    
    url: 'about/'
    
  });
  
  window.AboutView = Backbone.View.extend({
    
    id: 'about',
    
    initialize: function() {
      _.bindAll( this, 'render' );
    },
    
    render: function() {
      $('.content').append( $(this.el).template( _.template( $('#about-template').html(), this.model.toJSON() ) ) );
    }
    
  });
  
});