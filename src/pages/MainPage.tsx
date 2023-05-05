import React from "react";
import CautionLine from "../components/CautionLine";

function MainPage() {
    const xcapeLogo = require("../assets/images/merchant/logo/xcape_logo.png");

    return (
        <div className="bg-[url('./assets/images/bg_iron.png')]">
            <CautionLine />
            <div className="text-center pt-4">
                <div className="text-2xl text-[#f5ef42] font-weight-700 mt-[60px] mb-3">상단에서 지점을 골라주세요!</div>
                <img src={xcapeLogo} alt="xfilerImage" className="w-3/4 mx-auto mt-10" />
                <div className="mx-auto mb-20">
                    <iframe
                        className="w-full aspect-video"
                        src="https://www.youtube.com/embed/lTRs8EiuONE?autoplay=1"
                        title="YouTube video player"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen
                    ></iframe>
                </div>
            </div>
            <CautionLine />
        </div>
    );
}

export default MainPage;
