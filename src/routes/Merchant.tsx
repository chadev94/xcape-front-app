import { Outlet } from "react-router-dom";
import Header from "../components/Header";

function Merchant() {
    return (
        <div className="sm:w-[550px] mx-auto">
            <Header />
            <Outlet />
        </div>
    );
}

export default Merchant;
