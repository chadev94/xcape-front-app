import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useMediaQuery } from "react-responsive";
import { useRecoilValue } from "recoil";
import { fetchMerchantThemeList, IMerchant } from "../api";
import { merchantsIndex } from "../atom";
import { Ability, Circle, Container, Content, Title, Cover, Genre, Image, Level, Participant, Room, Row } from "../components/styled/roomsStyled";
import { ReactComponent as starImg } from "../assets/icon/star.svg";
import Icon from "../assets/icon/index";
// import { BsStar, BsStarFill } from "react-icons/all";

function Rooms() {
    const merchantIndex = useRecoilValue(merchantsIndex);
    const { data, isLoading } = useQuery<IMerchant>(["allData", "themes"], () => fetchMerchantThemeList(merchantIndex), { staleTime: 5000, cacheTime: Infinity, refetchOnWindowFocus: false });
    console.log(data);
    const merchants = useRecoilValue(merchantsIndex);
    const isPortrait = useMediaQuery({ query: "(orientation: portrait)" });

    useEffect(() => {
        console.log(isPortrait);
    }, [isPortrait]);

    const starArray = (number: number): boolean[] => {
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
            {data?.result?.themeList.map((cur, index) => (
                <div key={index} className="border border-[#686868] rounded-sm p-2 md:p-3 my-3 xl:w-2/3 m-auto">
                    <div className="flex">
                        <img src={cur.mainImagePath} alt="mainImage" className="w-44 h-44 lg:w-52 lg:h-52 aspect-[3/4]" />
                        <div className="ml-2 sm:ml-3 w-full">
                            <div className="mb-1 md:mb-3 text-md md:text-3xl text-white">{cur.nameKo}</div>
                            <div className="mb-1 py-1 sm:mb-2 sm:py-2">
                                <span style={{ backgroundColor: cur.colorCode }} className="p-1 text-sm md:p-2 text-white">
                                    {cur.genre}
                                </span>
                            </div>
                            <div className="flex justify-between text-white mb-1 md:mb-2 items-center">
                                <div className="flex">
                                    {starArray(cur.difficulty).map((star) => {
                                        if (star) {
                                            return <Icon.Star style={{ color: cur.colorCode }} className="h-4 w-4 md:h-8 md:w-8" />;
                                        }
                                        return <Icon.Star className="text-zinc-600 h-4 w-4 md:h-8 md:w-8" />;
                                    })}
                                </div>
                                <div>
                                    <span className="text-sm md:text-md text-zinc-300/80">인원 </span>
                                    <span>
                                        {cur.minParticipantCount} - {cur.maxParticipantCount}
                                    </span>
                                    <span className="text-sm md:text-md text-zinc-300/80">명</span>
                                </div>
                            </div>
                            <div style={{ backgroundColor: cur.colorCode }} className="grid grid-cols-1 sm:grid-cols-2 text-white p-1 lg:p-2 whitespace-nowrap m-0">
                                {cur.abilityList.map((ability) => {
                                    return (
                                        <div className="text-xs sm:text-md lg:text-lg lg:text-xl flex" key={ability.codeId}>
                                            <div>{ability.name}</div>
                                            <div className="flex items-center justify-between">
                                                {starArray(ability.value).map((item) => {
                                                    if (item) {
                                                        return <div className="h-3 w-3 ml-2 md:ml-2 bg-white rounded-full"></div>;
                                                    }
                                                    return <div className="h-3 w-3 ml-2 md:ml-2 bg-black rounded-full"></div>;
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
