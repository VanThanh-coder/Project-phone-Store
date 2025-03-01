import React from "react";
import ProductForm from "./Frontend/components/ProductForm";
import ProductList from "./Frontend/components/ProductList";

const AdminPage = () => {
  return (
    <div>
      <h1>Quản lý sản phẩm</h1>
      <ProductForm />
      <ProductList />
    </div>
  );
};

export default AdminPage;
