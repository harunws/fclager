<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: GET");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

require 'db_connection.php';

$allCustomers = mysqli_query($db_conn,"SELECT * FROM `customers_v02`");
if(mysqli_num_rows($allCustomers) > 0){
    $all_customers = mysqli_fetch_all($allCustomers,MYSQLI_ASSOC);
    echo json_encode(["success"=>1,"customers"=>$all_customers]);
}
else{
    echo json_encode(["success"=>0]);
}