import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ko } from "date-fns/locale";
import { Button, Confirm, EngPhone, Input, InputForm, KrPhone, Phone, ReservationWrapper, SubTitle, Title } from "./styled/reservationStyled";
import { AnimatePresence } from "framer-motion";
import { getReservationList, IPrice, IReservationTheme } from "../api";
import { useRecoilValue } from "recoil";
import ReservationModal from "./ReservationModal";
import { makeBooleanArray } from "../util/util";
import Icon from "../assets/icon";
import Loading from "./Loading";
import { merchant } from "../atom";

export interface IFormData {
    themeId: number;
    themeNameKo: string;
    curDate: string;
    time: number;
    realTime: string;
    minParticipantCount: number;
    maxParticipantCount: number;
    priceList: IPrice[];
}

function Reservation() {
    const currentMerchant = useRecoilValue(merchant);
    const [date, setDate] = useState<Date>(new Date());
    const [targetDate, setTargetDate] = useState<Date>(new Date());
    const [loading, setLoading] = useState<boolean>(false);
    const [data, setData] = useState<IReservationTheme[]>([]);

    useEffect(() => {
        setLoading(false);
        getReservationList(currentMerchant.id, toStringByFormatting(targetDate)).then((res) => {
            setData(res.result);
            setLoading(true);
        });
    }, [targetDate]);

    const [isReserveMenu, setisReserveMenu] = useState(true);
    const [reservationFormData, setReservationFormData] = useState<IFormData>();
    const [selectTime, setSelectTime] = useState<String>("");
    const [openModal, setOpenModal] = useState<boolean>(false);

    const toggleReserve = (action: boolean) => {
        setisReserveMenu(action);
    };
    const reservationConfirm = () => {};
    const handleOnBlur = () => {
        // TODO: 날짜 검증 기능 추가
    };

    const onTimeClicked = (
        themeId: number,
        themeNameKo: string,
        isPossible: Boolean,
        time: number,
        realTime: string,
        minParticipantCount: number,
        maxParticipantCount: number,
        priceList: IPrice[]
    ) => {
        let curDate = toStringByFormatting(targetDate);
        const formData = {
            themeId,
            themeNameKo,
            curDate,
            time,
            realTime,
            minParticipantCount,
            maxParticipantCount,
            priceList,
        };
        setReservationFormData(formData);
        setSelectTime(realTime);
        if (!isPossible) setOpenModal(true);
    };

    const toStringByFormatting = (sourceDate: Date) => {
        const year = sourceDate.getFullYear();
        const month = leftPad(sourceDate.getMonth() + 1);
        const day = leftPad(sourceDate.getDate());

        return [year, month, day].join("-");
    };

    const leftPad = (value: number) => {
        if (value >= 10) {
            return value;
        }

        return `0${value}`;
    };

    return (
        <div>
            <>
                <div className="relative flex text-md lg:text-2xl justify-around text-white py-2 items-center">
                    <div className="cursor-pointer">예약하기</div>
                    <div className="cursor-pointer">예약확인</div>
                </div>
                {isReserveMenu ? (
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
                                        setDate(selectDate);
                                        setTargetDate(new Date(selectDate));
                                    }}
                                    onBlur={handleOnBlur}
                                />
                            </div>
                        </div>
                        {loading ? (
                            data.map((theme) => {
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
                                                        onClick={() =>
                                                            onTimeClicked(
                                                                theme.themeId,
                                                                theme.themeNameKo,
                                                                reservation.isReserved,
                                                                reservation.id,
                                                                reservation.time.slice(0, 5),
                                                                theme.minParticipantCount,
                                                                theme.maxParticipantCount,
                                                                theme.priceList
                                                            )
                                                        }
                                                    >
                                                        <div className="text-2xl font-bold">{reservation.time.substring(0, 5)}</div>
                                                        <div className="text-lg">예약가능</div>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>
                                );
                            })
                        ) : (
                            <Loading />
                        )}
                    </div>
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
                {reservationFormData && <AnimatePresence>{openModal && <ReservationModal reservationFormData={reservationFormData} onOverlayFunction={setOpenModal} />}</AnimatePresence>}
            </>
        </div>
    );
}

export default Reservation;
