import React, { useEffect, useState } from "react";
import "../styles/ProductList.scss"; // Import SCSS

const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          "http://localhost/backend/get_products.php"
        );
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Lỗi khi lấy danh sách sản phẩm:", error);
      }
    };
    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa sản phẩm này?")) {
      try {
        const response = await fetch(
          "http://localhost/backend/delete_product.php",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id }),
          }
        );
        const data = await response.json();
        alert(data.message || data.error);

        // Cập nhật danh sách sản phẩm sau khi xóa
        setProducts((prevProducts) =>
          prevProducts.filter((product) => product.id !== id)
        );
      } catch (error) {
        console.error("Lỗi khi xóa sản phẩm:", error);
      }
    }
  };

  return (
    <div className="product-list">
      <h2 className="title">📋 Danh sách sản phẩm</h2>
      <ul className="product-items">
        {products.map((product) => (
          <li key={product.id} className="product-item">
            <img
              src={product.image}
              alt={product.name}
              className="product-img"
            />
            <div className="product-info">
              <span className="product-name">{product.name}</span>
              <span className="product-price">
                {product.price.toLocaleString()} VND
              </span>
              <span className="product-quantity">
                {product.quantity} sản phẩm
              </span>
            </div>
            <button
              className="delete-btn"
              onClick={() => handleDelete(product.id)}
            >
              🗑 Xóa
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductList;
