<?php
$field = $_POST["field"];

$site = explode("/", $_SERVER['REQUEST_URI'])[1];
include $_SERVER["DOCUMENT_ROOT"] . "/" . $site . "/api/mysql.php";

$conn = new mysqli($server_name, $username, $password, $database, $port);
if ($conn->connect_error) {
    die('Connection failed: ' . $conn->connect_error);
}
mysqli_query($conn, "SET NAMES 'utf8'");

$search = "SELECT * FROM mobile_$field";
$result = $conn->query($search);
$message = array();
if (mysqli_num_rows($result)) {
    while ($row = $result->fetch_assoc()) {
        array_push($message, array(
            "id" => $row["id"], 
            "name" => $row["name"], 
            "type" => $row["type"], 
            "IP" => $row["IP"], 
            "port" => $row["port"],
            "a" => $row["a"],
            "b" => $row["b"],
            "youtube" => $row["youtube"],
            "nodeID" => $row["nodeID"],
        ));
    }
}
echo json_encode($message);
$conn->close();
