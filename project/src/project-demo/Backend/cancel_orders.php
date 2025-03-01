<?php
include "db.php";

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

$data = json_decode(file_get_contents("php://input"), true);

if (!isset($data['order_id'])) {
    echo json_encode(["success" => false, "message" => "Thiếu mã đơn hàng"]);
    exit();
}

$order_id = intval($data['order_id']);

// Kiểm tra trạng thái đơn hàng
$check_sql = "SELECT status FROM orders WHERE id = ?";
$stmt = $conn->prepare($check_sql);
$stmt->bind_param("i", $order_id);
$stmt->execute();
$result = $stmt->get_result();
$row = $result->fetch_assoc();

if (!$row) {
    echo json_encode(["success" => false, "message" => "Không tìm thấy đơn hàng"]);
    exit();
}

if ($row['status'] != 0) {
    echo json_encode(["success" => false, "message" => "Chỉ có thể hủy đơn hàng khi đang Chờ xác nhận"]);
    exit();
}

/// Chỉ cập nhật trạng thái đơn hàng thành 'Đã hủy' (3), không xóa đơn hàng
$sql = "UPDATE orders SET status = 3 WHERE id = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("i", $order_id);

if ($stmt->execute()) {
    echo json_encode(["success" => true, "message" => "Đơn hàng đã được hủy"]);
} else {
    echo json_encode(["success" => false, "message" => "Hủy đơn hàng thất bại"]);
}

$stmt->close();
$conn->close();
?>
