import React from "react";
import { getBannersInfo, getMerchantsInfo, getThemesInfo, saveFile } from "../api";
import { useParams } from "react-router-dom";

function UpdateJsonInfo() {
    const { contents } = useParams<{ contents: string }>();

    const getFileList = () => {
        if (contents === "merchants") {
            getMerchantsInfo().then((res) => {
                saveFile(`src/data/merchantList.json`, res.result).then((res) => {
                    console.log(res);
                });
            });
        } else if (contents === "themes") {
            getThemesInfo().then((res) => {
                saveFile(`src/data/themeList.json`, res.result).then((res) => {
                    console.log(res);
                });
            });
        } else if (contents === "banners") {
            getBannersInfo().then((res) => {
                saveFile(`src/data/bannerList.json`, res.result).then((res) => {
                    console.log(res);
                });
            });
        }
    };

    return (
        <div>
            <button
                className="w-full px-2 py-1 border border-zinc-600 bg-zinc-900
            rounded-sm text-zinc-400 font-xl
            hover:text-zinc-100 hover:border-zinc-100"
                onClick={getFileList}
            >
                버튼
            </button>
        </div>
    );
}

export default UpdateJsonInfo;
