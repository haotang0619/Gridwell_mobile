<?php
$acc = $_POST["acc"];
$pwd = $_POST["pwd"];

include $_SERVER["DOCUMENT_ROOT"] . "/IoT/api/mysql.php";

$conn = new mysqli($server_name, $username, $password, 'Mobile', $port);
if ($conn->connect_error) {
    die('Connection failed: ' . $conn->connect_error);
}
mysqli_query($conn, "set character set utf8");

$search = "SELECT * FROM permission where account='$acc' AND password='$pwd'";
$result = $conn->query($search);
if (mysqli_num_rows($result)) {
    $message = array("token" => hash("sha256", $pwd) . "|" . $acc, "valid" => true);
} else {
    $message = array("valid" => false);
}
echo json_encode($message);
$conn->close();
