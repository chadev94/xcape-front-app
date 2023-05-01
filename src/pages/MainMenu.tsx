import { Link } from "react-router-dom";

const mainMenuList = ["XCAPE", "ROOMS", "RESERVATION", "REVIEW", "EVENT", "CONTACT"];

function MainMenu() {
    return (
        <div className="grid grid-cols-3 mb-3">
            {mainMenuList.map((menu, index) => (
                <Link key={index} to={`./${menu.toLowerCase()}`}>
                    <div className="border items-center border-[#4c3d35] text-center h-10 justify-center flex font-semibold text-sm md:text-lg text-[#9C8871] hover:text-zinc-400 hover:border-zinc-400" key={index}>
                        {menu}
                    </div>
                </Link>
            ))}
        </div>
    );
}

export default MainMenu;
