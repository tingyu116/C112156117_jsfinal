import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const CartSummary = ({ username, isLoggedIn }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const [items, setItems] = useState(() => {
    if (location.state?.items) {
      return location.state.items;
    }
    const stored = localStorage.getItem("cartItems");
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    if (location.state?.items) {
      setItems(location.state.items);
    }
  }, [location.state]);

  const total = items.reduce(
    (sum, item) => sum + (item.price || 0) * (item.quantity || 0),
    0
  );

  const handleCheckout = () => {
    localStorage.setItem("myStoryItems", JSON.stringify(items));
    navigate("/MyStory");
  };

  if (!isLoggedIn) {
    return <p>請先登入以查看購物清單。</p>;
  }

  return (
    <div className="cart-summary">
      <h2>{username}的購物清單🛍️</h2>

      {items.length === 0 ? (
        <>
          <p>目前購物車是空的，歡迎選購。</p>
          <button onClick={() => navigate("/product")}>前往商品專區</button>
        </>
      ) : (
        <>
          <ul>
            {items.map((item) => {
              const itemTotal = (item.price || 0) * (item.quantity || 0);
              return (
                <li key={item.id}>
                  {item.name} x {item.quantity} = ${itemTotal.toLocaleString()}
                </li>
              );
            })}
          </ul>
          <h3>總金額: ${total.toLocaleString()}元</h3>
          <button onClick={() => navigate("/product")}>繼續尋找商品</button>
          <button onClick={handleCheckout}>結帳並前往我的故事</button>
        </>
      )}
    </div>
  );
};

export default CartSummary;
