import React from "react";
// Tùy chọn: file SCSS riêng cho component này

const OrderStatusEditor = ({ order, onStatusChange }) => {
  return (
    <div className="status-editor">
      <label>Cập nhật trạng thái:</label>
      <select
        value={order.status}
        onChange={(e) => onStatusChange(order.id, Number(e.target.value))}
      >
        <option value={0}>Chờ xác nhận</option>
        <option value={1}>Đã xác nhận</option>
        <option value={2}>Đã giao</option>
        <option value={3}>Đã hủy</option>
      </select>
    </div>
  );
};

export default OrderStatusEditor;
