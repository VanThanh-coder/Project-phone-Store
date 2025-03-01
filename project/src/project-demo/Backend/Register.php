<?php
// Cho phép mọi domain có thể gửi request đến API này
header("Access-Control-Allow-Origin: *");
// Chỉ cho phép phương thức POST
header("Access-Control-Allow-Methods: POST");
// Cho phép các header cụ thể trong request
header("Access-Control-Allow-Headers: Content-Type");

// Kết nối database
include "db.php";

// Kiểm tra kết nối
if ($conn->connect_error) {
    die(json_encode(["message" => "Lỗi kết nối database"]));
}

// Nhận dữ liệu từ React và giải mã JSON
$data = json_decode(file_get_contents("php://input"), true);

// Kiểm tra dữ liệu đầu vào có đầy đủ không
if (isset($data['username'], $data['email'], $data['password'])) {
    // Escape dữ liệu để tránh SQL Injection
    $name = $conn->real_escape_string($data['username']);
    $email = $conn->real_escape_string($data['email']);

    // Mã hóa mật khẩu trước khi lưu vào database
    $password = password_hash($data['password'], PASSWORD_BCRYPT);

    // Câu lệnh SQL để thêm người dùng vào database
    $sql = "INSERT INTO users (name, email, password) VALUES ('$name', '$email', '$password')";
    
    // Kiểm tra câu lệnh SQL có chạy thành công không
    if ($conn->query($sql)) {
        echo json_encode(["message" => "Đăng ký thành công"]);
    } else {
        echo json_encode(["message" => "Lỗi khi đăng ký"]);
    }
} else {
    // Trả về lỗi nếu dữ liệu không hợp lệ
    echo json_encode(["message" => "Dữ liệu không hợp lệ"]);
}

// Đóng kết nối database
$conn->close();
?>
