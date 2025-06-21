import './App.css';
import { Outlet, useNavigate } from "react-router";
import product1Jpg from './assets/product1.jpg';
import product2Jpg from './assets/product2.jpg';
import product3Jpg from './assets/product3.jpg';

export function Home({ username, isLoggedIn }) {
  const navigate = useNavigate();

  return (
    <div className='inside'>
      <h1>風景雜貨店</h1>

      {isLoggedIn ? (
        <p>歡迎回來，{username}！</p>
      ) : (
        <p>歡迎來到風景雜貨店</p>
      )}

      <p>我們販售的不只是商品，而是充滿故事的生活靈感！</p>
      <div>
        <img src={product1Jpg} alt="A" width="33%" />
        <img src={product2Jpg} alt="B" width="33%" />
        <img src={product3Jpg} alt="C" width="33%" />
      </div>
      <h2>🌸 本店特色 🌸</h2>
      <ul className="feature-list">
        <li>每件商品都有一段屬於它的故事。</li>
        <li>一邊逛商品，一邊看故事，體驗與眾不同。</li>
      </ul>

      <h2>✨ 推薦你可以試試：</h2>
      <div className="home-buttons">
        <button onClick={() => navigate("/product")}>逛逛商品專區</button>
        <button onClick={() => navigate("/about")}>關於我們</button>
      </div>


      <Outlet />
    </div>
  );
}
