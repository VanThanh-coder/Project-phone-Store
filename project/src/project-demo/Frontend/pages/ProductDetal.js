import React, { useContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { CartContext } from "../context/Cartcontext";
import products from "../data/ProductData";
import "../styles/ProductDetail.scss";

const ProductDetail = () => {
  const { id } = useParams();
  const { addToCart } = useContext(CartContext);
  const product = products.find((p) => p.id === parseInt(id));

  // State quản lý màu sắc & ảnh chính
  const [selectedColor, setSelectedColor] = useState(null);
  const [mainImage, setMainImage] = useState("");

  // Khi sản phẩm thay đổi, chọn màu đầu tiên & ảnh đầu tiên
  useEffect(() => {
    if (product) {
      setSelectedColor(product.colors?.[0] || null);
      setMainImage(product.colors?.[0]?.image || product.images?.[0] || "");
    }
  }, [product]);

  if (!product) {
    return <div className="p-4">Sản phẩm không tồn tại.</div>;
  }

  return (
    <div className="product-detail-container">
      {/* Khu vực hiển thị ảnh */}
      <div className="image-section">
        <img src={mainImage} alt={product.name} className="main-image" />

        {/* Danh sách ảnh nhỏ */}
        {product.images && product.images.length > 1 && (
          <div className="thumbnail-container">
            {product.images.map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`Thumbnail ${index}`}
                className={`thumbnail ${mainImage === img ? "active" : ""}`}
                onClick={() => setMainImage(img)}
              />
            ))}
          </div>
        )}
      </div>

      {/* Thông tin sản phẩm */}
      <div className="info-section">
        <h1 className="product-name">{product.name}</h1>
        <p className="product-price">{product.price.toLocaleString()} VND</p>

        {/* Chọn màu sắc */}
        {product.colors && product.colors.length > 0 && (
          <div className="color-options">
            <span>Chọn màu:</span>
            <div className="color-list">
              {product.colors.map((color, index) => (
                <button
                  key={index}
                  className={`color-button ${
                    selectedColor?.name === color.name ? "selected" : ""
                  }`}
                  style={{ backgroundColor: color.name }}
                  onClick={() => {
                    setSelectedColor(color);
                    setMainImage(color.image);
                  }}
                />
              ))}
            </div>
          </div>
        )}

        {/* Nút thêm vào giỏ hàng */}
        <button
          className="add-to-cart"
          onClick={() =>
            addToCart({
              ...product,
              selectedColor: selectedColor, // Lưu cả màu sắc và ảnh màu đã chọn
            })
          }
        >
          Thêm vào giỏ hàng
        </button>
      </div>
    </div>
  );
};

export default ProductDetail;
