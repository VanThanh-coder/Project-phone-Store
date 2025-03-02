import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/Login.scss";
import { Link } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form submitted"); // Kiểm tra xem có log này không
    try {
      const response = await axios.post(
        "http://localhost/Backend/login.php",
        formData
      );
      console.log(response.data); // Kiểm tra phản hồi từ server
      alert(response.data.message);
      if (response.data.user) {
        localStorage.setItem("user", JSON.stringify(response.data.user));
        navigate("/profilepage");
      }
    } catch (error) {
      console.error("Lỗi:", error);
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit}>
        <h2>Đăng nhập</h2>
        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Mật khẩu"
          onChange={handleChange}
          required
        />
        <button type="submit">Đăng nhập</button>

        <div className="extra-options">
          <Link to="./">Quên mật khẩu</Link>
          <Link to="/register">Tạo tài khoản</Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
