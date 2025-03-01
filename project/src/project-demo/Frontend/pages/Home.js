import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import Products from "../data/ProductData"; // Dữ liệu tĩnh ban đầu (nếu có)
import "../styles/Home.scss";

const Home = () => {
  const [products, setProducts] = useState(Products); // Dữ liệu tĩnh hoặc cũ
  const [ratings, setRatings] = useState({}); // Lưu đánh giá trung bình: { product_id: { avg_star, total_reviews } }

  useEffect(() => {
    // 1. Lấy danh sách sản phẩm từ backend
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          "http://localhost/backend/get_products.php"
        );
        const data = await response.json();
        console.log("🔥 Dữ liệu sản phẩm:", data);
        // Gộp data mới và data cũ
        setProducts([...Products, ...data]);
      } catch (error) {
        console.error("Lỗi khi tải sản phẩm:", error);
      }
    };

    // 2. Lấy danh sách rating trung bình từ API get_product_ratings.php
    const fetchRatings = async () => {
      try {
        // Sửa endpoint từ add_review.php thành get_product_ratings.php
        const res = await fetch(
          "http://localhost/backend/get_product_ratings.php"
        );
        const data = await res.json();
        console.log("🔥 Dữ liệu đánh giá:", data);
        // data là mảng [{ product_id, avg_star, total_reviews }, ...]
        // Chuyển về object: ratingsMap[product_id] = { avg_star, total_reviews }
        const ratingsMap = {};
        data.forEach((r) => {
          ratingsMap[r.product_id] = {
            avg_star: parseFloat(r.avg_star).toFixed(1),
            total_reviews: r.total_reviews,
          };
        });
        setRatings(ratingsMap);
      } catch (error) {
        console.error("Lỗi khi tải ratings:", error);
      }
    };

    fetchProducts();
    fetchRatings();
  }, []);

  return (
    <div className="home-container">
      <h1 className="home-title">Danh sách sản phẩm</h1>
      <div className="product-grid">
        {products.length === 0 ? (
          <p>Không có sản phẩm nào.</p>
        ) : (
          products.flatMap((product) => {
            const quantityNum = Number(product.quantity) || 1;
            return Array.from({ length: quantityNum }, (_, index) => {
              const ratingInfo = ratings[product.id] || {
                avg_star: 0,
                total_reviews: 0,
              };
              return (
                <div key={`${product.id}-${index}`} className="product-card">
                  <img
                    src={product.images ? product.images[0] : product.image}
                    alt={product.name}
                    className="product-image"
                  />
                  <h2 className="product-name">{product.name}</h2>
                  <p className="product-price">
                    {parseInt(product.price).toLocaleString()} VND
                  </p>
                  {/* Hiển thị đánh giá trung bình */}
                  <p
                    className="product-rating"
                    style={{ color: "blue", fontWeight: "bold" }}
                  >
                    Đánh giá:{" "}
                    <span className="star" style={{ color: "#FFD700" }}>
                      {ratingInfo.avg_star} ★
                    </span>
                    {" (" + ratingInfo.total_reviews + " lượt đánh giá)"}
                  </p>
                  <Link
                    to={`/product/${product.id}`}
                    className="product-button"
                  >
                    Xem chi tiết
                  </Link>
                </div>
              );
            });
          })
        )}
      </div>
    </div>
  );
};

export default Home;
