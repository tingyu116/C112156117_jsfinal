import './App.css';
import { Link, Outlet } from "react-router";

export function About(){
    return(
        <div className='about-section'>
            <h1>關於我們</h1>
            <p>這是一個風景雜貨店</p>
            <nav>
                <Link to="Service" className="about-link">服務</Link>
                <Link to="Contact" className="about-link">聯繫</Link>
                <Link to="Form" className="about-link">意見回饋</Link>
            </nav>
            <Outlet />
        </div>
    );
}