<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>Offprint</title>
    <link rel="stylesheet" type="text/css" media="all" href="./assets/css/fonts.css">
    <link rel="stylesheet" type="text/css" media="all" href="./assets/css/style.css">
    <script src="https://connect.facebook.net/en_US/all.js"></script>
    <script src="./assets/js/jquery.js" type="text/javascript"></script>
    <script src="./assets/js/init.js" type="text/javascript"></script>
    <script src="./assets/js/facebook_methods.js" type="text/javascript"></script>
    <script src="./assets/js/underscore.js" type="text/javascript"></script>
    <script src="./assets/js/backbone.js" type="text/javascript"></script>
    <script src="./assets/js/home.js" type="text/javascript"></script>
    <script src="./assets/js/book.js" type="text/javascript"></script>
    <script src="./assets/js/about.js" type="text/javascript"></script>
    <script src="./assets/js/primary_menu.js" type="text/javascript"></script>
    <script src="./assets/js/router.js" type="text/javascript"></script>
  </head>
  <body>
    <div id="fb-root"></div>
    
    <!-- BEGIN Backbone templates. -->
    <script id="not-logged-in-template" type="text/template">
      <h1 id="not-logged-in-warning"><a id="log-in">Log In To Facebook</a></h1>
    </script>
    <script id="logged-in-template" type="text/template">
      <ul id="books"></ul>
    </script>
    <script id="book-template" type="text/template">
      <div class="gloss">
        <h2 class="name"><%= name %></h2>
      </div>
    </script>
    <script id="error-template" type="text/template">
      <h1><%= error %></h1>
    </script>
    <script id="about-template" type="text/template">
      <h1><%= title %></h1>
      <p><%= blurb %></p>
    </script>
    <script id="primary-li-template" type="text/template">
      <a href="#<%= slug %>"><%= name %></a>
    </script>
    <!-- END Backbone templates. -->
    
    <div id="content-wrapper">
      <hgroup>
        <h1 id="name"></h1>
      </hgroup>
    </div>

    <nav id="primary-nav">
      <ul id="primary-menu">
        <li>Offprint</li>
      </ul>
    </nav>
  </body>
</html>