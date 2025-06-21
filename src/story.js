import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Products } from "./Products";

export const MyStory = () => {
  const navigate = useNavigate();
  const [items, setItems] = useState([]);

  useEffect(() => {
    const loadStories = () => {
      let storedItems = localStorage.getItem("cartItems");
      if (!storedItems) {
        storedItems = localStorage.getItem("myStoryItems");
      }
      if (storedItems) {
        setItems(JSON.parse(storedItems));
      } else {
        navigate("/product");
      }
    };

    loadStories();
    const onStorageChange = (e) => {
      if (e.key === "cartItems" || e.key === "myStoryItems") {
        loadStories();
      }
    };
    window.addEventListener("storage", onStorageChange);
    return () => window.removeEventListener("storage", onStorageChange);
  }, [navigate]);

  const getStories = (id, quantity) => {
    const product = Products.find((p) => p.id === id);
    if (!product) return [];
    const stories = product.stories || [];
    if (stories.length === 0) {
      return ["這個商品還沒有故事內容喔！"];
    }
    return stories.slice(0, quantity);
  };

  return (
    <div className="mystory-container">
      <h2 className="mystory-title">✨你的故事✨</h2>

      {items.length === 0 ? (
        <div className="empty-message">
          <p>你的故事目前是空白的，快去挑選屬於你的故事吧！</p>
          <button onClick={() => navigate("/product")} className="btn-primary">
            前往商品專區
          </button>
        </div>
      ) : (
        <ul className="story-list">
          {items.map((item) => (
            <li key={item.id} className="story-item">
              <h3 className="item-name">{item.name}</h3>
              <div className="stories">
                {getStories(item.id, item.quantity).map((story, idx) => (
                  <p key={idx} className="story-text">
                    {story}
                  </p>
                ))}
              </div>
            </li>
          ))}
        </ul>
      )}

      <div className="btn-group">
        <button onClick={() => navigate("/home")} className="btn-secondary">
          回到首頁
        </button>
      </div>
    </div>
  );
};
