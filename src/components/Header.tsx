import { useEffect, useRef } from "react";
import MainMenu from "./MainMenu";
import Nav from "./Nav";
import BusinessIcon from "./BusinessIcon";
import { formatTimeString } from "../util/util";
import timerImage from "../assets/images/timer_bg.jpeg";

function Header() {
    const timeRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        let interval;
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
            {/*<BusinessIcon />*/}
            <div className="relative">
                <span ref={timeRef} className="absolute -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 text-white text-4xl w-full text-center">
                    00:00:00
                </span>
                <img src={timerImage} alt="timerImage" className="w-full mx-auto" />
            </div>
            <MainMenu />
        </div>
    );
}

export default Header;
