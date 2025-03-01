// src/pages/Cart.js
import React, { useContext } from "react";
import { CartContext } from "../context/Cartcontext";
import { useNavigate } from "react-router-dom";
import "../styles/Cart.scss";

const Cart = () => {
  const navigate = useNavigate();
  const {
    cart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    getTotalPrice,
  } = useContext(CartContext);

  return (
    <div className="cart-container">
      <h1 className="cart-title">Giỏ hàng</h1>
      {cart.length === 0 ? (
        <p className="cart-empty">Giỏ hàng của bạn đang trống.</p>
      ) : (
        <div>
          {cart.map((item, index) => (
            <div key={index} className="cart-item">
              {/* Hiển thị ảnh theo màu sắc đã chọn */}
              <img
                src={item.selectedColor ? item.selectedColor.image : item.image}
                alt={item.name}
                className="cart-item-image"
              />
              <p className="cart-item-color">
                Màu sắc: <span>{item.selectedColor?.name}</span>
              </p>

              <div className="cart-info">
                <h2 className="cart-item-name">{item.name}</h2>

                {/* Hiển thị màu sắc đã chọn */}
                {item.selectedColor && (
                  <p className="cart-item-color">
                    Màu sắc: <span>{item.selectedColor.name}</span>
                  </p>
                )}

                <div className="cart-item-quantity">
                  <button
                    className="quantity-btn"
                    onClick={() =>
                      decreaseQuantity(item.id, item.selectedColor?.name)
                    }
                  >
                    -
                  </button>
                  <span className="quantity-text">{item.quantity}</span>
                  <button
                    className="quantity-btn"
                    onClick={() =>
                      increaseQuantity(item.id, item.selectedColor?.name)
                    }
                  >
                    +
                  </button>
                </div>

                <p className="cart-item-price">
                  {(item.price * item.quantity).toLocaleString()} VND
                </p>

                <button
                  className="cart-remove-btn"
                  onClick={() =>
                    removeFromCart(item.id, item.selectedColor?.name)
                  }
                >
                  Xóa
                </button>
              </div>
            </div>
          ))}
          <h2 className="cart-total">
            Tổng tiền: {getTotalPrice().toLocaleString()} VND
          </h2>
        </div>
      )}
      <button
        className="cart-checkout-btn"
        onClick={() => navigate("/checkout")}
      >
        Thanh toán
      </button>
    </div>
  );
};

export default Cart;
