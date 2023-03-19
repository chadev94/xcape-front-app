import xcape from "../assets/images/xcape.jpeg";
import guide1 from "../assets/images/guide_1.png";
import guide2 from "../assets/images/guide_2.png";
import guide3 from "../assets/images/guide_3.png";
import ReactPlayer from "react-player";
import { useState } from "react";
import gundaeImage from "../assets/images/merchant/gundae.jpeg";
import {
    AccessWrapper,
    Acess,
    Address,
    Brand,
    BrandWrapper,
    Container,
    Guide,
    Image,
    ImgBox,
    Info,
    InfoWrapper,
    MerchantBox,
    Name,
    Nav,
    Underline,
    XcapeImage,
    YoutubeBox,
} from "./styled/xcapeStyled";

function Xcape() {
    const [menu, setMenu] = useState<String>("brand");
    const [imageHeight, setImageHeight] = useState<number>(0);
    const getHeight = ({ target }: any) => {
        setImageHeight(target.height);
        console.log(target.height * 0.7);
    };
    const toggleMenu = (action: String) => {
        setMenu(action);
    };
    const onBenefits = () => {
        console.log("예약혜택 바로가기");
    };
    return (
        <Container>
            <Nav>
                <Brand onClick={() => toggleMenu("brand")}>
                    브랜드소개
                    {menu === "brand" ? (
                        <Underline layoutId="underline" />
                    ) : null}
                </Brand>
                <Info onClick={() => toggleMenu("info")}>
                    이용안내
                    {menu === "info" ? (
                        <Underline layoutId="underline" />
                    ) : null}
                </Info>
                <Acess onClick={() => toggleMenu("access")}>
                    오시는 길
                    {menu === "access" ? (
                        <Underline layoutId="underline" />
                    ) : null}
                </Acess>
            </Nav>
            {menu === "brand" ? (
                <BrandWrapper>
                    <XcapeImage onLoad={getHeight} src={xcape} />
                    <YoutubeBox>
                        <ReactPlayer
                            url="https://www.youtube.com/watch?v=JlTa9cVywmA"
                            style={{
                                position: "absolute",
                                top: `${imageHeight * 0.055}%`,
                                width: "100%",
                                height: "100%",
                            }}
                            width={"100%"}
                            height={"80%"}
                        />
                    </YoutubeBox>
                </BrandWrapper>
            ) : menu === "info" ? (
                <InfoWrapper>
                    <Guide src={guide1}></Guide>
                    <Guide
                        cursor={"pointer"}
                        src={guide2}
                        onClick={onBenefits}
                    ></Guide>
                    <Guide src={guide3}></Guide>
                </InfoWrapper>
            ) : menu === "access" ? (
                <AccessWrapper>
                    <MerchantBox>
                        <ImgBox>
                            <Image src={gundaeImage} />
                        </ImgBox>
                        <Name>l 건대점</Name>
                        <Address>
                            서울특별시 광진구 화양동
                            <br />
                            50-2 지하1F (동일로 112) 유료주차 가능
                            <br />
                            건대입구역 1번 출구, 성수역 2번출구
                            <br />
                            02.463.9366
                            <br />
                            <strong>MON-SUN</strong> 10:00 - 24:00
                            <br />
                            MON-SUN
                        </Address>
                    </MerchantBox>
                </AccessWrapper>
            ) : null}
        </Container>
    );
}

export default Xcape;
