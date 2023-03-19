import xcape from "../assets/images/xcape.jpeg";
import guide1 from "../assets/images/guide_1.png";
import guide2 from "../assets/images/guide_2.png";
import guide3 from "../assets/images/guide_3.png";
import ReactPlayer from "react-player";
import { useState } from "react";
import kuImage from "../assets/images/merchant/gundae.jpeg";
import {
    AccessWrapper,
    Acess,
    Address,
    Brand,
    BrandWrapper,
    Container,
    Guide,
    Image,
    ImgBox,
    Info,
    InfoWrapper,
    MerchantBox,
    Name,
    Nav,
    Underline,
    XcapeImage,
    YoutubeBox,
} from "./styled/xcapeStyled";

function Xcape() {
    const [menu, setMenu] = useState<String>("brand");
    const toggleMenu = (action: String) => {
        setMenu(action);
    };
    const onBenefits = () => {
        console.log("예약혜택 바로가기");
    };
    return (
        <div>
            <div className="flex text-md lg:text-2xl justify-around text-white py-2 items-center">
                <div className="cursor-pointer" onClick={() => toggleMenu("brand")}>
                    브랜드소개
                    {menu === "brand" ? <Underline layoutId="underline" /> : null}
                </div>
                <div className="cursor-pointer" onClick={() => toggleMenu("info")}>
                    이용안내
                    {menu === "info" ? <Underline layoutId="underline" /> : null}
                </div>
                <div className="cursor-pointer" onClick={() => toggleMenu("access")}>
                    오시는 길{menu === "access" ? <Underline layoutId="underline" /> : null}
                </div>
            </div>
            {menu === "brand" ? (
                <div className="relative">
                    <img className="w-full" src={xcape} alt="xcapeDescription" />
                    <div className="absolute top-[32.6%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-full">
                        <iframe
                            className="w-full aspect-video"
                            src="https://www.youtube.com/embed/JlTa9cVywmA"
                            title="YouTube video player"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            allowFullScreen
                        ></iframe>
                    </div>
                </div>
            ) : menu === "info" ? (
                <div>
                    <img src={guide1} alt="guide1"></img>
                    <img className="cursor-pointer" src={guide2} onClick={onBenefits} alt="guide2"></img>
                    <img src={guide3} alt="guide3"></img>
                </div>
            ) : menu === "access" ? (
                <div className="bg-[#282828] px-8 pb-8">
                    <div className="pt-8">
                        <img className="w-full aspect-auto" src={kuImage} alt="kuImage" />
                        <span className="text-white text-2xl">| 건대점</span>
                        <div className="text-white text-sm">
                            서울특별시 광진구 화양동
                            <br />
                            50-2 지하1F (동일로 112) 유료주차 가능
                            <br />
                            건대입구역 1번 출구, 성수역 2번출구
                            <br />
                            02.463.9366
                            <br />
                            <strong>MON-SUN</strong> 10:00 - 24:00
                            <br />
                        </div>
                    </div>
                    <div className="pt-8">
                        <img className="w-full aspect-auto" src={kuImage} alt="kuImage" />
                        <span className="text-white text-2xl">| 건대점</span>
                        <div className="text-white text-sm">
                            서울특별시 광진구 화양동
                            <br />
                            50-2 지하1F (동일로 112) 유료주차 가능
                            <br />
                            건대입구역 1번 출구, 성수역 2번출구
                            <br />
                            02.463.9366
                            <br />
                            <strong>MON-SUN</strong> 10:00 - 24:00
                            <br />
                        </div>
                    </div>
                </div>
            ) : null}
        </div>
    );
}

export default Xcape;
