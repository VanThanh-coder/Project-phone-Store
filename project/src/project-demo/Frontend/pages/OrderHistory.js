import React, { useEffect, useState } from "react";
import "../styles/OrderHistory.scss";

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetch("http://localhost/backend/get_orders.php")
      .then((res) => res.json())
      .then((data) => setOrders(data))
      .catch((err) => console.error("Lỗi khi lấy đơn hàng:", err));
  }, []);

  return (
    <div className="order-container">
      <h1 className="order-title">Lịch sử đơn hàng</h1>
      {orders.length === 0 ? (
        <p className="order-empty">Chưa có đơn hàng nào.</p>
      ) : (
        orders.map((order) => (
          <div key={order.id} className="order-card">
            <p className="order-id">Mã đơn hàng: {order.id}</p>
            <p className="order-customer">
              Tên khách hàng: {order.customer_name}
            </p>
            <p className="order-phone">Số điện thoại: {order.phone}</p>
            <p className="order-address">Địa chỉ: {order.address}</p>
            <p className="order-total">
              Tổng tiền: {order.total_price.toLocaleString()} VND
            </p>
            <h3 className="order-items-title">Chi tiết sản phẩm:</h3>
            <ul className="order-items-list">
              {order.items.map((item) => (
                <li key={item.id} className="order-item">
                  Sản phẩm ID: {item.product_id}, Số lượng: {item.quantity},
                  Giá: {item.price.toLocaleString()} VND
                </li>
              ))}
            </ul>
          </div>
        ))
      )}
    </div>
  );
};

export default OrderHistory;
