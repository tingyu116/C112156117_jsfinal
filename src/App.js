import './App.css';
import { Navigate, useRoutes, NavLink, useNavigate } from 'react-router-dom';
import { Contact, Services, Form } from './pages';
import { Home } from './home';
import { Login } from './login';
import { About } from './About';
import { Error404 } from './404';
import { useState, useEffect } from 'react';
import { ProductList } from './components/ProductList';
import CartSummary from './components/CartSummary';
import { FaHome, FaShoppingBasket } from "react-icons/fa";
import { MdOutlineHistoryEdu } from "react-icons/md";
import { Products } from "./Products";
import { MyStory } from './story';

function App() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("isLoggedIn") === "true"
  );
  const [username, setUsername] = useState(
    localStorage.getItem("username") || ""
  );
  const [cartItems, setCartItems] = useState(() => {
    const saved = localStorage.getItem("cartItems");
    return saved ? JSON.parse(saved) : [];
  });
  const [quantities, setQuantities] = useState(
    Products.reduce((acc, product) => {
      acc[product.id] = 0;
      return acc;
    }, {})
  );

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  const element = useRoutes([
    { path: "/", element: <Navigate to="/home" /> },
    { path: "/home", element: <Home isLoggedIn={isLoggedIn} username={username} /> },
    {
      path: "about",
      element: <About />,
      children: [
        { path: "service", element: <Services /> },
        { path: "contact", element: <Contact /> },
        { path: "Form", element: <Form /> }
      ]
    },
    {
      path: "product",
      element: (
        <ProductListWrapper
          quantities={quantities}
          setQuantities={setQuantities}
          setCartItems={setCartItems}
          isLoggedIn={isLoggedIn}
          username={username}
          setIsLoggedIn={setIsLoggedIn}
        />
      )
    },
    {
      path: "mystory",
      element: (
        <MyStory />
      )
    },
    {
      path: "CartSummary",
      element: (
        <CartSummary
          items={cartItems}
          isLoggedIn={isLoggedIn}
          username={username}
        />
      )
    },
    {
      path: "/login",
      element: (
        <Login
          isLoggedIn={isLoggedIn}
          setIsLoggedIn={setIsLoggedIn}
          username={username}
          setUsername={setUsername}
        />
      )
    },
    { path: "*", element: <Error404 /> },
    { path: "service", element: <Navigate replace to="/about/service" /> },
    { path: "story", element: <Navigate replace to="/mystory" /> },
 ]);

  return (
    <div>
      <nav className='navbar'>
        <div className="nav-left">
          <NavLink to="/"><FaHome size={22} /></NavLink>
          <NavLink to="/about">關於</NavLink>
          <NavLink to="/product">商品專區</NavLink>
          <NavLink to="/CartSummary"><FaShoppingBasket size={22} /></NavLink>
          <NavLink to="/story"><MdOutlineHistoryEdu size={22} /></NavLink>
        </div>
        <div className="nav-right">
          {isLoggedIn ? (
            <>
              <span>Hi, {username}</span>
              <button onClick={() => {
                setIsLoggedIn(false);
                setUsername("");
                setCartItems([]);
                setQuantities(
                  Products.reduce((acc, product) => {
                    acc[product.id] = 0;
                    return acc;
                  }, {})
                );
                localStorage.removeItem("isLoggedIn");
                localStorage.removeItem("username");
                localStorage.removeItem("cartItems");
                localStorage.removeItem("myStoryItems");
                navigate("/login");
              }}>登出</button>
            </>
          ) : (
            <NavLink to="/login">登入</NavLink>
          )}
        </div>
      </nav>
      {element}
    </div>
  );
}

function ProductListWrapper({ quantities, setQuantities, setCartItems, isLoggedIn, username, setIsLoggedIn }) {
  const navigate = useNavigate();

  const handleConfirm = (selectedItems) => {
    if (!isLoggedIn) {
      alert("請先登入才能結帳！");
      navigate("/login");
      return;
    }
    setCartItems(selectedItems);
    navigate("/CartSummary");
  };

  return (
    <div>
      <h2>✨販售所有不為人知的故事✨</h2>
      <ProductList
        quantities={quantities}
        setQuantities={setQuantities}
        onConfirm={handleConfirm}
        isLoggedIn={isLoggedIn}
        username={username}
        setIsLoggedIn={setIsLoggedIn}
      />
    </div>
  );
}

export default App;
