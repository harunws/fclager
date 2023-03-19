<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: POST");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

require 'db_connection.php';

$data = json_decode(file_get_contents("php://input"));

if(isset($data->customer_id) 
	&& isset($data->customer_name) 
	&& isset($data->customer_email) 
	&& is_numeric($data->customer_id) 
	&& !empty(trim($data->customer_name)) 
	&& !empty(trim($data->customer_email))
	){
    $customername = mysqli_real_escape_string($db_conn, trim($data->customer_name));
    $customeremail = mysqli_real_escape_string($db_conn, trim($data->customer_email));
    if (filter_var($customeremail, FILTER_VALIDATE_EMAIL)) {
        $updateCustomer = mysqli_query($db_conn,"UPDATE `customers_v01` SET `customer_name`='$customername', `customer_email`='$customeremail' WHERE `customer_id`='$data->customer_id'");
        if($updateCustomer){
            echo json_encode(["success"=>1,"msg"=>"Customer Updated."]);
        }
        else{
            echo json_encode(["success"=>0,"msg"=>"Customer Not Updated!"]);
        }
    }
    else{
        echo json_encode(["success"=>0,"msg"=>"Invalid Email Address!"]);
    }
}
else{
    echo json_encode(["success"=>0,"msg"=>"Please fill all the required fields!"]);
}