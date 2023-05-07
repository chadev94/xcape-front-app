import { useEffect, useRef } from "react";
import MainMenu from "../pages/MainMenu";
import Nav from "./Nav";
import { formatTimeString } from "../util/util";
import timerImage from "../assets/images/timer_bg.jpeg";

function Header() {
    const timeRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        let interval: NodeJS.Timer;
        let afterOneHour: Date = new Date(Date.parse(String(new Date())) + 60 * 60 * 1000);
        interval = setInterval(() => {
            const time = afterOneHour.getTime() - new Date().getTime();
            if (time <= 0) {
                afterOneHour = new Date(Date.parse(String(new Date())) + 60 * 60 * 1000);
            }
            if (timeRef.current) {
                timeRef.current.textContent = formatTimeString(time, true);
            }
        }, 10);
        return () => {
            clearInterval(interval);
        };
    }, []);

    //TODO: 지점 리스트 수정 필요

    return (
        <div>
            <Nav />
            <div className="relative">
                <span
                    ref={timeRef}
                    className="absolute -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 text-white text-4xl w-full text-center"
                >
                    00:00:00
                </span>
                <img src={timerImage} alt="timerImage" className="w-full mx-auto" />
            </div>
            <MainMenu />
        </div>
    );
}

export default Header;
