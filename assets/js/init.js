
// Get set up with Facebook!
window.fbAsyncInit = function() {

 // The FB.init method, which apparently initializes something.
 FB.init({
   appId: '211736478959741',                             // App ID
   channelUrl: 'https://offprint.local:8888/channel.html',  // Channel File
   status: true,                                         // check login status
   cookie: true,                                         // enable cookies to allow the server to access the session
   xfbml: true                                           // parse XFBML
 });
 
 // Determine the status of the current user
 window.FB.getLoginStatus( function( response ) {
   if ( response.status === 'connected' ) {
     //console.log( 'user is logged in!' );
   } else if ( response.status === 'not_authorized' ) {
     //console.log( 'user not authorized!' );
   } else {
     //console.log( 'user not logged in!' );
   }
 });
 
};

// Load the SDK Asynchronously
( function( d ) {
  var js, id = 'facebook-jssdk', ref = d.getElementsByTagName('script')[0];
  if (d.getElementById(id)) {return;}
  js = d.createElement( 'script' ); js.id = id; js.async = true;
  js.src = "//connect.facebook.net/en_US/all.js";
  ref.parentNode.insertBefore(js, ref);
}( document ) );
  
