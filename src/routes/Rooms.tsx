import { useRecoilValue } from "recoil";
import { IMerchant, ITheme } from "../api";
import { merchant, themeList } from "../atom";
import RoomsTheme from "../components/RoomsTheme";
import CautionLine from "../components/CautionLine";

function Rooms() {
    const currentMerchant: IMerchant = useRecoilValue(merchant);
    const currentThemeList: ITheme[] = useRecoilValue(themeList);

    const xfilerThemeList = currentThemeList.filter((theme) => !theme.isCrimeScene);
    const crimeSceneThemeList = currentThemeList.filter((theme) => theme.isCrimeScene);

    const xfilerImage = require("../assets/images/xfiler.png");
    const crimeSceneImage = require("../assets/images/crime_scene.png");

    return (
        <div className="bg-[url('./assets/images/bg_iron.png')]">
            <CautionLine />
            {xfilerThemeList.length > 0 && (
                <div className="bg-black bg-opacity-50">
                    <div className="text-center pt-4">
                        <img src={xfilerImage} alt="xfilerImage" width={80} className="m-auto" />
                    </div>
                    <div className="text-center py-4">
                        <span className="text-[#ff7119] font-bold text-2xl">엑스파일러 : </span>
                        <span className="text-white text-2xl">수사탈출게임</span>
                    </div>
                    <div>
                        <RoomsTheme themeList={xfilerThemeList} merchantCode={currentMerchant.code} />
                    </div>
                </div>
            )}
            {crimeSceneThemeList.length > 0 && (
                <>
                    <CautionLine />
                    <div className="text-center pt-4">
                        <img src={crimeSceneImage} alt="crimeSceneImage" width={80} className="m-auto" />
                    </div>
                    <div className="text-center py-4">
                        <span className="text-[#fff200] font-bold text-2xl">크라임씬 : </span>
                        <span className="text-white text-2xl">범인역할극게임</span>
                    </div>
                    <>
                        <RoomsTheme themeList={crimeSceneThemeList} merchantCode={currentMerchant.code} />
                    </>
                </>
            )}
            <CautionLine />
        </div>
    );
}

export default Rooms;
