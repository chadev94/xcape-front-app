import { useRecoilValue } from "recoil";
import { IAbility, IMerchant, ITheme } from "../api";
import { merchant, themeList } from "../atom";
import Icon from "../assets/icons/index";
import { useNavigate } from "react-router-dom";
import { makeBooleanArray } from "../util/util";

function Rooms() {
    const navigate = useNavigate();
    const currentMerchant: IMerchant = useRecoilValue(merchant);
    const currentThemeList: ITheme[] = useRecoilValue(themeList);
    const abilityListJson: IAbility[] = require("../data/abilityList.json");

    const findAbilitiesByThemeId = (themeId: number): IAbility[] => {
        return abilityListJson.filter((ability: IAbility) => ability.themeId === themeId);
    };

    return (
        <div>
            {currentThemeList &&
                currentThemeList.map((theme, index) => (
                    <div
                        key={index}
                        className="border border-zinc-500 rounded-sm p-2 md:p-3 my-3 xl:w-2/3 m-auto cursor-pointer"
                        onClick={() => {
                            navigate(`/${currentMerchant.code}/theme-detail/${theme.id}`);
                        }}
                    >
                        <div className="flex">
                            <div className="w-[200px]">
                                <img src={theme.mainImagePath} alt="mainImage" className="w-[200px]" />
                                <div className="flex">
                                    {makeBooleanArray(theme.difficulty).map((star, index) => {
                                        if (star) {
                                            return (
                                                <Icon.Star
                                                    key={index}
                                                    style={{ color: theme.colorCode }}
                                                    className="h-6 w-6 xs:h-10 xs:w-10"
                                                />
                                            );
                                        }
                                        return (
                                            <Icon.Star
                                                key={index}
                                                className="text-zinc-600 h-6 w-6 xs:h-10 xs:w-10"
                                            />
                                        );
                                    })}
                                </div>
                            </div>
                            <div className="ml-2 sm:ml-3 w-full flex flex-col justify-around">
                                <div className="text-lg xs:text-2xl md:text-3xl text-white whitespace-nowrap flex justify-between items-center">
                                    <div className="py-1 sm:py-2">
                                        {theme.nameKo}
                                    </div>
                                    <div>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="w-10 h-10">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M12.75 15l3-3m0 0l-3-3m3 3h-7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                    </div>
                                </div>
                                <div className="flex justify-between">
                                    <div className="py-1 sm:py-2">
                                        <span
                                            style={{ backgroundColor: theme.colorCode }}
                                            className="p-1 text-sm xs:text-lg md:p-2 text-white whitespace-nowrap"
                                        >
                                            {theme.genre}
                                        </span>
                                    </div>
                                    <div className="flex justify-between text-white items-center whitespace-nowrap">
                                        <div>
                                            <span className="text-sm xs:text-sm md:text-lg text-zinc-300/80">인원 </span>
                                            <span className="text-sm xs:text-sm md:text-lg">
                                                {theme.minParticipantCount} - {theme.maxParticipantCount}
                                            </span>
                                            <span className="text-sm xs:text-sm md:text-lg text-zinc-300/80">명</span>
                                        </div>
                                    </div>
                                </div>
                                <div
                                    style={{ backgroundColor: theme.colorCode }}
                                    className="grid grid-cols-1 xs:grid-cols-2 p-1 lg:p-2 m-0"
                                >
                                    {findAbilitiesByThemeId(theme.id).map((ability) => {
                                        return (
                                            <div
                                                key={ability.id}
                                                className="text-md xs:text-md lg:text-lg lg:text-xl flex"
                                            >
                                                <div className="text-white text-xs xs:text-2xl md:text-lg whitespace-nowrap">{ability.name}</div>
                                                <div className="flex items-center justify-between w-2/3 sm:w-1/2 ml-2">
                                                    {makeBooleanArray(ability.value).map((item, index) => {
                                                        if (item) {
                                                            return (
                                                                <div
                                                                    key={index}
                                                                    className="h-2 w-2 lg:h-3 lg:w-3 bg-black rounded-full"
                                                                ></div>
                                                            );
                                                        }
                                                        return (
                                                            <div
                                                                key={index}
                                                                className="h-2 w-2 lg:h-3 lg:w-3 bg-white rounded-full"
                                                            ></div>
                                                        );
                                                    })}
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
        </div>
    );
}

export default Rooms;
