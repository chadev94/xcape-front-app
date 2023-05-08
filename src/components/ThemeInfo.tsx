import { formatNumber, makeBooleanArray } from "../util/util";
import { Link } from "react-router-dom";
import { IAbility, ITheme } from "../api";

type ThemeProps = {
    theme: ITheme;
    index: number;
    color: string;
};

function ThemeInfo({ theme, index, color }: ThemeProps) {
    const abilityListJson: IAbility[] = require("../data/abilityList.json");

    const findAbilitiesByThemeId = (themeId: number): IAbility[] => {
        return abilityListJson.filter((ability: IAbility) => ability.themeId === themeId);
    };
    return (
        <div className="w-50 mb-5">
            <div>
                <span className="text-amber-500 text-2xl font-semibold mr-2 whitespace-nowrap">
                    {formatNumber(index + 1)}
                </span>
                <span style={{ color: color }} className="text-2xl font-semibold text-white">
                    {theme.nameKo}
                    <div className="text-zinc-400 text-sm whitespace-nowrap">{theme.nameEn}</div>
                </span>
            </div>
            <div className="h-60">
                <Link to={`theme-detail/${theme.id}`}>
                    <img src={theme.mainImagePath!} alt="없음" className="w-full h-full object-contain" />
                </Link>
            </div>
            <div style={{ backgroundColor: color }} className="text-black text-lg font-bold text-center py-1">
                {theme.genre}
            </div>
            <div style={{ backgroundColor: color }} className="my-2 grid grid-cols-2 p-1 whitespace-nowrap">
                {findAbilitiesByThemeId(theme.id).map((ability) => {
                    return (
                        <div key={ability.id} className="text-xs lg:text-base flex">
                            <div className="ml-1">{ability.name}</div>
                            <div className="flex items-center justify-between w-2/3 sm:w-1/2 ml-1">
                                {makeBooleanArray(ability.value).map((item, index) => {
                                    if (item) {
                                        return <div key={index} className="h-2 w-2 bg-black rounded-full"></div>;
                                    }
                                    return (
                                        <div
                                            key={index}
                                            className="h-2 w-2 border border-black bg-transparent rounded-full"
                                        ></div>
                                    );
                                })}
                            </div>
                        </div>
                    );
                })}
            </div>
            <div>
                <Link to={"reservation"}>
                    <button
                        type="button"
                        className="w-full px-2 py-1 border border-zinc-600 bg-zinc-900
                rounded-sm text-zinc-400 font-xl
                hover:text-zinc-100 hover:border-zinc-100"
                    >
                        실시간 예약하기
                    </button>
                </Link>
            </div>
        </div>
    );
}

export default ThemeInfo;
