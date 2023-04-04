import { Outlet } from "react-router-dom";
import Header from "../components/Header";

function Merchant() {
    return (
        <div className="sm:w-3/5 mx-auto">
            <Header />
            <Outlet />
        </div>
    );
}

export default Merchant;
