<?php
include 'db.php'; // Kết nối Database

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");


// Kiểm tra nếu có số điện thoại được gửi lên
if (!isset($_GET['phone'])) {
    echo json_encode(["success" => false, "message" => "Thiếu số điện thoại"]);
    exit();
}

$phone = $_GET['phone'];

// Lấy danh sách đơn hàng của khách hàng
$sql = "SELECT id, customer_name, phone, address, total_price, created_at, status FROM orders WHERE phone = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("s", $phone);
$stmt->execute();
$result = $stmt->get_result();

$orders = [];
while ($row = $result->fetch_assoc()) {
    $order_id = $row['id'];

    // Lấy danh sách sản phẩm trong đơn hàng
    $items_sql = "SELECT product_id, quantity, price FROM order_items WHERE order_id = ?";
    $items_stmt = $conn->prepare($items_sql);
    $items_stmt->bind_param("i", $order_id);
    $items_stmt->execute();
    $items_result = $items_stmt->get_result();

    $items = [];
    while ($item = $items_result->fetch_assoc()) {
        $items[] = $item;
    }

    // Gán danh sách sản phẩm vào đơn hàng
    $row['items'] = $items;
    $orders[] = $row;
}

echo json_encode($orders);

$stmt->close();
$conn->close();
?>
