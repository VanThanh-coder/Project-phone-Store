<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET");
header("Content-Type: application/json");

include "db.php";
if ($conn->connect_error) {
    die(json_encode(["error" => "Lỗi kết nối database: " . $conn->connect_error]));
}

$result = $conn->query("SELECT * FROM products");
$products = [];
while ($row = $result->fetch_assoc()) {
    $products[] = $row;
}

echo json_encode($products);
$conn->close();
?>
