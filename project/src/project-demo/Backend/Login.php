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
if (isset($data['email'], $data['password'])) {
    $email = $conn->real_escape_string($data['email']);
    $password = $data['password'];

    // Truy vấn database để tìm user
    $sql = "SELECT * FROM users WHERE email = '$email'";
    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
        $user = $result->fetch_assoc();
        
        // Kiểm tra mật khẩu
        if (password_verify($password, $user['password'])) {
            echo json_encode(["message" => "Đăng nhập thành công", "user" => ["id" => $user['id'], "name" => $user['name'], "email" => $user['email']]]);
        } else {
            echo json_encode(["message" => "Sai mật khẩu"]);
        }
    } else {
        echo json_encode(["message" => "Email không tồn tại"]);
    }
} else {
    echo json_encode(["message" => "Dữ liệu không hợp lệ"]);
}

// Đóng kết nối database
$conn->close();
?>
