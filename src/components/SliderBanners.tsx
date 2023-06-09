import React, { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { bannerList } from "../atom";
import { SLIDER_TYPE } from "../util/constant";
import { IBanner } from "../api";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function SliderBanners() {
    const currentBannerList = useRecoilValue(bannerList);
    const [sliderBannerList, setSliderBannerList] = useState<IBanner[]>();
    const carouselSettings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        arrows: false,
        autoplaySpeed: 3000,
    };

    useEffect(() => {
        const currentSliderBannerList = currentBannerList.filter((banner) => {
            return banner.type === SLIDER_TYPE;
        });

        currentSliderBannerList.sort((prev, next) => {
            return prev.sequence! - next.sequence!;
        });

        setSliderBannerList(currentSliderBannerList);
    }, [currentBannerList]);
    return (
        <Slider {...carouselSettings}>
            {sliderBannerList &&
                sliderBannerList.map((banner) => {
                    return (
                        <div key={banner.id} className="w-full slider-wrapper">
                            <img src={banner.imagePath} alt="bannerImage" className="w-full h-full object-contain" />
                        </div>
                    );
                })}
        </Slider>
    );
}

export default SliderBanners;
