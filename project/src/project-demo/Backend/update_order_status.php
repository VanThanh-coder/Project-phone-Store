<?php
// update_order_status.php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

// Kết nối CSDL
include 'db.php'; // hoặc file kết nối của bạn (ví dụ: db.php)

// Nhận dữ liệu JSON từ yêu cầu
$data = json_decode(file_get_contents("php://input"), true);

if (!isset($data['order_id']) || !isset($data['status'])) {
    echo json_encode(["success" => false, "message" => "Thiếu dữ liệu: order_id hoặc status"]);
    exit();
}

$order_id = intval($data['order_id']);
$status   = intval($data['status']);  // Ví dụ: status = 2 cho "Đã giao"

$sql = "UPDATE orders SET status = ? WHERE id = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("ii", $status, $order_id);

if ($stmt->execute()) {
    echo json_encode(["success" => true, "message" => "Đơn hàng đã được cập nhật trạng thái thành công"]);
} else {
    echo json_encode(["success" => false, "message" => "Cập nhật trạng thái đơn hàng thất bại"]);
}

$stmt->close();
$conn->close();
?>
