import ThemeInfo from "./ThemeInfo";
import { ITheme } from "../api";
import { useRecoilValue } from "recoil";
import { themeList } from "../atom";
import SliderBanners from "./SliderBanners";
import CautionLine from "./CautionLine";

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
            <CautionLine />
            <SliderBanners />
            <CautionLine />
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 mt-3">
                {currentTheme.map((theme: ITheme, index) => {
                    return <ThemeInfo theme={theme} key={theme.id} index={index} />;
                })}
            </div>
        </div>
    );
}

export default Information;
