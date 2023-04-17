import ThemeInfo from "./ThemeInfo";
import xfiler from "../assets/images/xfiler.jpeg";
import banner from "../assets/images/banner.jpeg";
import { STORE_INFORMATION } from "../data/information";
import { ITheme } from "../api";
import { useRecoilValue } from "recoil";
import { theme, themeList } from "../atom";

export type ThemeType = {
    id: number;
    nameKo: string;
    mainImagePath?: string | null;
    difficulty: number;
    minParticipantCount: number;
    maxParticipantCount: number;
    genre: string;
    abilityList: object[];
};

function Information() {
    const currentTheme = useRecoilValue<ITheme[]>(themeList);
    return (
        <div>
            <img src={xfiler} alt="description" className="w-full" />
            <img src={banner} alt="banner" className="w-full" />
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 mt-3">
                {currentTheme.map((theme: ITheme, index) => {
                    return <ThemeInfo theme={theme} key={theme.id} index={index} />;
                })}
            </div>
        </div>
    );
}

export default Information;
