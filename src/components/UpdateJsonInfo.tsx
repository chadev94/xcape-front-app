import React from "react";
import {getMerchantsInfo, saveFile} from "../api";

function UpdateJsonInfo() {

    const getFileList = () => {
        getMerchantsInfo().then(res => {
            saveFile("src/data/merchantList.json", res.result).then(res => {
                console.log(res);
            });
        });
    }

    return (
        <div>
            <button className="w-full px-2 py-1 border border-zinc-600 bg-zinc-900
            rounded-sm text-zinc-400 font-xl
            hover:text-zinc-100 hover:border-zinc-100" onClick={getFileList}>
                버튼
            </button>
        </div>
    );
}

export default UpdateJsonInfo;
