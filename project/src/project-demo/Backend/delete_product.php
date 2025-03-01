<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: DELETE");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

include "db.php";
$data = json_decode(file_get_contents("php://input"), true);
if (!isset($data["id"])) {
    die(json_encode(["error" => "Thiếu ID sản phẩm"]));
}

$id = (int) $data["id"];
$sql = "DELETE FROM products WHERE id = '$id'";
if ($conn->query($sql) === TRUE) {
    echo json_encode(["message" => "Xóa sản phẩm thành công"]);
} else {
    echo json_encode(["error" => "Lỗi khi xóa sản phẩm: " . $conn->error]);
}

$conn->close();
?>
