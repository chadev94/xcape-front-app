import Nav from "./components/Nav";
import { Outlet } from "react-router-dom";
import CautionLine from "./components/CautionLine";

function App() {
    const xcapeLogo = require("./assets/images/merchant/logo/xcape_logo.png");
    return (
        <div className="sm:w-3/5 mx-auto">
            <Nav />
            {/*<Outlet />*/}
            <div className="bg-[url('./assets/images/bg_iron.png')]">
                <CautionLine />
                <div className="text-center pt-4">
                    <span className="text-[#f5ef42] font-bold text-3xl">상단의 지점명을 골라주세요.</span>
                    <img src={xcapeLogo} alt="xfilerImage" className="w-3/4 mx-auto my-72" />
                </div>
                <CautionLine />
            </div>
        </div>
    );
}

export default App;
