import xcape from "../assets/images/xcape.jpeg";
import guide1 from "../assets/images/guide_1.png";
import guide2 from "../assets/images/guide_2.png";
import guide3 from "../assets/images/guide_3.png";
import { useEffect, useRef, useState } from "react";
import kuImage from "../assets/images/merchant/gundae.jpeg";
import Underline from "./Underline";
import { useRecoilValue } from "recoil";
import { themeList } from "../atom";
import { IMerchant, ITheme } from "../api";

function Xcape() {
    const [activeTabIndex, setActiveTabIndex] = useState<number>(0);
    const [tabUnderlineWidth, setTabUnderlineWidth] = useState<number>(0);
    const [tabUnderlineLeft, setTabUnderlineLeft] = useState<number>(0);

    const merchantListJson: IMerchant[] = require("../data/merchantList.json");

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
                </div>
            ) : activeTabIndex === 1 ? (
                <div>
                    <img src={guide1} alt="guide1"></img>
                    <img className="cursor-pointer" src={guide2} onClick={onBenefits} alt="guide2"></img>
                    <img src={guide3} alt="guide3"></img>
                </div>
            ) : activeTabIndex === 2 ? (
                <div className="bg-[#282828] px-8 pb-8">
                    {merchantListJson.map((merchant) => {
                        return (
                            <div className="pt-8" key={merchant.id}>
                                <img className="w-full aspect-auto" src={kuImage} alt="kuImage" />
                                <span className="text-white text-2xl">| {merchant.name}</span>
                                <div className="text-white text-sm">
                                    <div className="whitespace-pre-wrap">{merchant.address}</div>
                                    <div>{merchant.telNumber}</div>
                                    <strong>MON-SUN</strong>
                                    &nbsp;
                                    <span>{merchant.businessHour}</span>
                                </div>
                            </div>
                        );
                    })}
                </div>
            ) : null}
        </div>
    );
}

export default Xcape;
