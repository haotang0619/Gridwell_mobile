<?php
$accessToken = $_POST["accessToken"];
$accessArray = explode("|", $accessToken, 2);
$acc = isset($accessArray[1]) ? $accessArray[1] : null;
$token = isset($accessArray[0]) ? $accessArray[0] : null;

if ($acc === null || $token === null) {
    $message = array("valid" => false);
    echo json_encode($message);
    return;
}

include $_SERVER["DOCUMENT_ROOT"] . "/Gridwell_mobile/api/mysql.php";

$conn = new mysqli($server_name, $username, $password, 'Mobile', $port);
if ($conn->connect_error) {
    die('Connection failed: ' . $conn->connect_error);
}
mysqli_query($conn, "set character set utf8");

$search = "SELECT * FROM permission where account='$acc'";
$result = $conn->query($search);
if (mysqli_num_rows($result)) {
    $res = $result->fetch_assoc();
    if ($token === hash("sha256", $res["password"])) {
        $message = array("valid" => true);
    } else {
        $message = array("valid" => false);
    }
} else {
    $message = array("valid" => false);
}
echo json_encode($message);
$conn->close();
