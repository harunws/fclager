<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: POST");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

require 'db_connection.php';

// POST DATA
$data = json_decode(file_get_contents("php://input"));

if(isset($data->customer_first_name) 
  && isset($data->customer_last_name) 
	&& isset($data->customer_email)

  && isset($data->customer_created)

  

	&& !empty(trim($data->customer_first_name)) 
  && !empty(trim($data->customer_last_name)) 
	&& !empty(trim($data->customer_email)) 

	&& !empty(trim($data->customer_created))  
   

	){
    $customerfirstname = mysqli_real_escape_string($db_conn, trim($data->customer_first_name));
    $customerlastname = mysqli_real_escape_string($db_conn, trim($data->customer_last_name));
    $customeremail = mysqli_real_escape_string($db_conn, trim($data->customer_email));   

    $customercreated = mysqli_real_escape_string($db_conn, trim($data->customer_created));   

    if (filter_var($customeremail, FILTER_VALIDATE_EMAIL)) {
        $insertCustomer = mysqli_query($db_conn,"INSERT INTO `customers_v02`(`customer_first_name`, customer_last_name`, `customer_email`, `customer_created`) VALUES('$customerfirstname', '$customerlastname','$customeremail', '$customercreated')");

        if($insertCustomer){
            $last_customer_id = mysqli_insert_id($db_conn);
            echo json_encode(["success"=>1,"msg"=>"Customer Inserted.","customer_id"=>$last_customer_id]);
        }
        else{
            echo json_encode(["success"=>0,"msg"=>"Customer Not Inserted!"]);
        }
    }
    else{
        echo json_encode(["success"=>0,"msg"=>"Invalid Email Address!"]);
    }
}
else{
    echo json_encode(["success"=>0,"msg"=>"Please fill all the required fields!"]);
}