<?php

error_reporting(E_ALL);
ini_set('display_errors', 1);
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");
include "db.php";

// Kiểm tra kết nối database
if ($conn->connect_error) {
    die(json_encode(["error" => "Kết nối database thất bại: " . $conn->connect_error]));
}

// Đọc dữ liệu JSON từ React và ghi log để debug
$rawData = file_get_contents("php://input");
file_put_contents("debug_data.log", "📩 Raw Data: " . $rawData . "\n", FILE_APPEND);

$data = json_decode($rawData, true);

if (json_last_error() !== JSON_ERROR_NONE) {
    die(json_encode(["error" => "Lỗi JSON: " . json_last_error_msg()]));
}

file_put_contents("debug_data.log", "✅ Decoded Data: " . print_r($data, true) . "\n", FILE_APPEND);

// Kiểm tra dữ liệu JSON có hợp lệ không
if (!$data || !is_array($data)) {
    die(json_encode(["error" => "Dữ liệu không phải là JSON hợp lệ"]));
}

// Kiểm tra xem có đủ thông tin không
if (!isset($data["name"], $data["phone"], $data["address"], $data["cart"])) {
    die(json_encode(["error" => "Thiếu thông tin đơn hàng"]));
}

$name = trim($data["name"]);
$phone = trim($data["phone"]);
$address = trim($data["address"]);
$cart = $data["cart"];

// Kiểm tra giỏ hàng có dữ liệu hợp lệ không
if (empty($cart) || !is_array($cart)) {
    die(json_encode(["error" => "Giỏ hàng trống hoặc không đúng định dạng"]));
}

foreach ($cart as $item) {
    if (!isset($item["id"], $item["quantity"], $item["price"])) {
        die(json_encode(["error" => "Sản phẩm trong giỏ hàng bị thiếu thông tin"]));
    }
}

// Lưu đơn hàng vào database với Prepared Statements
$total_price = array_reduce($cart, function ($sum, $item) {
    return $sum + ($item["quantity"] * $item["price"]);
}, 0);

$orderQuery = $conn->prepare("INSERT INTO orders (customer_name, phone, address, total_price, status) VALUES (?, ?, ?, ?, ?)");
$status = 0; // Mặc định đơn hàng mới là 0 (Chờ xác nhận)
$orderQuery->bind_param("sssdi", $name, $phone, $address, $total_price, $status);
$orderQuery->execute();



if ($orderQuery->affected_rows > 0) {
    $order_id = $orderQuery->insert_id;
    $orderQuery->close();

    // Thêm sản phẩm vào bảng order_items
  $itemQuery = $conn->prepare("INSERT INTO order_items (order_id, product_id, quantity, price) VALUES (?, ?, ?, ?)");
foreach ($cart as $item) {
    $product_id = (int)$item["id"];
    $quantity = (int)$item["quantity"];
    $price = (float)$item["price"]; // Chuyển đổi thành float
    $itemQuery->bind_param("iiid", $order_id, $product_id, $quantity, $price);
    $itemQuery->execute();
}

    // Cập nhật tổng tiền đơn hàng
    $updateOrder = $conn->prepare("UPDATE orders SET total_price = ? WHERE id = ?");
    $updateOrder->bind_param("di", $total_price, $order_id);
    $updateOrder->execute();

    echo json_encode(["order_id" => $order_id]);
} else {
    echo json_encode(["error" => "Lỗi khi tạo đơn hàng: " . $conn->error]);
}

$conn->close();
?>
