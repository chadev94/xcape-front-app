import React from "react";
import { makeBooleanArray } from "../util/util";
import Icon from "../assets/icons";
import { IAbility, ITheme } from "../api";
import { useNavigate } from "react-router-dom";

interface IProps {
    themeList: ITheme[];
    merchantCode: string;
}

function RoomsTheme({ themeList, merchantCode }: IProps) {
    const navigate = useNavigate();

    const abilityListJson: IAbility[] = require("../data/abilityList.json");

    const findAbilitiesByThemeId = (themeId: number): IAbility[] => {
        return abilityListJson.filter((ability: IAbility) => ability.themeId === themeId);
    };

    return (
        <>
            {themeList &&
                themeList.map((theme) => {
                    return (
                        <div
                            key={theme.id}
                            className="border border-zinc-500 rounded-sm p-2 md:p-3 mt-3 cursor-pointer"
                            onClick={() => {
                                navigate(`/${merchantCode}/theme-detail/${theme.id}`);
                            }}
                        >
                            <div className="flex">
                                <div className="w-[150px]">
                                    <img src={theme.mainImagePath} alt="mainImage" className="w-[150px]" />
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
                                        <div className="py-1 sm:py-2">{theme.nameKo}</div>
                                        <div>
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                strokeWidth={1}
                                                stroke="currentColor"
                                                className="w-10 h-10"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="M12.75 15l3-3m0 0l-3-3m3 3h-7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                                />
                                            </svg>
                                        </div>
                                    </div>
                                    <div className="flex justify-between">
                                        <div className="py-1 sm:py-2">
                                            <span
                                                style={{ backgroundColor: theme.colorCode }}
                                                className="p-1 text-sm xs:text-lg text-white whitespace-nowrap"
                                            >
                                                {theme.genre}
                                            </span>
                                        </div>
                                        <div className="flex justify-between text-white items-center whitespace-nowrap">
                                            <div>
                                                <span className="text-sm xs:text-sm md:text-lg text-zinc-300/80">
                                                    인원{" "}
                                                </span>
                                                <span className="text-sm xs:text-sm md:text-lg">
                                                    {theme.minParticipantCount} - {theme.maxParticipantCount}
                                                </span>
                                                <span className="text-sm xs:text-sm md:text-lg text-zinc-300/80">
                                                    명
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div
                                        style={{ backgroundColor: theme.colorCode }}
                                        className="my-2 grid grid-cols-2 p-1 whitespace-nowrap"
                                    >
                                        {findAbilitiesByThemeId(theme.id).map((ability) => {
                                            return (
                                                <div key={ability.id} className="text-xs lg:text-base flex">
                                                    <div className="ml-1">{ability.name}</div>
                                                    <div className="flex items-center justify-between w-2/3 sm:w-1/2 ml-1">
                                                        {makeBooleanArray(ability.value).map((item, index) => {
                                                            if (item) {
                                                                return (
                                                                    <div
                                                                        key={index}
                                                                        className="h-2 w-2 bg-black rounded-full"
                                                                    ></div>
                                                                );
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
                                </div>
                            </div>
                        </div>
                    );
                })}
        </>
    );
}

export default RoomsTheme;
