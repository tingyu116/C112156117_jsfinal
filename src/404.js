import {useLocation} from "react-router-dom";

export function Error404(){
    let location = useLocation();

    return(
        <div>
            <h1>404 Error</h1>
            <p>Resourse not found at {location.pathname}</p>
            <p>請檢查網址或回到首頁</p>
        </div>
    );
}