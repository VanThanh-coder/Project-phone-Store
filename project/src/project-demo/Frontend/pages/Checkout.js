import React, { useContext, useState } from "react";
import { CartContext } from "../context/Cartcontext";
import { useNavigate } from "react-router-dom";
import "../styles/Checkout.scss";

const Checkout = () => {
  const { cart, getTotalPrice, clearCart } = useContext(CartContext);
  const navigate = useNavigate();
  const [customerInfo, setCustomerInfo] = useState({
    name: "",
    phone: "",
    address: "",
  });

  const handleChange = (e) => {
    setCustomerInfo({ ...customerInfo, [e.target.name]: e.target.value });
  };
  const handleOrder = async () => {
    if (!customerInfo.name || !customerInfo.phone || !customerInfo.address) {
      alert("Vui lòng nhập đầy đủ thông tin!");
      return;
    }

    if (!Array.isArray(cart) || cart.length === 0) {
      alert("Giỏ hàng của bạn đang trống!");
      return;
    }

    const formattedCart = cart.map((item) => ({
      id: Number(item.id),
      name: item.name,
      quantity: Number(item.quantity),
      price: Number(item.price),
    }));

    const orderData = {
      ...customerInfo,
      cart: formattedCart,
    };

    console.log("🛒 Dữ liệu gửi đi:", JSON.stringify(orderData, null, 2));

    try {
      const response = await fetch("http://localhost/backend/save_order.php", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      });

      if (!response.ok) {
        throw new Error(`Lỗi server: ${response.status}`);
      }

      const result = await response.json();
      console.log("📩 Kết quả từ server:", result);

      if (result.order_id) {
        alert("✅ Đặt hàng thành công! Mã đơn hàng: " + result.order_id);

        // 🛑 Xóa giỏ hàng ngay lập tức trước khi điều hướng
        clearCart();

        // ✅ Đợi một chút để React cập nhật state trước khi chuyển trang
        setTimeout(() => {
          navigate("/profilepage");
        }, 500); // Chờ 0.5 giây để cập nhật state
      } else {
        alert(
          "⚠ Lỗi khi đặt hàng: " + (result.error || "Không rõ nguyên nhân")
        );
      }
    } catch (error) {
      console.error("🚨 Lỗi kết nối hoặc phản hồi không hợp lệ:", error);
      alert("Lỗi khi kết nối máy chủ! Vui lòng thử lại.");
    }
  };

  return (
    <div className="checkout-container">
      <h1 className="checkout-title">Thanh toán</h1>

      <div className="form-group">
        <label>Họ và tên:</label>
        <input
          type="text"
          name="name"
          value={customerInfo.name}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label>Số điện thoại:</label>
        <input
          type="tel"
          name="phone"
          value={customerInfo.phone}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label>Địa chỉ giao hàng:</label>
        <input
          type="text"
          name="address"
          value={customerInfo.address}
          onChange={handleChange}
        />
      </div>

      <h2 className="total-price">
        Tổng tiền: {getTotalPrice().toLocaleString()} VND
      </h2>

      <button onClick={handleOrder} className="checkout-button">
        Xác nhận đặt hàng
      </button>
    </div>
  );
};

export default Checkout;
