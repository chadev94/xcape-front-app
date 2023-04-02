import React, { useEffect, useState } from "react";
import { createGlobalStyle } from "styled-components";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ko } from "date-fns/locale";
import {
    Available,
    BgImage,
    Button,
    Confirm,
    DateEn,
    DateForm,
    DateKr,
    EngPhone,
    Input,
    InputForm,
    KrPhone,
    Phone,
    Possible,
    ReservationMenu,
    ReservationMenuBar,
    ReservationWrapper,
    SubTitle,
    ThemeList,
    Title,
    Underline,
} from "./styled/reservationStyled";
import { useMatch, useNavigate } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { fetchReservation, IMerchants, IReservationTheme } from "../api";
import { useRecoilValue } from "recoil";
import { allData, merchantsIndex } from "../atom";
import ReservationModal from "./ReservationModal";
import { makeBooleanArray } from "../util/util";
import Detail from "./Detail";
import Icon from "../assets/icon";
import { useQuery } from "@tanstack/react-query";

const DatePickerWrapperStyles = createGlobalStyle` 
    .date_picker.full-width {
        width: 150px;
    }
`;

export interface IFormData {
    themeId: number;
    themeNameKo: string;
    curDate: string;
    time: number;
    realTime: string;
    minParticipant: number;
    maxParticipant: number;
}

