import { useEffect, useRef } from "react";
import { useMatch } from "react-router-dom";
import { useRecoilState, useSetRecoilState } from "recoil";
import { isMainAtom, merchantsIndex } from "../atom";
import MainMenu from "./MainMenu";
import Nav from "./Nav";
import BusinessIcon from "./BusinessIcon";
import { formatTimeString } from "../util/util.js";
import timerImage from "../assets/images/timer_bg.jpeg";

function Header() {
    const mainUrl = useMatch("/:merchant");
    const [isMain, setIsMain] = useRecoilState<boolean>(isMainAtom);
    const setMerchantIndex = useSetRecoilState<number>(merchantsIndex);
    const timeRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        // 각 지점별 메인 화면 아닐시 타이머 숨기기
        mainUrl ? setIsMain(true) : setIsMain(false);
    });

    const saveMerchantIndex = (index: number) => {
        setMerchantIndex(index);
    };

    let interval;
    useEffect(() => {
        const afterOneHour: Date = new Date(Date.parse(String(new Date())) + 60 * 60 * 1000);
        interval = setInterval(() => {
            const time = afterOneHour.getTime() - new Date().getTime();
            if (timeRef.current) timeRef.current.textContent = formatTimeString(time);
        }, 10);
        return () => {
            // @ts-ignore
            interval = clearInterval();
        };
    }, []);

    //TODO: 지점 리스트 수정 필요

    return (
        <div>
            <Nav />
            <BusinessIcon />
            {isMain ? (
                <div className="relative">
                    <span ref={timeRef} className="absolute -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 text-white text-4xl w-full text-center">
                        00:00:00
                    </span>
                    <img src={timerImage} alt="timerImage" className="w-full mx-auto" />
                </div>
            ) : // <AnimatePresence>
            // 	{/* 타이머 이미지 애니메이션 */}
            // 	<TimerImageCover key={1} initial={{ y: -30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.2 }}>
            // 		<TimerImage>
            // 			<Timer>00:00:00</Timer>
            // 		</TimerImage>
            // 	</TimerImageCover>
            // </AnimatePresence>
            null}
            <MainMenu />
        </div>
    );
}

export default Header;
