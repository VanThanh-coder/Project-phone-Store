<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

// Xử lý preflight OPTIONS nếu cần
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

// Kết nối CSDL
include 'db.php'; // Hoặc 'db_connect.php'

// Lấy dữ liệu từ $_POST
$phone = isset($_POST['phone']) ? $_POST['phone'] : null;
$product_id = isset($_POST['product_id']) ? intval($_POST['product_id']) : null;
$review = isset($_POST['review']) ? $_POST['review'] : null;
$star = isset($_POST['star']) ? intval($_POST['star']) : null;

if (!$phone || !$product_id || !$review || !$star) {
    echo json_encode(["success" => false, "message" => "Thiếu thông tin: phone, product_id, review, star"]);
    exit();
}

$sql = "INSERT INTO reviews (phone, product_id, review, star) VALUES (?, ?, ?, ?)";
$stmt = $conn->prepare($sql);
if (!$stmt) {
    echo json_encode(["success" => false, "message" => "Lỗi chuẩn bị câu lệnh: " . $conn->error]);
    exit();
}
$stmt->bind_param("sisi", $phone, $product_id, $review, $star);

if ($stmt->execute()) {
    echo json_encode(["success" => true, "message" => "Đánh giá thành công"]);
} else {
    echo json_encode(["success" => false, "message" => "Lỗi khi thêm đánh giá: " . $stmt->error]);
}

$stmt->close();
$conn->close();

?>
