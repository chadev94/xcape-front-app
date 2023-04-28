import React from "react";
import cautionLine from "../assets/images/caution_line.jpeg";
function CautionLine() {
    return (
        <div
            style={{
                backgroundImage: `url(${cautionLine})`,
                backgroundRepeat: "repeat",
                backgroundPosition: "0 0",
                height: "10px",
                animation: "moveX 1s linear infinite",
            }}
        ></div>
    );
}

export default CautionLine;
