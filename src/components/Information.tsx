import ThemeInfo from "./ThemeInfo";
import { ITheme } from "../api";
import { useRecoilValue } from "recoil";
import { themeList } from "../atom";
import SliderBanners from "./SliderBanners";
import CautionLine from "./CautionLine";

function Information() {
    const currentThemeList = useRecoilValue<ITheme[]>(themeList);

    const xfilerThemeList = currentThemeList.filter((theme) => !theme.isCrimeScene);
    const crimeSceneThemeList = currentThemeList.filter((theme) => theme.isCrimeScene);

    const xfilerImage = require("../assets/images/xfiler.png");
    const crimeSceneImage = require("../assets/images/crime_scene.png");

    return (
        <div>
            <CautionLine />
            <SliderBanners />
            <CautionLine />
            <div className="bg-[url('./assets/images/bg_iron.png')]">
                {xfilerThemeList.length > 0 && (
                    <div className="bg-black bg-opacity-50">
                        <div className="flex justify-center">
                            <div className="h-28">
                                <img src={xfilerImage} alt="xfilerImage" className="object-contain h-28" />
                            </div>
                            <div className="mx-0 my-auto">
                                <div className="text-3xl text-white">엑스파일러게임</div>
                                <div className="text-xl text-[#ff7119]">사건수사 프로파일링 게임</div>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                            {xfilerThemeList.map((theme, index) => {
                                return <ThemeInfo key={theme.id} theme={theme} index={index} color="#ff7119" />;
                            })}
                        </div>
                    </div>
                )}
                <CautionLine />
                {crimeSceneThemeList.length > 0 && (
                    <>
                        <div className="flex justify-center">
                            <div className="h-28">
                                <img src={crimeSceneImage} alt="crimeSceneImage" className="object-contain h-28" />
                            </div>
                            <div className="mx-0 my-auto">
                                <div className="text-3xl text-white">크라임씬게임</div>
                                <div className="text-xl text-[#fff200]">용의자 역할극 롤플레잉 게임</div>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                            {crimeSceneThemeList.map((theme, index) => {
                                return <ThemeInfo key={theme.id} theme={theme} index={index} color="#fff200" />;
                            })}
                        </div>
                    </>
                )}
            </div>
            {/*<div className="grid grid-cols-2 lg:grid-cols-3 gap-3 mt-3">*/}
            {/*    {currentThemeList.map((theme: ITheme, index) => {*/}
            {/*        return <ThemeInfo theme={theme} key={theme.id} index={index} />;*/}
            {/*    })}*/}
            {/*</div>*/}
        </div>
    );
}

export default Information;