function Reservation() {
    const navigate = useNavigate();
    const [date, setDate] = useState<Date>(new Date());
    const [curDate, setCurDate] = useState<string>(new Date().toLocaleDateString().replace(/\./g, "").replace(/\s/g, "-"));
    const merchantIndex = useRecoilValue(merchantsIndex);
    // const { reservationData, isLoading } = useQuery<IReservation>(["allData", "reservation"], () => fetchReservation(merchantIndex, curDate), { refetchOnWindowFocus: false });

    const [data, setData] = useState<IReservationTheme[]>([]);

    useEffect(() => {
        fetchReservation(2, "2023-03-19").then((res) => {
            setData(res.result);
        });
    }, []);

    const [isReserveMenu, setisReserveMenu] = useState(true);
    const [reservationFormData, setReservationFormData] = useState<IFormData>();
    const [selectTime, setSelectTime] = useState<String>("");
    const onReserveMatch = useMatch("/:merchant/reservation/:time");
    const onDetailMatch = useMatch("/:merchant/reservation/detail/:time");

    // const data = useRecoilValue(allData);
    // const merchantList: IMerchants[] = data.result;
    // const merchantsId = useRecoilValue(merchantsIndex);
    // const currentMerchant = merchantList.find((merchant) => merchant.id === merchantsId);

    const toggleReserve = (action: boolean) => {
        setisReserveMenu(action);
    };
    const reservationConfirm = () => {};
    const handleOnBlur = () => {
        // TODO: 날짜 검증 기능 추가
    };

    const onTimeClicked = (themeId: number, themeNameKo: string, isPossible: Boolean, time: number, realTime: string, minParticipant: number, maxParticipant: number) => {
        const formData = {
            themeId,
            themeNameKo,
            curDate,
            time,
            realTime,
            minParticipant,
            maxParticipant,
        };
        setReservationFormData(formData);
        setSelectTime(realTime);
        if (!isPossible) navigate(`${time}`);
    };

    return (
        <div>
            {!onDetailMatch ? (
                <>
                    <div className="relative flex text-md lg:text-2xl justify-around text-white py-2 items-center">
                        <div className="cursor-pointer">예약하기</div>
                        <div className="cursor-pointer">예약확인</div>
                        {/*<div className="absolute bottom-0 block h-1 bg-zinc-200 transition-all duration-300"*/}
                        {/*     style="left: 71px; width: 69px;"></div>*/}
                    </div>
                    {/*<ReservationMenuBar>*/}
                    {/*    <ReservationMenu onClick={() => toggleReserve(true)} fontColor={isReserveMenu ? "#FFFFFF" : "#6A6A6A"}>*/}
                    {/*        예약하기*/}
                    {/*        {isReserveMenu ? <Underline layoutId="underline" /> : null}*/}
                    {/*    </ReservationMenu>*/}
                    {/*    <ReservationMenu onClick={() => toggleReserve(false)} fontColor={isReserveMenu ? "#6A6A6A" : "#FFFFFF"}>*/}
                    {/*        예약확인 및 취소*/}
                    {/*        {isReserveMenu ? null : <Underline layoutId="underline" />}*/}
                    {/*    </ReservationMenu>*/}
                    {/*</ReservationMenuBar>*/}
                    {/*<BgImage>*/}
                    {isReserveMenu ? (
                        // <ReservationWrapper>
                        //     <DateForm>
                        //         <Phone>
                        //             <DateEn>DATE</DateEn>
                        //             <DateKr>날짜</DateKr>
                        //         </Phone>
                        //         <DatePicker
                        //             locale={ko}
                        //             dateFormat={"yyyy-MM-dd"}
                        //             wrapperClassName="date_picker full-width"
                        //             selected={date}
                        //             onChange={(selectDate: Date) => {
                        //                 const newDate = new Date(selectDate).toLocaleDateString().replace(/\./g, "").replace(/\s/g, "-");
                        //                 setDate(selectDate);
                        //                 setCurDate(newDate);
                        //             }}
                        //             onBlur={handleOnBlur}
                        //         />
                        //         <DatePickerWrapperStyles />
                        //     </DateForm>
                        //     <Possible>
                        //         {/* TODO: 앞에 동그라미 추가 */}
                        //         <Available color={"#6BE77D"}>⦁예약가능</Available>
                        //         <Available color={"#4D4D4D"} marginRight={"8px"}>
                        //             ⦁예약완료
                        //         </Available>
                        //     </Possible>
                        //    {/*<ThemeList>*/}
                        <div>
                            <div className="flex justify-center items-center">
                                <div className="text-3xl text-white">DATE</div>
                                <div className="w-fit ml-2">
                                    <DatePicker
                                        className="text-xl bg-zinc-700 text-white"
                                        locale={ko}
                                        dateFormat={"yyyy-MM-dd"}
                                        selected={date}
                                        onChange={(selectDate: Date) => {
                                            const newDate = new Date(selectDate).toLocaleDateString().replace(/\./g, "").replace(/\s/g, "-");
                                            setDate(selectDate);
                                            setCurDate(newDate);
                                        }}
                                        onBlur={handleOnBlur}
                                    />
                                </div>
                            </div>
                            {data.map((theme) => {
                                return (
                                    <div key={theme.themeId} className="border border-zinc-500 p-2 my-3 w-full">
                                        <div className="flex justify-between py-2 text-zinc-100">
                                            <div>
                                                <div className="text-2xl font-bold">{theme.themeNameKo}</div>
                                                <div>{theme.themeNameEn}</div>
                                            </div>
                                            <div className="flex items-end">
                                                <div className="flex items-end">
                                                    <div className="text-2xl">난이도</div>
                                                    {makeBooleanArray(theme.difficulty).map((star, index) => {
                                                        if (star) {
                                                            return (
                                                                <Icon.Star
                                                                    key={index}
                                                                    style={{
                                                                        color: "#fff",
                                                                        //theme.colorCode,
                                                                    }}
                                                                    className="h-4 w-4 xs:h-8 xs:w-8"
                                                                />
                                                            );
                                                        }
                                                        return <Icon.Star key={index} className="text-zinc-600 h-4 w-4 xs:h-8 xs:w-8" />;
                                                    })}
                                                </div>
                                                <div>
                                                    인원 {theme.minParticipantCount}-{theme.maxParticipantCount}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="w-full h-[500px]">
                                            <img className="w-full h-full object-cover" src={theme.mainImagePath} alt="mainImagePath" />
                                        </div>
                                        <div className="grid grid-cols-3 lg:grid-cols-4 gap-3 py-2">
                                            {theme.reservationList.map((reservation) => {
                                                return reservation.isReserved ? (
                                                    <div key={reservation.id} style={{ backgroundColor: "#1B1B1B" }} className="text-center w-full p-2 text-zinc-700">
                                                        <div className="text-2xl font-bold">{reservation.time.substring(0, 5)}</div>
                                                        <div className="text-lg">예약불가</div>
                                                    </div>
                                                ) : (
                                                    <div
                                                        key={reservation.id}
                                                        style={{ backgroundColor: "#1B1B1B" }}
                                                        className="text-center w-full p-2 text-[#00EA6F] cursor-pointer"
                                                        onClick={() => {
                                                            console.log("clicked!");
                                                        }}
                                                    >
                                                        <div className="text-2xl font-bold">{reservation.time.substring(0, 5)}</div>
                                                        <div className="text-lg">예약가능</div>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    ) : (
                        //          TODO: 테마 예약 리스트 렌더
                        //         {data?.result.map((theme) => (
                        //             <>
                        //                 <Theme>
                        //                     <ThemeTitle>
                        //                         <TitleKr>{theme.themeNameKo}</TitleKr>
                        //                         <TitleEn>{theme.themeNameEn}</TitleEn>
                        //                     </ThemeTitle>
                        //                     <Condition>
                        //                         <Difficulty>난이도</Difficulty>
                        //                         <Star>{drawFigure(theme.difficulty)}</Star>
                        //                         <Personnel>{`인원 ${theme.minParticipant}~${theme.maxParticipant}명`}</Personnel>
                        //                     </Condition>
                        //                     <ThemeImgWrapper>
                        //                         <ThemeImg src={theme.mainImagePath} />
                        //                     </ThemeImgWrapper>
                        //                     <Timetable>
                        //                         {theme.reservationInfos.map((resv, idx) => (
                        //                             <div>
                        //                                 <TimeWrapper
                        //                                     key={resv.id}
                        //                                     marginLeft={idx % 3 == 0 ? true : false}
                        //                                     isReserve={resv.isReserved}
                        //                                     onClick={() =>
                        //                                         onTimeClicked(
                        //                                             theme.themeId,
                        //                                             theme.themeNameKo,
                        //                                             resv.isReserved,
                        //                                             resv.id,
                        //                                             resv.time.slice(0, 5),
                        //                                             theme.minParticipant,
                        //                                             theme.maxParticipant
                        //                                         )
                        //                                     }
                        //                                 >
                        //                                     <Time>{resv.time.slice(0, 5)}</Time>
                        //                                     <ReservationCheck>{resv.isReserved ? "예약완료" : "예약가능"}</ReservationCheck>
                        //                                 </TimeWrapper>
                        //                             </div>
                        //                         ))}
                        //                     </Timetable>
                        //                 </Theme>
                        //             </>
                        //         ))}
                        //     </ThemeList>
                        // </ReservationWrapper>
                        <ReservationWrapper>
                            <Confirm>
                                <Title>MY RESERVATION</Title>
                                <SubTitle>예약확인</SubTitle>
                                <InputForm>
                                    <Phone>
                                        <EngPhone>PHONE</EngPhone>
                                        <KrPhone>연락처</KrPhone>
                                    </Phone>
                                    <Input />
                                </InputForm>
                            </Confirm>
                            <Button onClick={reservationConfirm}>예약확인</Button>
                        </ReservationWrapper>
                    )}
                    // {/*</BgImage>*/}
                    <AnimatePresence>{onReserveMatch && <ReservationModal reservationFormData={reservationFormData} />}</AnimatePresence>
                </>
            ) : (
                <Detail reservationFormData={reservationFormData} />
            )}
        </div>
    );
}

export default Reservation;
