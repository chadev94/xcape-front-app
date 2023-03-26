import { useState } from "react";
import { createGlobalStyle } from "styled-components";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
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
import { IMerchants } from "../api";
import { useRecoilValue } from "recoil";
import { allData, merchantsIndex } from "../atom";
import ReservationModal from "./ReservationModal";
import { makeBooleanArray } from "../util/util";
import Detail from "./Detail";

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
    // const { data, isLoading } = useQuery<IReservation>(["allData", "reservation"], () => fetchReservation(merchantIndex, curDate), { refetchOnWindowFocus: false });
    const [isReserveMenu, setisReserveMenu] = useState(true);
    const [reservationFormData, setReservationFormData] = useState<IFormData>();
    const [selectTime, setSelectTime] = useState<String>("");
    const onReserveMatch = useMatch("/:merchant/reservation/:time");
    const onDetailMatch = useMatch("/:merchant/reservation/detail/:time");

    const data = useRecoilValue(allData);
    const merchantList: IMerchants[] = data.result;
    const merchantsId = useRecoilValue(merchantsIndex);
    const currentMerchant = merchantList.find((merchant) => merchant.id === merchantsId);

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
                    <ReservationMenuBar>
                        <ReservationMenu onClick={() => toggleReserve(true)} fontColor={isReserveMenu ? "#FFFFFF" : "#6A6A6A"}>
                            예약하기
                            {isReserveMenu ? <Underline layoutId="underline" /> : null}
                        </ReservationMenu>
                        <ReservationMenu onClick={() => toggleReserve(false)} fontColor={isReserveMenu ? "#6A6A6A" : "#FFFFFF"}>
                            예약확인 및 취소
                            {isReserveMenu ? null : <Underline layoutId="underline" />}
                        </ReservationMenu>
                    </ReservationMenuBar>
                    <BgImage>
                        {isReserveMenu ? (
                            <ReservationWrapper>
                                <DateForm>
                                    <Phone>
                                        <DateEn>DATE</DateEn>
                                        <DateKr>날짜</DateKr>
                                    </Phone>
                                    <DatePicker
                                        dateFormat={"yyyy-MM-dd"}
                                        wrapperClassName="date_picker full-width"
                                        selected={date}
                                        onChange={(selectDate: Date) => {
                                            const newDate = new Date(selectDate).toLocaleDateString().replace(/\./g, "").replace(/\s/g, "-");
                                            setDate(selectDate);
                                            setCurDate(newDate);
                                        }}
                                        onBlur={handleOnBlur}
                                    />
                                    <DatePickerWrapperStyles />
                                </DateForm>
                                <Possible>
                                    {/* TODO: 앞에 동그라미 추가 */}
                                    <Available color={"#6BE77D"}>⦁예약가능</Available>
                                    <Available color={"#4D4D4D"} marginRight={"8px"}>
                                        ⦁예약완료
                                    </Available>
                                </Possible>
                                <ThemeList>
                                    {currentMerchant?.themeList.map((theme) => {
                                        return (
                                            <div className="flex">
                                                <div>
                                                    <span>{theme.nameKo}</span>
                                                    <span>{theme.nameEn}</span>
                                                </div>
                                                <div>
                                                    <span>난이도 {theme.difficulty}</span>
                                                    <span>
                                                        인원 {theme.minParticipantCount}-${theme.maxParticipantCount}
                                                    </span>
                                                </div>
                                            </div>
                                        );
                                    })}
                                    {/* TODO: 테마 예약 리스트 렌더 */}
                                    {/*{data?.result.map((theme) => (*/}
                                    {/*    <>*/}
                                    {/*        <Theme>*/}
                                    {/*            <ThemeTitle>*/}
                                    {/*                <TitleKr>{theme.themeNameKo}</TitleKr>*/}
                                    {/*                <TitleEn>{theme.themeNameEn}</TitleEn>*/}
                                    {/*            </ThemeTitle>*/}
                                    {/*            <Condition>*/}
                                    {/*                <Difficulty>난이도</Difficulty>*/}
                                    {/*                <Star>{drawFigure(theme.difficulty)}</Star>*/}
                                    {/*                <Personnel>{`인원 ${theme.minParticipant}~${theme.maxParticipant}명`}</Personnel>*/}
                                    {/*            </Condition>*/}
                                    {/*            <ThemeImgWrapper>*/}
                                    {/*                <ThemeImg src={theme.mainImagePath} />*/}
                                    {/*            </ThemeImgWrapper>*/}
                                    {/*            <Timetable>*/}
                                    {/*                {theme.reservationInfos.map((resv, idx) => (*/}
                                    {/*                    <div>*/}
                                    {/*                        <TimeWrapper*/}
                                    {/*                            key={resv.id}*/}
                                    {/*                            marginLeft={idx % 3 == 0 ? true : false}*/}
                                    {/*                            isReserve={resv.isReserved}*/}
                                    {/*                            onClick={() =>*/}
                                    {/*                                onTimeClicked(*/}
                                    {/*                                    theme.themeId,*/}
                                    {/*                                    theme.themeNameKo,*/}
                                    {/*                                    resv.isReserved,*/}
                                    {/*                                    resv.id,*/}
                                    {/*                                    resv.time.slice(0, 5),*/}
                                    {/*                                    theme.minParticipant,*/}
                                    {/*                                    theme.maxParticipant*/}
                                    {/*                                )*/}
                                    {/*                            }*/}
                                    {/*                        >*/}
                                    {/*                            <Time>{resv.time.slice(0, 5)}</Time>*/}
                                    {/*                            <ReservationCheck>{resv.isReserved ? "예약완료" : "예약가능"}</ReservationCheck>*/}
                                    {/*                        </TimeWrapper>*/}
                                    {/*                    </div>*/}
                                    {/*                ))}*/}
                                    {/*            </Timetable>*/}
                                    {/*        </Theme>*/}
                                    {/*    </>*/}
                                    {/*))}*/}
                                </ThemeList>
                            </ReservationWrapper>
                        ) : (
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
                    </BgImage>
                    <AnimatePresence>{onReserveMatch && <ReservationModal reservationFormData={reservationFormData} />}</AnimatePresence>
                </>
            ) : (
                <Detail reservationFormData={reservationFormData} />
            )}
        </div>
    );
}

export default Reservation;
