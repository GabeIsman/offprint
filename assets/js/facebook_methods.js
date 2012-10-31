$(document).ready( function() {
  
  window.login = function( callback ) {
    FB.login(
      function(response) {
        if (response.authResponse) {
          window.accessToken = response.authResponse.accessToken;
          if( callback ) {
            callback();
          }
        } else {
          // cancelled
        }
      },
      {
        scope: 'user_likes'
      }
    );
  }

  window.testAPI = function() {
    console.log('Welcome!  Fetching your information.... ');
    FB.api('/me', function(response) {
      console.log('Good to see you, ' + response.name + '.');
    });
  }

});
