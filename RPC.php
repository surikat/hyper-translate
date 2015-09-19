<?php
include __DIR__.'/php/Gettext/autoloader.php';
include __DIR__.'/php/Wild/DataMap/autoload.inc.php';
include __DIR__.'/php/Wild/HyperTranslate/autoload.inc.php';
header('Content-Type: application/json; charset=UTF-8;');
$cwd = defined('SURIKAT_CWD')?SURIKAT_CWD:'../';
chdir($cwd);
$service = new Wild\HyperTranslate\MessageService();
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