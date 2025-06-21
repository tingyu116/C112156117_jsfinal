import React, { useState, useEffect } from "react";
import { Products } from "../Products";
import { useNavigate } from "react-router-dom";

export const ProductList = ({ isLoggedIn, username }) => {
  const navigate = useNavigate();
  const [quantities, setQuantities] = useState(() => {
    const initial = {};
    Products.forEach((p) => (initial[p.id] = 0));
    return initial;
  });
  useEffect(() => {
    const stored = localStorage.getItem("cartItems");
    if (stored) {
      const savedItems = JSON.parse(stored);
      const newQuantities = {};
      Products.forEach((p) => {
        const found = savedItems.find((item) => item.id === p.id);
        newQuantities[p.id] = found ? found.quantity : 0;
      });
      setQuantities(newQuantities);
    }
  }, []);

  const handleChange = (id, value) => {
    const qty = Math.min(5, Math.max(0, parseInt(value) || 0));
    setQuantities((prev) => ({ ...prev, [id]: qty }));
  };
  const increment = (id) => {
    setQuantities((prev) => ({ ...prev, [id]: Math.min(5, (prev[id] || 0) + 1) }));
  };
  const decrement = (id) => {
    setQuantities((prev) => ({ ...prev, [id]: Math.max(0, (prev[id] || 0) - 1) }));
  };
  const handleConfirm = () => {
    if (!isLoggedIn) {
      alert("請先登入才能結帳！");
      navigate("/login");
      return;
    }

    const selectedItems = Products.filter((product) => quantities[product.id] > 0).map((product) => ({
      ...product,
      quantity: quantities[product.id],
    }));

    if (selectedItems.length === 0) {
      alert("請先選擇商品！");
      return;
    }
    localStorage.setItem("cartItems", JSON.stringify(selectedItems));

    navigate("/CartSummary", { state: { items: selectedItems } });
  };

  return (
    <div className="product-list">
      {Products.map((product) => (
        <div key={product.id} className="product-card">
          <img src={product.image} alt={product.name} className="product-image" />
          <h3 className="product-name">{product.name}</h3>
          <p className="product-description">{product.description}</p>
          <p className="product-price">價格: ${product.price} 元</p>
          <div className="quantity-control">
            <button onClick={() => decrement(product.id)} className="btn-qty">
              -
            </button>
            <input
              type="number"
              min="0"
              max="5"
              value={quantities[product.id]}
              onChange={(e) => handleChange(product.id, e.target.value)}
              className="qty-input"
            />
            <button onClick={() => increment(product.id)} className="btn-qty">
              +
            </button>
          </div>
        </div>
      ))}
      <p />
      <button className="add-to-cart-button" onClick={handleConfirm}>
        加入購物車
      </button>
    </div>
  );
};
