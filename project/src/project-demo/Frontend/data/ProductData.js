import ip13_default from "../assets/images/ip13.jpg";
import ip14_default from "../assets/images/ip14.jpg";
import ip15_default from "../assets/images/ip15.jpg";
import ip13_black from "../assets/images/ip13-black.jpg";
import ip13_red from "../assets/images/ip13-red.jpg";
import ip13_blue from "../assets/images/ip13-blue.jpg";
import ip14_black from "../assets/images/ip14-black.jpg";
import ip14_red from "../assets/images/ip14-red.jpg";
import ip14_blue from "../assets/images/ip14-blue.jpg";
import ip15_black from "../assets/images/ip15-black.jpg";
import ip15_red from "../assets/images/ip15-red.jpg";
import ip15_blue from "../assets/images/ip15-blue.jpg";

const Products = Array.from({ length: 3 }, (_, index) => {
  // baseId luân phiên: 1, 2, 3
  const baseId = (index % 3) + 1;
  const names = ["iPhone 13 Pro Max", "iPhone 14 Pro Max", "iPhone 15 Pro Max"];
  const prices = [13000000, 17000000, 20000000];
  const colors = [
    [
      { name: "black", image: ip13_black },
      { name: "red", image: ip13_red },
      { name: "blue", image: ip13_blue },
    ],
    [
      { name: "black", image: ip14_black },
      { name: "red", image: ip14_red },
      { name: "blue", image: ip14_blue },
    ],
    [
      { name: "black", image: ip15_black },
      { name: "red", image: ip15_red },
      { name: "blue", image: ip15_blue },
    ],
  ];

  return {
    id: baseId, // Sử dụng baseId cho id, để tất cả sản phẩm cùng loại có cùng id
    name: names[baseId - 1],
    price: prices[baseId - 1],
    colors: colors[baseId - 1],
    images: colors[baseId - 1].map((color) => color.image),
    quantity: 1, // Hoặc bạn có thể đặt số lượng khác nếu cần
  };
});

export default Products;
