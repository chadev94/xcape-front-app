import xcape from "../assets/images/xcape.jpeg";
import guide1 from "../assets/images/guide_1.png";
import guide2 from "../assets/images/guide_2.png";
import guide3 from "../assets/images/guide_3.png";
import { useEffect, useRef, useState } from "react";
import kuImage from "../assets/images/merchant/gundae.jpeg";
import Underline from "./Underline";

function Xcape() {
    const [activeTabIndex, setActiveTabIndex] = useState<number>(0);
    const [tabUnderlineWidth, setTabUnderlineWidth] = useState<number>(0);
    const [tabUnderlineLeft, setTabUnderlineLeft] = useState<number>(0);

    const tabsRef = useRef<any>([]);

    useEffect(() => {
        const setTabPosition = () => {
            const currentTab = tabsRef.current[activeTabIndex];
            setTabUnderlineLeft(currentTab?.offsetLeft ?? 0);
            setTabUnderlineWidth(currentTab?.clientWidth ?? 0);
        };
        setTabPosition();
        window.addEventListener("resize", setTabPosition);

        return () => window.removeEventListener("resize", setTabPosition);
    }, [activeTabIndex]);

    const onBenefits = () => {
        // console.log("예약혜택 바로가기");
    };

    return (
        <div>
            <div className="relative flex text-md lg:text-2xl justify-around text-white py-2 items-center">
                <div className="cursor-pointer" ref={(el) => (tabsRef.current[0] = el)} onClick={() => setActiveTabIndex(0)}>
                    브랜드소개
                </div>
                <div className="cursor-pointer" ref={(el) => (tabsRef.current[1] = el)} onClick={() => setActiveTabIndex(1)}>
                    이용안내
                </div>
                <div className="cursor-pointer" ref={(el) => (tabsRef.current[2] = el)} onClick={() => setActiveTabIndex(2)}>
                    오시는 길
                </div>
                <Underline tabUnderlineLeft={tabUnderlineLeft} tabUnderlineWidth={tabUnderlineWidth} />
            </div>
            {activeTabIndex === 0 ? (
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
            ) : activeTabIndex === 1 ? (
                <div>
                    <img src={guide1} alt="guide1"></img>
                    <img className="cursor-pointer" src={guide2} onClick={onBenefits} alt="guide2"></img>
                    <img src={guide3} alt="guide3"></img>
                </div>
            ) : activeTabIndex === 2 ? (
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
