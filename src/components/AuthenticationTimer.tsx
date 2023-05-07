import React, { useEffect, useRef, useState } from "react";
import { formatTimeString } from "../util/util";

function AuthenticationTimer() {
    const MINUTES_IN_MS = 60 * 3 * 1000;
    const INTERVAL = 1000;

    const timeRef = useRef<HTMLDivElement>(null);
    const [time, setTime] = useState<number>(MINUTES_IN_MS);

    useEffect(() => {
        timeRef.current!.textContent = formatTimeString(time, false);

        const timer = setInterval(() => {
            setTime((prevTime) => prevTime - INTERVAL);
        }, INTERVAL);

        if (time <= 0) {
            clearInterval(timer);
            alert("인증시간이 초과되었습니다.");
            window.location.reload();
        }

        return () => {
            clearInterval(timer);
        };
    }, [time]);

    return <div ref={timeRef}></div>;
}

export default AuthenticationTimer;
