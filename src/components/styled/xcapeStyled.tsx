import { motion } from "framer-motion";
import styled from "styled-components";
import gundaeImage from "../assets/images/merchant/gundae.jpeg";

export const Container = styled.div`
    color: red;
    font-size: 25px;
`;
export const Nav = styled.nav`
    display: flex;
    margin-top: 10px;
`;
export const Underline = styled(motion.div)`
    border-bottom: 1px solid;
    border-color: white;
    vertical-align: bottom;
    height: 1vh;
`;
export const Brand = styled.div`
    width: 100%;
    text-align: center;
    font-size: 0.6em;
    color: whitesmoke;
    cursor: pointer;
`;
export const Info = styled.div`
    width: 100%;
    text-align: center;
    font-size: 0.6em;
    color: whitesmoke;
    cursor: pointer;
`;
export const Acess = styled.div`
    width: 100%;
    text-align: center;
    font-size: 0.6em;
    color: whitesmoke;
    cursor: pointer;
`;
export const Guide = styled.img<{ cursor?: string }>`
    width: 100%;
    cursor: ${(props) => props.cursor};
`;
export const BrandWrapper = styled.div`
    position: relative;
    width: 100%;
    height: auto;
    padding-top: 50%;
`;
export const InfoWrapper = styled.div`
    position: relative;
    width: 100%;
    height: auto;
`;
export const XcapeImage = styled.img`
    position: absolute;
    top: 0;
    width: 100%;
`;
export const YoutubeBox = styled.div`
    margin: 0 5vw;
    padding-top: 56.25%;
    position: relative;
`;
export const AccessWrapper = styled.div`
    padding: 5% 3%;
`;
export const MerchantBox = styled.div`
    width: 100%;
    background-color: #282828;
`;
export const ImgBox = styled.div`
    display: flex;
    justify-content: center;
`;
export const Image = styled.img`
    margin: 5%;
    width: 93%;
    height: 93%;
`;
export const Name = styled.div`
    margin-left: 3%;
    margin-bottom: 3%;
    font-size: 1em;
    color: #ffffff;
`;
export const Address = styled.div`
    margin-left: 3%;
    font-size: 0.7em;
    line-height: 1.4em;
    color: #ffffff;
`;
