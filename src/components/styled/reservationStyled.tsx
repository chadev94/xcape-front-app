import { motion } from "framer-motion";
import styled from "styled-components";

export const ReservationWrapper = styled.div`
    border: 1px solid #363636;
    border-radius: 3px;
    background-color: #282828;
`;
export const ReservationMenuBar = styled.div`
    display: flex;
    margin-top: 10px;
`;
export const ReservationMenu = styled.div<{ fontColor: string }>`
    width: 100%;
    height: 4vh;
    text-align: center;
    font-size: 1em;
    color: whitesmoke;
    color: ${(props) => props.fontColor};
`;
export const BgImage = styled.div`
    padding: 3%;
    background-size: 100% 100%;
`;
export const DateForm = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 20px;
    margin-bottom: 3vh;
`;
export const DateEn = styled.div`
    font-size: 1.2em;
    font-weight: 700;
`;
export const DateKr = styled.div`
    font-size: 0.8em;
    font-weight: 500;
`;
export const Possible = styled.div`
    display: flex;
    justify-content: right;
    width: 100%;
    color: red;
`;
export const Available = styled.div<{ color: string; marginRight?: string }>`
    margin-left: 7px;
    margin-right: ${(props) => props.marginRight};
    color: ${(props) => props.color};
`;

export const ThemeList = styled.div`
    margin: 2vw;
    padding: 2%;
`;
export const Theme = styled.div`
    height: 100%;
    margin-bottom: 10%;
    padding: 3%;
    border: solid 1px;
    border-radius: 2%;
    border-color: #686868;
`;
export const ThemeTitle = styled.div`
    display: flex;
`;
export const TitleKr = styled.div`
    font-size: 1.5rem;
    font-weight: bold;
    margin-right: 1.6vw;
    color: #ffffff;
`;
export const TitleEn = styled.div`
    margin: auto 0px;
    font-size: 1rem;
    color: #ffffff;
`;
export const Condition = styled.div`
    display: flex;
    margin-top: 1vh;
`;
export const ThemeImgWrapper = styled.div``;
export const ThemeImg = styled.img`
    width: 100%;
    border: 0;
    vertical-align: middle;
