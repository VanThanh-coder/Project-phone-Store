import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import productData from "../data/ProductData"; // Import dữ liệu tĩnh
import "../styles/SearchPage.scss";

const SearchPage = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const query = searchParams.get("query") || "";

  // Đưa dữ liệu tĩnh vào state ban đầu
  const [products, setProducts] = useState(productData);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          "http://localhost/backend/get_products.php"
        );
        const data = await response.json();

        // Gộp dữ liệu từ file tĩnh và từ backend
        setProducts((prevProducts) => [...prevProducts, ...data]);
      } catch (error) {
        console.error("Lỗi khi tải sản phẩm:", error);
      }
    };

    fetchProducts();
  }, []);

  // Lọc sản phẩm theo từ khóa tìm kiếm
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="search-page">
      <h2>Kết quả tìm kiếm cho: "{query}"</h2>
      <div className="product-list">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <Link
              to={`/product/${product.id}`}
              key={product.id}
              className="product-card"
            >
              <img
                src={product.image || product.images[0]}
                alt={product.name}
              />
              <h3>{product.name}</h3>
              <p>{parseInt(product.price).toLocaleString()} VND</p>
            </Link>
          ))
        ) : (
          <p>Không tìm thấy sản phẩm nào.</p>
        )}
      </div>
    </div>
  );
};

export default SearchPage;
