import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useMediaQuery } from "react-responsive";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { IMerchant, IMerchants, ITheme } from "../api";
import { allData, merchant, merchantsIndex, theme } from "../atom";
import Icon from "../assets/icon/index";
import { useNavigate } from "react-router-dom";

function Rooms() {
    const merchantIndex = useRecoilValue(merchantsIndex);
    const merchants = useRecoilValue(merchantsIndex);
    const isPortrait = useMediaQuery({ query: "(orientation: portrait)" });

    const navigate = useNavigate();
    const data = useRecoilValue(allData);
    const merchantList: IMerchants[] = data.result;
    const merchantsId = useRecoilValue(merchantsIndex);
    const currentMerchant = merchantList.find((merchant) => merchant.id === merchantsId);
    // @ts-ignore
    // TODO 사용법 알아놓기
    const setTheme = useSetRecoilState<any>(theme);

    useEffect(() => {}, [isPortrait]);

    const findThemeById = (id: number) => {
        return currentMerchant?.themeList.find((theme) => theme.id === id);
    };

    const makeBooleanArray = (number: number): boolean[] => {
        const array: boolean[] = [];
        for (let i = 0; i < number; i++) {
            array[i] = true;
        }
        for (let i = number; i < 5; i++) {
            array[i] = false;
        }
        return array;
    };

    return (
        <div>
            {currentMerchant?.themeList.map((cur, index) => (
                <div
                    key={index}
                    className="border border-[#686868] rounded-sm p-2 md:p-3 my-3 xl:w-2/3 m-auto cursor-pointer"
                    onClick={() => {
                        const theme = findThemeById(cur.id);
                        setTheme(theme);
                        navigate("/ku/theme-detail");
                    }}
                >
                    <div className="flex">
                        <div className="h-[190px] w-[190px]">
                            <img src={cur.mainImagePath} alt="mainImage" className="h-[190px] w-[190px]" />
                        </div>
                        <div className="ml-2 sm:ml-3 w-full flex flex-col justify-between">
                            <div className="text-md xs:text-xl md:text-3xl text-white">{cur.nameKo}</div>
                            <div className="py-1 sm:py-2">
                                <span style={{ backgroundColor: cur.colorCode }} className="p-1 text-sm xs:text-lg md:p-2 text-white">
                                    {cur.genre}
                                </span>
                            </div>
                            <div className="flex justify-between text-white items-center">
                                <div className="flex">
                                    {makeBooleanArray(cur.difficulty).map((star) => {
                                        if (star) {
                                            return <Icon.Star style={{ color: cur.colorCode }} className="h-6 w-6 xs:h-10 xs:w-10" />;
                                        }
                                        return <Icon.Star className="text-zinc-600 h-6 w-6 xs:h-10 xs:w-10" />;
                                    })}
                                </div>
                                <div>
                                    <span className="text-sm xs:text-2xl md:text-lg text-zinc-300/80">인원 </span>
                                    <span className="text-sm xs:text-2xl md:text-lg">
                                        {cur.minParticipantCount} - {cur.maxParticipantCount}
                                    </span>
                                    <span className="text-sm xs:text-2xl md:text-lg text-zinc-300/80">명</span>
                                </div>
                            </div>
                            <div style={{ backgroundColor: cur.colorCode }} className="grid grid-cols-1 xs:grid-cols-2 text-white p-1 lg:p-2 m-0">
                                {cur.abilityList.map((ability) => {
                                    return (
                                        <div className="text-md xs:text-md lg:text-lg lg:text-xl flex" key={ability.codeId}>
                                            <div>{ability.name}</div>
                                            <div className="flex items-center justify-between w-2/3 sm:w-1/2 ml-2">
                                                {makeBooleanArray(ability.value).map((item) => {
                                                    if (item) {
                                                        return <div className="h-4 w-4 sm:h-3 sm:w-3  bg-white rounded-full"></div>;
                                                    }
                                                    return <div className="h-4 w-4 sm:h-3 sm:w-3 bg-black rounded-full"></div>;
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
