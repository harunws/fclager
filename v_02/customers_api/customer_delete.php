<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: POST");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

require 'db_connection.php';
$data = json_decode(file_get_contents("php://input"));
if(isset($data->customer_id) && is_numeric($data->customer_id)){
    $delID = $data->customer_id;
    $deleteCustomer = mysqli_query($db_conn,"DELETE FROM `customers_v02` WHERE `customer_id`='$delID'");
    if($deleteCustomer){
        echo json_encode(["success"=>1,"msg"=>"Customer Deleted"]);
    }
    else{
        echo json_encode(["success"=>0,"msg"=>"Customer Not Found!"]);
    }
}
else{
    echo json_encode(["success"=>0,"msg"=>"Customer Not Found!"]);
}