<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

include "db.php";

$data = json_decode(file_get_contents("php://input"), true);

if (!isset($data["name"], $data["price"], $data["quantity"], $data["image"])) {
    echo json_encode(["error" => "Dữ liệu không hợp lệ"]);
    exit;
}

$name = $conn->real_escape_string($data["name"]);
$price = $conn->real_escape_string($data["price"]);
$quantity = $conn->real_escape_string($data["quantity"]);
$image = $conn->real_escape_string($data["image"]); // URL ảnh sản phẩm

$sql = "INSERT INTO products (name, price, quantity, image) VALUES ('$name', '$price', '$quantity', '$image')";

if ($conn->query($sql) === TRUE) {
    echo json_encode(["message" => "Thêm sản phẩm thành công"]);
} else {
    echo json_encode(["error" => "Lỗi: " . $conn->error]);
}

$conn->close();
?>
