<?php

/*
 * SET IT UP
 */
require 'Slim/Slim.php';
require 'lib/requests/library/Requests.php';
require 'lib/exeu/lib/AmazonECS.class.php';
require 'data.php';
require 'keys.php';

Requests::register_autoloader();
\Slim\Slim::registerAutoloader();
$app = new \Slim\Slim(
  array(
    'debug' => true
  )
);

$client = new AmazonECS( $amazon_key, $amazon_secret_key, 'com', $amazon_associate_id );


/*
 * DEFINE THOSE ROUTES
 */
// Root (GET)
$app->get( '/', function() use( $app ) {
  $app->render(
    '/index.php',
    array(),
    200
  );
});

$app->get( '/about/', function() use( $about_data ) {
  header( "Content-Type: application/json" );
  echo json_encode( $about_data ); 
});
$app->get( '/primary_menu/', function() use( $primary_menu_data ) {
  header( "Content-Type: application/json" );
  echo json_encode( $primary_menu_data );
});

$app->get( '/books/', function() use( $app ) {

  // Set up the request  
  //$fql = "SELECT page_id,name,pic_square FROM page WHERE name IN(SELECT books FROM user WHERE uid IN(SELECT uid2 FROM friend WHERE uid1=me()))";
  $access_token = $app->request()->params( 'accessToken' );
  //$request_string = "https://graph.facebook.com/fql?q=$fql&offset=$offset&access_token$access_token";
  $request_string = "https://graph.facebook.com/me?fields=friends.books&access_token=$access_token";

  // Make the request
  $response = Requests::get( $request_string, array( 'Accept' => 'application/json' ), array( 'timeout' => 60 ) );  

  // Turn it into an array
  $response_array = json_decode( $response->body, true );
  $data = array();

  // Manipulation time!
  if( $response_array ) {

    // If there's an error.
    if( isset( $response_array['error'] ) ) {
      $data = array( 'error' => $response_array['error']['message'] );

    // If it's all good.
    } else if( isset( $response_array['friends'] ) ) {
      $check_array = array();
      foreach( $response_array['friends']['data'] as $books ) {
        if( isset( $books['books']['data'] ) ) {
          foreach( $books['books']['data'] as $book ) {
            if( isset( $check_array[$book['id']] ) ) {
              $check_array[$book['id']]['count']++;
            } else {
              $check_array[$book['id']] = array(
                'count' => 0,
                'id' => $book['id'],
                'name' => $book['name'],
                'category' => $book['category']
              );
            }
          } 
        }
      }
      $titles = array();
      foreach( $check_array as $key => $value ) {
        if( !in_array( $value['name'], $titles ) ) {
          array_push( $data, $value );
          array_push( $titles, $value['name'] );
        }
      }
      function compare_data( $a, $b ) {
        if( $a['count'] > $b['count'] ) {
          return -1;
        } else if( $a['count'] < $b['count'] ) {
          return 1;
        } else {
          return 0;
        }
      }
      usort( $data, 'compare_data' );
      
      array_splice( $data, 100 );
      

    // Something went really wrong.
    } else {
      $error_message = "Something went wrong!";
    }
  }

  header( "Content-Type: application/json" );
  echo json_encode( $data );
});


/*
 * DO IT!
 */
$app->run();
