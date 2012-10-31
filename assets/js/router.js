$(document).ready( function() {
  
  // Define the routes.
  window.AppRouter = Backbone.Router.extend({

    routes: {
      '': 'take_me_home_jeeves',
      'about': 'about',
      'logout': 'logout'
    },

    take_me_home_jeeves: function() {
      $('.content').remove();
      var home = new window.HomeView();
      home.render();
    },
    
    about: function() {
      $('.content').html();
      var about = new window.About();
      about.fetch({
        success: function() {
          about_view = new window.AboutView( { model: about } );
          about_view.render();
        }
      });
    },
    
    logout: function() {
      FB.logout( function( response ) {
        Backbone.history.navigate( '', true );
      });
    }

  });
  
  // Do it, England.
  var menu = new window.PrimaryLis();
  menu.fetch({
    success: function() {
      menu.each( function( li ) {
        li_view = new window.PrimaryLiView( { model: li } );
        li_view.render();
      });
    }
  })
  var router = new window.AppRouter();
  Backbone.history.start();


  
});