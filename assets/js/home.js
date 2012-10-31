$('#document').ready( function() {

  window.HomeView = Backbone.View.extend({
  
    className: 'content',
        
    events: {
      'click a#log-in': 'log_in'
    },
  
    initialize: function() {
      _.bindAll( this, 'render', 'fetch_books', 'display_books');
    },
  
    fetch_books: function() {
      var that = this
      var books = new window.Books();
      books.fetch({
        data: {
          id: window.current_user_id,
          accessToken: window.accessToken
        },
        success: function() {
          var y = 0;
          var x = 0;
          books.each( function( book ) {
            var book_view = new window.BookView( { model: book } );
            book.set( 'x', x );
            book.set( 'y', y );
            book_view.render();
            if( x < 9 ) {
              x++;
            } else {
              x = 0;
              y++;
            }
          });
          that.display_books( books );
        }
      });
    },
    
    
    display_books: function( books ) {
      var loaded = 0;
      var indices = new Array();
      for( n = 0; n <= books.length - 1; n++ ) {
        indices.push( n );
      }
      $('ul#books li').each( function( index ) {
        $(this).find( 'img' ).load( function() {
          loaded++;
          if ( loaded == books.length - 1 ) {
            render_recursively = function( indices ) {
              if( indices.length > 0 ) {
                var rando = Math.floor( Math.random() * indices.length );
                var random_index = indices[rando];
                indices.splice( rando, 1 );
                $('ul#books li').eq( random_index ).fadeIn( 50, function() {
                  $(this).find( '.gloss' ).fadeIn( 1000 )
                  render_recursively( indices );
                });
              }
            }
            render_recursively( indices );
          }
        });
      });
    },
  
    render: function() {
      that = this;
      window.FB.getLoginStatus( function( response) {
        if( response.status === 'connected' ) {
          if( typeof response.authResponse == 'undefined' ) {
            FB.logout( function( response ) {
              Backbone.history.loadUrl( '' );
            });
          } else {
            window.accessToken = response.authResponse.accessToken;
            window.current_user_id = 'me';
            var template = _.template( $('#logged-in-template').html(), {} );
            $('#content-wrapper').html();
            $('#content-wrapper').append( $(that.el).html( template ) );
            that.fetch_books();
          }
        } else {
          var template = _.template( $('#not-logged-in-template').html(), {} );
          $('#content-wrapper').append( $(that.el).html( template ) );
        }
      });
    },
    
    log_in: function() {
      window.login( function() {
        Backbone.history.loadUrl( '' );
      });
    }
  
  });

});