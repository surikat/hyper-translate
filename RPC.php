<?php
include __DIR__.'/php/Gettext/autoloader.php';
//include __DIR__.'/php/RedCat/DataMap/autoload.inc.php';
//include __DIR__.'/php/RedCat/Templix/autoload.inc.php';
include __DIR__.'/php/Surikat/HyperTranslate/autoload.inc.php';

header('Content-Type: application/json; charset=UTF-8;');

header("Expires: Mon, 26 Jul 1997 05:00:00 GMT" );
header("Last-Modified: " . gmdate("D, d M Y H:i:s" ) . " GMT" );
header("Pragma: no-cache");
header("Cache-Control: no-cache");
header("Expires: -1");
header("Cache-Control: post-check=0, pre-check=0", false);
header("Cache-Control: no-store, no-cache, must-revalidate");

$cwd = defined('REDCAT_PUBLIC')?REDCAT_PUBLIC:'../';
chdir($cwd);
$service = new Surikat\HyperTranslate\MessageService();
$response = ['error'=>null];
$method = @$_GET['method'];
$params = (array)@$_POST['params'];
if(method_exists($service,$method)) {
	try {
		$response['result'] = call_user_func_array([$service, $method], $params);
	}
	catch (Exception $e) {
		$response['error'] = ['code' => -31000,'message' => $e->getMessage()];
	}
}
else
	$response['error'] = ['code' => -32601,'message' => 'Procedure not found.'];
echo json_encode($response);