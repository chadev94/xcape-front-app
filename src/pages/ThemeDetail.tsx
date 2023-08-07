import React, { useEffect, useState } from "react";
import { makeBooleanArray } from "../util/util";
import Icon from "../assets/icons";
import { IAbility, ITheme } from "../api";
import { useNavigate, useParams } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { themeList } from "../atom";

function ThemeDetail() {
    const navigate = useNavigate();
    const { merchantCode, themeId } = useParams<{ merchantCode: string; themeId: string }>();

    const currentThemeList = useRecoilValue<ITheme[]>(themeList);
    const [currentTheme, setCurrentTheme] = useState<ITheme>();

    const abilityList: IAbility[] = require("../data/abilityList.json");
    const abilityListByThemeId = abilityList.filter((ability) => ability.themeId === Number(themeId));

    useEffect(() => {
        const currentTheme = currentThemeList.find((theme) => theme.id === Number(themeId));
        console.log(currentThemeList);
        console.log(currentTheme);
        setCurrentTheme(currentTheme);
    }, [themeId]);

    return (
        <div>
            {currentTheme && (
                <>
                    <img src={currentTheme.bgImagePath} alt="bgImagePath" className="w-full" />
                    {currentTheme.youtubeLink != "" ? (
                        <div>
                            <iframe
                                className="w-full aspect-video"
                                src={currentTheme.youtubeLink}
                                title="YouTube video player"
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                allowFullScreen
                            ></iframe>
                        </div>
                    ) : null}
                    {/*<div className="flex flex-col items-center justify-center bg-no-repeat bg-cover p-10 w-full" style={{ backgroundImage: `url(${book})` }}>*/}
                    <div className="flex flex-col items-center drop-shadow-lg justify-center p-4 w-full bg-[url('./assets/images/bg_iron.png')]">
                        <div
                            className="px-10 text-white drop-shadow-lg"
                            style={{ backgroundColor: currentTheme.colorCode }}
                        >
                            {currentTheme.genre}
                        </div>
                        <div className="text-5xl mt-5 drop-shadow-lg" style={{ color: currentTheme.colorCode }}>
                            {currentTheme.nameKo}
                        </div>
                        <div className="text-xl text-zinc-300 drop-shadow-lg">{currentTheme.nameEn}</div>
                        <div className="w-full mt-8 py-5 text-center text-white whitespace-pre-wrap drop-shadow-md">
                            {currentTheme.description}
                        </div>
                        <div className="w-full flex justify-between items-center">
                            <div className="flex justify-between items-center drop-shadow-md">
                                <div className="text-xl" style={{ color: currentTheme.colorCode }}>
                                    난이도
                                </div>
                                {makeBooleanArray(currentTheme.difficulty).map((star, index) => {
                                    if (star) {
                                        return (
                                            <Icon.Star
                                                key={index}
                                                style={{ color: currentTheme.colorCode }}
                                                className="h-8 w-8"
                                            />
                                        );
                                    }
                                    return <Icon.Star key={index} className="text-zinc-400 h-8 w-8" />;
                                })}
                            </div>
                            <div className="text-white">
                                인원{" "}
                                <span>
                                    {currentTheme.minParticipantCount}-{currentTheme.maxParticipantCount}
                                </span>
                            </div>
                        </div>
                        <div
                            className="grid grid-cols-2 p-3 w-full mb-3 drop-shadow-lg"
                            style={{ backgroundColor: currentTheme.colorCode }}
                        >
                            {abilityListByThemeId.map((ability) => {
                                return (
                                    <div key={ability.id} className="flex">
                                        <div className="text-xs items-center">{ability.name}</div>
                                        <div className="flex items-center justify-between w-3/5 mx-2">
                                            {makeBooleanArray(ability.value).map((item, index) => {
                                                if (item) {
                                                    return (
                                                        <div
                                                            key={index}
                                                            className="h-3 w-3 bg-black rounded-full"
                                                        ></div>
                                                    );
                                                }
                                                return (
                                                    <div
                                                        key={index}
                                                        className="h-3 w-3 border border-black bg-transparent rounded-full"
                                                    ></div>
                                                );
                                            })}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                        <div className="text-white p-4 border border-white mb-3 drop-shadow-lg">
                            POINT <span className="text-lg">|</span> {currentTheme.point}
                        </div>
                        <div
                            onClick={() => {
                                navigate(`/${merchantCode}/reservation`);
                            }}
                            className="drop-shadow-lg"
                        >
                            <button
                                type="button"
                                className="w-full px-10 py-5 border border-zinc-600 rounded-md text-xl text-white font-xl hover:text-zinc-200 hover:border-zinc-400"
                                style={{ backgroundColor: currentTheme.colorCode }}
                            >
                                실시간 예약하기
                            </button>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}

export default ThemeDetail;
