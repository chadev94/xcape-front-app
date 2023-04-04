import { useRecoilValue } from "recoil";
import { ITheme } from "../api";
import { themeList } from "../atom";
import Icon from "../assets/icon/index";
import { useNavigate, useParams } from "react-router-dom";
import { makeBooleanArray } from "../util/util";

function Rooms() {
    const navigate = useNavigate();
    const { merchantCode } = useParams<{ merchantCode: string }>();
    const currentThemeList: ITheme[] = useRecoilValue(themeList);

    return (
        <div>
            {currentThemeList &&
                currentThemeList.map((cur, index) => (
                    <div
                        key={index}
                        className="border border-zinc-500 rounded-sm p-2 md:p-3 my-3 xl:w-2/3 m-auto cursor-pointer"
                        onClick={() => {
                            navigate(`/${merchantCode}/theme-detail/${cur.id}`);
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
                                <div style={{ backgroundColor: cur.colorCode }} className="grid grid-cols-1 xs:grid-cols-2 p-1 lg:p-2 m-0">
                                    {cur.abilityList.map((ability) => {
                                        return (
                                            <div key={ability.id} className="text-md xs:text-md lg:text-lg lg:text-xl flex">
                                                <div className="text-white">{ability.name}</div>
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
