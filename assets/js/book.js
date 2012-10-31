$(document).ready( function() {
  
  window.Book = Backbone.Model.extend({
  });

  window.Books = Backbone.Collection.extend({
    
    model: window.Book,
    
    url: 'books/'
    
  });
  
  window.BookView = Backbone.View.extend({
    
    tagName: 'li',
    
    className: 'book',

    width: 50,
    
    events: {
      'mouseover': 'mouseover_event',
      'mouseout': 'mouseout_event'
    },

    initialize: function() {
      _.bindAll( this, 'render', 'mouseover_event', 'mouseout_event' );
      $(this.el).attr( 'id', this.model.get( 'id' ) );
    },
    
    render: function() {
      that = this;
      if( this.model.get( 'error' ) ) {
        $('.content').append( $(this.el).html( _.template( $('#error-template').html(), this.model.toJSON() ) ) );
      } else {
        $('ul#books').append( $(this.el).html( _.template( $('#book-template').html(), this.model.toJSON() ) ) );
        $(this.el).append('<img class="cover" src="https://graph.facebook.com/picture?ids=' + this.model.get( 'id' ) + '&access_token=' + window.accessToken + '">');
        $(this.el).css({
          'top': that.width * that.model.get( 'y' ),
          'left': that.width * that.model.get( 'x' )
        });
      }
      return this;
    },
    
    mouseover_event: function() {
      $(this.el).find('.gloss').hide();
      $('h1#name').html();
      $('h1#name').show();
      $('h1#name').html( this.model.get( 'name' ) )
    },
    
    mouseout_event: function() {
      $(this.el).find('.gloss').fadeIn( 250 );
    }
    
  });
  
});