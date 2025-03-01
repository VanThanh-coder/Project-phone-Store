import React, { useContext, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CartContext } from "../context/Cartcontext";
import { ShoppingCart } from "lucide-react"; // Import icon giỏ hàng

import "../styles/Navbar.scss";

const Navbar = () => {
  const { cart } = useContext(CartContext);
  const [searchTerm, setSearchTerm] = useState("");
  const [products, setProducts] = useState([]); // Lưu danh sách sản phẩm từ API
  const [filteredProducts, setFilteredProducts] = useState([]);
  const navigate = useNavigate();

  // Gọi API để lấy danh sách sản phẩm mới nhất
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          "http://localhost/backend/get_products.php"
        );
        const data = await response.json();
        setProducts(data); // Lưu sản phẩm vào state
      } catch (error) {
        console.error("Lỗi khi tải sản phẩm:", error);
      }
    };
    fetchProducts();
  }, []);

  // Xử lý tìm kiếm khi gõ ký tự
  useEffect(() => {
    if (searchTerm.length > 0) {
      const results = products.filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredProducts(results);
    } else {
      setFilteredProducts([]);
    }
  }, [searchTerm, products]); // Cập nhật khi `searchTerm` hoặc `products` thay đổi

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const handleSearch = () => {
    if (searchTerm.trim() !== "") {
      setFilteredProducts([]);
      navigate(`/search?query=${searchTerm}`);
    }
  };

  const handleSelectProduct = (id) => {
    setSearchTerm("");
    setFilteredProducts([]);
    navigate(`/product/${id}`);
  };

  return (
    <nav className="navbar">
      <div className="container">
        <Link to="/" className="brand">
          PhoneStore
        </Link>

        {/* Ô tìm kiếm */}
        <div className="search-container">
          <input
            type="text"
            className="search-input"
            placeholder="Tìm kiếm sản phẩm..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <button className="search-button" onClick={handleSearch}>
            🔍
          </button>

          {filteredProducts.length > 0 && (
            <ul className="search-results">
              {filteredProducts.map((product) => (
                <li
                  key={product.id}
                  onClick={() => handleSelectProduct(product.id)}
                >
                  <img src={product.image} alt={product.name} />
                  <span>{product.name}</span>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="nav-links">
          <Link to="/admin">Tạo sản phẩm</Link>
          <Link to="/">Trang chủ</Link>
          <Link to="/login">Đăng nhập</Link>
          <Link to="/register">Đăng ký</Link>
          <Link to="/cart" className="cart-link">
            <ShoppingCart size={24} />
            {cart.length > 0 && (
              <span className="cart-count">{cart.length}</span>
            )}
          </Link>
          <Link to="/profilepage">Trang cá nhân</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
