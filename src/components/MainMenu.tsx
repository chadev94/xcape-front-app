import { Link } from "react-router-dom";
import styled from "styled-components";

const Wrapper = styled.div`
    //display: grid;
    //grid-template-columns: repeat(3, 1fr);
    //width: 100%;
`;
const Menu = styled.div`
    // display: flex;
    // justify-content: center;
    // align-items: center;
    // border: 1px solid #4c3d35;
    // height: 5vh;
    // font-size: 1.2em;
    // color: ${(props) => props.theme.ku.color};
`;

const mainMenuList = ["XCAPE", "ROOMS", "RESERVATION", "REVIEW", "EVENT", "CONTACT"];

function MainMenu() {
    return (
        <div className="grid grid-cols-3">
            {mainMenuList.map((menu, index) => (
                <Link key={index} to={`./${menu.toLowerCase()}`}>
                    <div className="border items-center border-[#4c3d35] text-center h-10 justify-center flex font-semibold text-sm md:text-lg text-[#9C8871]" key={index}>
                        {menu}
                    </div>
                </Link>
            ))}
        </div>
    );
}

export default MainMenu;
