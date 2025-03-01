<?php
 header("Access-Control-Allow-Origin: *");
 header("Content-Type: application/json");
 include 'db.php'; // Hoặc db_connect.php

 $sql = "SELECT product_id, AVG(star) AS avg_star, COUNT(*) AS total_reviews FROM reviews GROUP BY product_id";
 $result = $conn->query($sql);

  $ratings = [];
 while ($row = $result->fetch_assoc()) {
     $ratings[] = $row;
 }

 echo json_encode($ratings);
 $conn->close(); 
?>