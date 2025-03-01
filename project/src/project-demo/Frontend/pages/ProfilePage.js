import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/ProfilePage.scss";
import Avatar from "../assets/images/Avatar.jpg";
import OrderStatusEditor from "../components/OrderStatusEditor";
import { useParams } from "react-router-dom";

import Products from "../data/ProductData"; // Dữ liệu tĩnh, nếu có

const ProfilePage = () => {
  const [user] = useState({
    avatar: Avatar,
    name: "Lò Văn Thành",
    phone: "0353198531",
    address: "Mường Giàng - Quỳnh Nhai - Sơn La",
    role: "admin", // hoặc "user"
  });

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState("all");
  const [reviews, setReviews] = useState({});
  const [stars, setStars] = useState({}); // Lưu sao tạm cho mỗi product_id

  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch(
          `http://localhost/backend/get_orders.php?phone=${user.phone}`
        );
        if (!response.ok) {
          console.error("API lỗi:", response.status);
          return;
        }
        const data = await response.json();
        if (Array.isArray(data)) {
          setOrders(data);
        } else {
          setOrders([]);
        }
      } catch (error) {
        console.error("Lỗi fetch:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, [user.phone]);

  // Hủy đơn hàng
  const handleCancelOrder = async (orderId) => {
    if (!window.confirm("Bạn có chắc muốn hủy đơn hàng này không?")) return;
    try {
      const response = await fetch(
        "http://localhost/backend/cancel_orders.php",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ order_id: orderId }),
        }
      );
      const data = await response.json();
      if (data.success) {
        alert(data.message || "Đơn hàng đã được hủy thành công!");
        setOrders((prevOrders) =>
          prevOrders.map((order) =>
            order.id === orderId ? { ...order, status: 3 } : order
          )
        );
      } else {
        alert(data.message || "Hủy đơn hàng thất bại!");
      }
    } catch (error) {
      console.error("Lỗi khi hủy đơn hàng:", error);
      alert("Lỗi hệ thống! Không thể hủy đơn hàng.");
    }
  };

  // Xác nhận đã nhận hàng
  const handleConfirmDelivery = async (orderId) => {
    if (!window.confirm("Bạn có chắc chắn đơn hàng này đã giao thành công?"))
      return;
    try {
      const response = await fetch(
        "http://localhost/backend/update_order_status.php",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ order_id: orderId, status: 2 }),
        }
      );
      const data = await response.json();
      if (data.success) {
        alert(data.message || "Đơn hàng đã được xác nhận giao thành công!");
        setOrders((prevOrders) =>
          prevOrders.map((order) =>
            order.id === orderId ? { ...order, status: 2 } : order
          )
        );
      } else {
        alert(data.message || "Lỗi khi cập nhật trạng thái đơn hàng!");
      }
    } catch (error) {
      console.error("Lỗi khi xác nhận đơn hàng:", error);
      alert("Lỗi hệ thống! Không thể cập nhật trạng thái đơn hàng.");
    }
  };

  // Admin cập nhật trạng thái
  const handleUpdateStatus = async (orderId, newStatus) => {
    try {
      const response = await fetch(
        "http://localhost/backend/update_order_status.php",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ order_id: orderId, status: newStatus }),
        }
      );
      const data = await response.json();
      if (data.success) {
        alert(data.message || "Cập nhật trạng thái đơn hàng thành công!");
        setOrders((prevOrders) =>
          prevOrders.map((order) =>
            order.id === orderId ? { ...order, status: newStatus } : order
          )
        );
      } else {
        alert(data.message || "Cập nhật trạng thái thất bại!");
      }
    } catch (error) {
      console.error("Lỗi khi cập nhật trạng thái:", error);
      alert("Lỗi hệ thống! Không thể cập nhật trạng thái đơn hàng.");
    }
  };

  // Gửi đánh giá (kèm số sao)
  const handleReview = async (productId) => {
    const star = stars[productId] || 5; // Nếu chưa chọn, mặc định 5
    const reviewText = reviews[productId] || "";
    if (!reviewText.trim()) {
      alert("Vui lòng nhập nội dung đánh giá!");
      return;
    }
    try {
      const reviewData = new URLSearchParams();
      reviewData.append("phone", user.phone);
      reviewData.append("product_id", productId);
      reviewData.append("review", reviewText);
      reviewData.append("star", star);

      const response = await fetch("http://localhost/backend/add_review.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: reviewData.toString(),
      });
      const data = await response.json();
      if (data.success) {
        alert("Đánh giá thành công!");
        // Reset form đánh giá
        setStars((prev) => ({ ...prev, [productId]: 5 }));
        setReviews((prev) => ({ ...prev, [productId]: "" }));
      } else {
        alert("Lỗi khi gửi đánh giá: " + data.message);
      }
    } catch (error) {
      console.error("Lỗi hệ thống:", error);
      alert("Lỗi hệ thống!");
    }
  };

  return (
    <div className="profile-container">
      <h2>Trang Cá Nhân</h2>
      <button onClick={() => navigate("/login")} className="logout-button">
        Đăng xuất
      </button>

      <div className="profile-card">
        <img src={user.avatar} alt="Avatar" className="avatar" />
        <h3>{user.name}</h3>
        <p>📞 Số điện thoại: {user.phone}</p>
        <p>🏠 Địa chỉ: {user.address}</p>
      </div>

      <div className="order-tabs">
        <button
          className={tab === "all" ? "active" : ""}
          onClick={() => setTab("all")}
        >
          🛒 Đơn hàng của tôi
        </button>
        <button
          className={tab === "canceled" ? "active" : ""}
          onClick={() => setTab("canceled")}
        >
          ❌ Đơn hàng đã hủy
        </button>
        <button
          className={tab === "history" ? "active" : ""}
          onClick={() => setTab("history")}
        >
          📜 Lịch sử mua hàng
        </button>
      </div>

      <div className="orders-section">
        <h3>
          {tab === "all"
            ? "Đơn hàng của tôi"
            : tab === "canceled"
            ? "Đơn hàng đã hủy"
            : "Lịch sử mua hàng"}
        </h3>

        {loading ? (
          <p>Đang tải...</p>
        ) : (
          <>
            {orders.filter((order) =>
              tab === "all"
                ? order.status !== 3
                : tab === "canceled"
                ? order.status === 3
                : order.status === 2
            ).length > 0 ? (
              <ul>
                {orders
                  .filter((order) =>
                    tab === "all"
                      ? order.status !== 3
                      : tab === "canceled"
                      ? order.status === 3
                      : order.status === 2
                  )
                  .map((order) => (
                    <li key={order.id} className="order-card">
                      <p>
                        📦 <strong>Mã đơn:</strong> {order.id}
                      </p>
                      <p>
                        📅 <strong>Ngày đặt:</strong> {order.created_at}
                      </p>
                      <p>
                        💰 <strong>Tổng tiền:</strong>{" "}
                        {Number(order.total_price).toLocaleString()} VND
                      </p>
                      <p>
                        🔄 <strong>Trạng thái:</strong>{" "}
                        {order.status === 0
                          ? "Chờ xác nhận"
                          : order.status === 1
                          ? "Đã xác nhận"
                          : order.status === 2
                          ? "Đã giao"
                          : "Đã hủy"}
                      </p>

                      {/* Nếu user.role === 'admin' thì cho cập nhật trạng thái */}
                      {user.role === "admin" && (
                        <OrderStatusEditor
                          order={order}
                          onStatusChange={handleUpdateStatus}
                        />
                      )}

                      <h4>Sản phẩm:</h4>
                      <ul>
                        {order.items && order.items.length > 0 ? (
                          order.items.map((item, index) => (
                            <li key={index}>
                              🛒{" "}
                              <strong>
                                {item.product_name || item.product_id}
                              </strong>{" "}
                              |<strong> Số lượng:</strong> {item.quantity} |
                              <strong> Giá:</strong>{" "}
                              {Number(item.price).toLocaleString()} VND
                              {/* Chỉ hiển thị đánh giá khi tab = history (status = 2) */}
                              {tab === "history" && (
                                <div style={{ marginTop: "8px" }}>
                                  <label>Chọn số sao: </label>
                                  <select
                                    value={stars[item.product_id] || 5}
                                    onChange={(e) =>
                                      setStars((prev) => ({
                                        ...prev,
                                        [item.product_id]: e.target.value,
                                      }))
                                    }
                                  >
                                    <option value={1}>1 sao</option>
                                    <option value={2}>2 sao</option>
                                    <option value={3}>3 sao</option>
                                    <option value={4}>4 sao</option>
                                    <option value={5}>5 sao</option>
                                  </select>
                                  <br />
                                  <textarea
                                    placeholder="Nhập đánh giá..."
                                    value={reviews[item.product_id] || ""}
                                    onChange={(e) =>
                                      setReviews((prev) => ({
                                        ...prev,
                                        [item.product_id]: e.target.value,
                                      }))
                                    }
                                    style={{ width: "100%", marginTop: "5px" }}
                                  />
                                  <button
                                    onClick={() =>
                                      handleReview(item.product_id)
                                    }
                                    style={{ marginTop: "5px" }}
                                  >
                                    Gửi đánh giá
                                  </button>
                                </div>
                              )}
                            </li>
                          ))
                        ) : (
                          <li>Không có sản phẩm trong đơn hàng</li>
                        )}
                      </ul>

                      {/* Nút hủy đơn (nếu status=0) */}
                      {order.status === 0 && (
                        <button
                          className="cancel-btn"
                          onClick={() => handleCancelOrder(order.id)}
                        >
                          ❌ Hủy đơn
                        </button>
                      )}
                      {/* Nút xác nhận giao hàng (nếu status=1) */}
                      {order.status === 1 && (
                        <button
                          className="confirm-btn"
                          onClick={() => handleConfirmDelivery(order.id)}
                        >
                          ✅ Xác nhận đã nhận hàng
                        </button>
                      )}
                    </li>
                  ))}
              </ul>
            ) : (
              <p>Không có đơn hàng nào.</p>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
