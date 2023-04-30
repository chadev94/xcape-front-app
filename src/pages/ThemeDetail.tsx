import React, { useEffect, useState } from "react";
import { makeBooleanArray } from "../util/util";
import Icon from "../assets/icons";
import { getThemeDetail, ITheme } from "../api";
import { useNavigate, useParams } from "react-router-dom";

function ThemeDetail() {
    const navigate = useNavigate();
    const { merchantCode } = useParams<{ merchantCode: string }>();
    const [currentTheme, setCurrentTheme] = useState<ITheme>();
    const { themeId } = useParams<{ themeId: string }>();

    useEffect(() => {
        getThemeDetail(Number(themeId)).then((res) => {
            setCurrentTheme(res.result);
        });
    }, [themeId]);

    return (
        <div>
            {currentTheme && (
                <>
                    <img src={currentTheme.bgImagePath} alt="bgImagePath" className="w-full" />
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
                    {/*<div className="flex flex-col items-center justify-center bg-no-repeat bg-cover p-10 w-full" style={{ backgroundImage: `url(${book})` }}>*/}
                    <div className="flex flex-col items-center justify-center p-10 w-full">
                        <div className="px-10 text-white" style={{ backgroundColor: currentTheme.colorCode }}>
                            {currentTheme.genre}
                        </div>
                        <div className="text-5xl mt-5" style={{ color: currentTheme.colorCode }}>
                            {currentTheme.nameKo}
                        </div>
                        <div className="text-xl text-zinc-500">{currentTheme.nameEn}</div>
                        <div className="w-full mt-8 py-5 text-center text-white whitespace-pre-wrap">
                            {currentTheme.description}
                        </div>
                        <div className="w-full lg:w-4/5 flex justify-between items-center">
                            <div className="flex">
                                <div className="text-2xl" style={{ color: currentTheme.colorCode }}>
                                    난이도
                                </div>
                                {makeBooleanArray(currentTheme.difficulty).map((star, index) => {
                                    if (star) {
                                        return (
                                            <Icon.Star
                                                key={index}
                                                style={{ color: currentTheme.colorCode }}
                                                className="h-8 w-8 xs:h-10 xs:w-10"
                                            />
                                        );
                                    }
                                    return <Icon.Star key={index} className="text-zinc-600 h-8 w-8 xs:h-10 xs:w-10" />;
                                })}
                            </div>
                            <div className="text-md lg:text-2xl text-white">
                                인원{" "}
                                <span>
                                    {currentTheme.minParticipantCount}-{currentTheme.maxParticipantCount}
                                </span>
                            </div>
                        </div>
                        <div
                            className="grid grid-cols-2 p-3 w-full lg:w-4/5 mb-3"
                            style={{ backgroundColor: currentTheme.colorCode }}
                        >
                            {currentTheme.abilityList.map((ability) => {
                                return (
                                    <div key={ability.id} className="text-xs md:text-base lg:text-lg lg:text-xl flex">
                                        <div className="text-white">{ability.name}</div>
                                        <div className="flex items-center justify-between w-2/3 sm:w-1/2 ml-2">
                                            {makeBooleanArray(ability.value).map((item, index) => {
                                                if (item) {
                                                    return (
                                                        <div
                                                            key={index}
                                                            className="h-3 w-3 lg:h-4 lg:w-4 bg-black rounded-full"
                                                        ></div>
                                                    );
                                                }
                                                return (
                                                    <div
                                                        key={index}
                                                        className="h-3 w-3 lg:h-4 lg:w-4 bg-white rounded-full"
                                                    ></div>
                                                );
                                            })}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                        <div className="text-white p-4 text-md lg:text-2xl border border-white mb-3">
                            POINT <span className="text-lg lg:text-3xl">|</span> {currentTheme.point}
                        </div>
                        <div
                            onClick={() => {
                                navigate(`/${merchantCode}/reservation`);
                            }}
                        >
                            <button
                                type="button"
                                className="w-full px-10 py-5 border border-zinc-600 rounded-md text-zinc-200 font-xl hover:text-zinc-100 hover:border-zinc-100"
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
