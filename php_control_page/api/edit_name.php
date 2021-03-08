<?php
$field = $_POST["field"];
$name = $_POST["name"];
$IP = $_POST["IP"];
$port_edit = $_POST["port"];
$image_url = $_POST["imageUrl"];
$nodeid = $_POST["nodeid"];

$site = explode("/", $_SERVER['REQUEST_URI'])[1];
include $_SERVER["DOCUMENT_ROOT"] . "/" . $site . "/api/mysql.php";

$conn = new mysqli($server_name, $username, $password, $database, $port);
if ($conn->connect_error) {
    die('Connection failed: ' . $conn->connect_error);
}
mysqli_query($conn, "SET NAMES 'utf8'");

$stmt = $conn->prepare("UPDATE `mobile_$field` SET `name` = ?, `IP` = ?, `port` = ?, `image` = ? WHERE `nodeid` = ?");
$stmt->bind_param("ssdsd", $name, $IP, $port_edit, $image_url, $nodeid);
$result = $stmt->execute();
if ($result) {
    $message = array("success" => true);
} else {
    $message = array("success" => false);
}
echo json_encode($message);
$conn->close();
