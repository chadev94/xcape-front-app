import React from "react";
import { useRecoilValue } from "recoil";
import { theme } from "../atom";

function ThemeDetail() {
    const currentTheme = useRecoilValue(theme);
    return <div>{<img src={currentTheme.bgImagePath} alt="bgImagePath" />}</div>;
}

export default ThemeDetail;
