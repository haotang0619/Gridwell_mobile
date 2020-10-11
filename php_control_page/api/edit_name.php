<?php
$field = $_POST["field"];
$id = $_POST["id"];
$name = $_POST["name"];

include $_SERVER["DOCUMENT_ROOT"] . "/IoT/api/mysql.php";

$conn = new mysqli($server_name, $username, $password, 'Mobile', $port);
if ($conn->connect_error) {
    die('Connection failed: ' . $conn->connect_error);
}
mysqli_query($conn, "set character set utf8");

$search = "UPDATE `mobile_$field` SET `name` = '$name' WHERE `id` = $id";
$result = $conn->query($search);
if ($result) {
    $message = array("success" => true);
} else {
    $message = array("success" => false);
}
echo json_encode($message);
$conn->close();
