import { useState } from "react";
import axios from "axios";
import "../styles/Register.scss";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost/backend/Register.php",
        formData
      );
      alert(response.data.message);
    } catch (error) {
      console.error("Lỗi:", error);
    }
  };
  const login = () => {
    navigate("/login");
  };

  return (
    <div className="register-container">
      <form onSubmit={handleSubmit}>
        <h1 style={{ textAlign: "center", color: "white" }}>Đăng ký</h1>
        <input
          type="text"
          name="username"
          placeholder="Tên đăng nhập"
          onChange={handleChange}
          required
        />
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
        <button type="submit">Đăng ký</button>
        <a href="" onClick={login} style={{ color: "white" }}>
          {" "}
          Đăng nhập
        </a>
      </form>
    </div>
  );
};

export default Register;
