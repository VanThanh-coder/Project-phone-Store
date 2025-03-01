import React, { useState } from "react";
import "../styles/ProductForm.scss";

const ProductForm = ({ onProductAdded }) => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [image, setImage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost/backend/add_product.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, price, quantity, image }),
      });

      const data = await response.json();
      if (data.error) {
        alert("❌ " + data.error);
      } else {
        alert("✅ " + data.message);
        setName("");
        setPrice("");
        setQuantity("");
        setImage("");
        onProductAdded(); // Gọi callback để cập nhật danh sách sản phẩm
      }
    } catch (error) {
      console.error("Lỗi gửi yêu cầu:", error);
      alert("❌ Không thể kết nối đến server.");
    }
  };

  return (
    <div className="product-form">
      <h2>Thêm sản phẩm</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Tên sản phẩm"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Giá"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Số lượng"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="URL hình ảnh"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          required
        />
        <button type="submit">Tạo sản phẩm</button>
      </form>
    </div>
  );
};

export default ProductForm;
