<?php
$field = $_POST["field"];

$site = explode("/", $_SERVER['REQUEST_URI'])[1];
include $_SERVER["DOCUMENT_ROOT"] . "/" . $site . "/api/mysql.php";

$conn = new mysqli($server_name, $username, $password, $database, $port);
if ($conn->connect_error) {
    die('Connection failed: ' . $conn->connect_error);
}
mysqli_query($conn, "SET NAMES 'utf8'");

$search = "SELECT * FROM `daily_{$field}` ORDER BY `register_time` DESC LIMIT 1";
$result = $conn->query($search);
$message = array();
if (mysqli_num_rows($result)) {
    while ($row = $result->fetch_assoc()) {
        $message[1] = array(
            "resistence" => $row["resistence"], 
            "status" => $row["status"], 
        );
    }
}
echo json_encode($message);
$conn->close();
