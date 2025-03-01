<?php
$servername = "localhost";  // Tên máy chủ (thường là localhost)
$username = "root";         // Tên user MySQL (mặc định là root)
$password = "592002";             // Mật khẩu (nếu chưa đặt thì để trống)
$dbname = "phone_store";  // Tên database của bạn

// Kết nối MySQL
$conn = new mysqli($servername, $username, $password, $dbname);

// Kiểm tra kết nối
if ($conn->connect_error) {
    die("Kết nối thất bại: " . $conn->connect_error);
}
?>
