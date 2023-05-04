import React, { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { bannerList } from "../atom";
import { IBanner } from "../api";
import { BLOCK_TYPE } from "../util/constant";

function BlockBanners() {
    const currentBannerList = useRecoilValue(bannerList);
    const [blockBannerList, setBlockBannerList] = useState<IBanner[]>();

    useEffect(() => {
        const currentBlockBannerList = currentBannerList.filter((banner) => {
            return banner.type === BLOCK_TYPE;
        });
        currentBlockBannerList.sort((prev, next) => {
            return prev.sequence! - next.sequence!;
        });

        setBlockBannerList(currentBlockBannerList);
    }, [currentBannerList]);
    return (
        <div>
            {blockBannerList &&
                blockBannerList.map((banner) => {
                    return (
                        <div key={banner.id} className="w-full">
                            <img src={banner.imagePath} alt="bannerImage" className="w-full h-full object-contain" />
                        </div>
                    );
                })}
        </div>
    );
}

export default BlockBanners;