`;
export const Timetable = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    margin-top: 0.3vh;
`;
export const Time = styled.div`
    font-size: 1.3em;
    margin-bottom: 3%;
`;
export const ReservationCheck = styled.div`
    font-size: 0.8em;
`;
export const Difficulty = styled.div`
    margin: auto 0;
    margin-right: 1vw;
    color: #ffffff;
`;
export const Star = styled.div`
    margin: auto 0;
    margin-right: 1vw;
    font-size: 1.7em;
`;
export const Personnel = styled.div`
    margin: auto 0;
    color: #ffffff;
`;
export const Confirm = styled.div`
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    margin: 40px;
    font: inherit;
    color: #ffffff;
`;
export const Title = styled.div`
    color: #fff;
    text-align: center;
    font-weight: 500;
    line-height: 150%;
    font-size: 1.6em;
`;
export const SubTitle = styled.div`
    font-size: 0.8em;
    text-align: center;
    margin-top: 5px;
    padding-bottom: 30px;
`;
export const InputForm = styled.div`
    display: flex;
    padding: 15px 0;
    margin-bottom: 40px;
    border-top: 1px solid #888888;
    border-bottom: 1px solid #888888;
`;
export const Phone = styled.div`
    width: 20%;
    color: #aaaaaa;
    margin-left: 5px;
    margin-right: 10px;
    text-align: center;
`;
export const EngPhone = styled.div`
    /* font-size: 15.6px; */
    font-size: 0.9em;
    font-weight: 700;
`;
export const KrPhone = styled.div`
    /* font-size: 13px; */
    font-size: 0.7em;
    font-weight: 500;
`;
export const Input = styled.input`
    width: 100%;
    height: 34px;
    padding: 7px;
    background-color: #383838;
    color: #ffffff;
    border: 0;
`;
export const Button = styled.div`
    text-align: center;
    padding: auto;
    background-color: #92c78c;
    font-weight: 500;
    color: #fff;
    border: 1px solid #92c78c;
    width: 55%;
    padding: 12px 35px 12px 35px;
    line-height: 20px;
    text-decoration: none;
    font-size: 1.5em;
    vertical-align: middle;
    top: 0;
    left: 0;
    margin: auto;
    margin-bottom: 20px;
    cursor: pointer;
`;
export const Underline = styled(motion.div)`
    border-bottom: 1px solid;
    border-color: white;
    vertical-align: bottom;
    height: 1vh;
`;
export const Overlay = styled(motion.div)`
    position: fixed;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    opacity: 0;
`;
export const FormWrapper = styled(motion.div)<{ isPortrait: Boolean }>`
    position: fixed;
    width: ${(props) => (props.isPortrait ? "85%" : "30%")};
    height: ${(props) => (props.isPortrait ? "60%" : "70%")};
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
    padding: ${(props) => (props.isPortrait ? "10% 3%" : "2% 3%")};
    border-radius: 15px;
    overflow: hidden;
    background-color: #4a4a4a;
`;
export const Form = styled(motion.form)``;
export const Row = styled.div<{ notice?: Boolean }>`
    display: flex;
    margin-bottom: ${(props) => (props.notice ? "2%" : "3%")};
    font-size: ${(props) => (props.notice ? "0.7em" : null)};
    color: ${(props) => (props.notice ? "rgb(134, 229, 127)" : null)};
`;
export const TitleWrapper = styled.div<{
    isPortrait: Boolean;
    center?: Boolean;
}>`
    width: 20%;
    justify-content: center;
    align-items: center;
    margin: ${(props) => (props.center ? "auto" : null)};
`;
export const FormEnTitle = styled.div`
    font-size: 0.7em;
    text-align: center;
    color: #ffffff;
`;
export const FormKrTitle = styled.div`
    font-size: 0.5em;
    text-align: center;
    color: #ffffff;
`;
export const SelectDate = styled.input`
    margin: auto 0;
    width: 50%;
    height: 30%;
    color: #ffffff;
`;
export const SelectTime = styled.input`
    margin: auto 0;
    width: 50%;
    height: 30%;
    color: #ffffff;
`;
export const SelectTheme = styled.input`
    width: 50%;
    height: 30%;
    background-color: beige;
`;
export const UserName = styled.input`
    width: 50%;
    height: 50%;
    background-color: aquamarine;
`;
export const UserPhone = styled.input`
    width: 50%;
    height: 30%;
    background-color: aqua;
`;
export const Person = styled.div`
    width: 50%;
    height: 30%;
    background-color: antiquewhite;
`;
export const Select = styled.select`
    width: 30%;
    height: 30%;
`;
export const CheckBoxRow = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`;
export const CheckBox = styled.input``;
export const Privacy = styled.div`
    padding: auto;
    font-size: 0.8em;
    color: #ffffff;
`;
export const Accept = styled.button`
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 5% auto;
    width: 40%;
    height: 10%;
    color: #ffffff;
    background-color: #92c78c;
`;
export const TimeWrapper = styled.div<{
    marginLeft: boolean;
    isReserve: boolean;
}>`
    margin-left: ${(props) => (props.marginLeft ? "0px" : "5px")};
    margin-top: 0.5vh;
    padding: 7%;
    background-color: #1b1b1b;
    color: ${(props) => (props.isReserve ? "#434343" : "#00ea6f")};
    text-align: center;
    border-radius: 0.3rem;
`;

// Detail Style
export const DetailWrapper = styled.div`
    margin: 3rem 3rem;
    color: #ffffff;
`;
export const RowWrapper = styled.div`
    display: flex;
    margin-bottom: 1rem;
    font-size: 1rem;
`;
export const DetailTitle = styled.div`
    width: 5rem;
    margin-right: 2rem;
    text-align: center;
    color: #ffffff;
`;
export const DetailContent = styled.div`
    text-align: left;
`;
export const DetailNoticeWrapper = styled.div`
    display: flex;
`;
export const DetailHr = styled.hr``;
export const DetailNotice = styled.div`
    margin-top: 3rem;
    margin-bottom: 2rem;
    text-align: center;
`;
export const DetailCircle = styled.div`
    width: 0.7rem;
    height: 0.4rem;
    margin-top: 0.1rem;
    border-radius: 1rem;
    background-color: aliceblue;
`;
export const NoticeContent = styled.div`
    display: flex;
    margin-bottom: 1rem;
    font-size: 0.8rem;
`;
