<?php
$field = $_POST["field"];
$id = $_POST["id"];
$new_a = $_POST["new_a"];
$new_b = $_POST["new_b"];

include $_SERVER["DOCUMENT_ROOT"] . "/IoT/api/mysql.php";

$conn = new mysqli($server_name, $username, $password, 'Mobile', $port);
if ($conn->connect_error) {
    die('Connection failed: ' . $conn->connect_error);
}
mysqli_query($conn, "set character set utf8");

$search = "UPDATE `mobile_$field` SET `a` = '$new_a', `b` = '$new_b' WHERE `id` = $id";
$result = $conn->query($search);
if ($result) {
    $message = array("success" => true);
} else {
    $message = array("success" => false);
}
echo json_encode($message);
$conn->close();
