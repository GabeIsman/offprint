<?php
require 'lib/exeu/lib/AmazonECS.class.php';
$client = new AmazonECS('AKIAISABVNENFAXOZHPA', 'aqkuSP2Wshk5GAAg6grpi1w96X1H79s4RCP2sGh8', 'com', 'ichbineinobe-20');
$client->returnType(AmazonECS::RETURN_TYPE_ARRAY);
$params = array(
  'author' => 'dan chaon',
  'language' => 'en'
);
$response  = $client->category('Books')->responseGroup( 'Small,Images,ItemIds' )->optionalParameters( $params )->search( 'dan chaon' );
var_dump($response);
//array_splice( $response, 1 );
//foreach( $response['Items']["Item"] as $books ) {
//  echo $books['ItemAttributes']['Title'] . "\n";
//}