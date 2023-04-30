import xcape from "../assets/images/xcape.jpeg";
import { useEffect, useRef, useState } from "react";
import Underline from "../components/Underline";
import { useRecoilValue } from "recoil";
import { merchant } from "../atom";
import NotionView from "../components/NotionView";

function Xcape() {
    const [activeTabIndex, setActiveTabIndex] = useState<number>(0);
    const [tabUnderlineWidth, setTabUnderlineWidth] = useState<number>(0);
    const [tabUnderlineLeft, setTabUnderlineLeft] = useState<number>(0);
    const currentMerchant = useRecoilValue(merchant);

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

    return (
        <div>
            <div className="relative flex text-md lg:text-2xl justify-around text-white py-2 items-center">
                <div
                    className="cursor-pointer"
                    ref={(el) => (tabsRef.current[0] = el)}
                    onClick={() => setActiveTabIndex(0)}
                >
                    브랜드소개
                </div>
                <div
                    className="cursor-pointer"
                    ref={(el) => (tabsRef.current[1] = el)}
                    onClick={() => setActiveTabIndex(1)}
                >
                    이용안내
                </div>
                <div
                    className="cursor-pointer"
                    ref={(el) => (tabsRef.current[2] = el)}
                    onClick={() => setActiveTabIndex(2)}
                >
                    오시는 길
                </div>
                <Underline tabUnderlineLeft={tabUnderlineLeft} tabUnderlineWidth={tabUnderlineWidth} />
            </div>
            {activeTabIndex === 0 ? (
                <div className="relative">
                    <NotionView pageId={currentMerchant.brandInfoNotionId} />
                </div>
            ) : activeTabIndex === 1 ? (
                <div>
                    <NotionView pageId={currentMerchant.usingInfoNotionId} />
                </div>
            ) : activeTabIndex === 2 ? (
                <div>
                    <NotionView pageId={currentMerchant.addressNotionId} />
                </div>
            ) : null}
        </div>
    );
}

export default Xcape;
