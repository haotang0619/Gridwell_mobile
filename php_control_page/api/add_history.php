<?php
$field = $_POST["field"];
$name = $_POST["name"];
$record = $_POST["record"];

include $_SERVER["DOCUMENT_ROOT"] . "/IoT/api/mysql.php";

$conn = new mysqli($server_name, $username, $password, 'Mobile', $port);
if ($conn->connect_error) {
    die('Connection failed: ' . $conn->connect_error);
}
mysqli_query($conn, "SET NAMES 'utf8'");

$search = "INSERT INTO `history_$field`(`name`, `record`) VALUES ('$name', '$record')";
$result = $conn->query($search);
if ($result) {
    $message = array("success" => true);
} else {
    $message = array("success" => false);
}
echo json_encode($message);
$conn->close();