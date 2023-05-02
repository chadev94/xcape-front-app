import React, { useEffect, useRef, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ko } from "date-fns/locale";
import { getReservationList, IPrice, IReservationTheme } from "../api";
import { useRecoilValue } from "recoil";
import { makeBooleanArray, onlyNumber, validatePhoneNumber } from "../util/util";
import Icon from "../assets/icons";
import Loading from "../components/Loading";
import { merchant } from "../atom";
import Underline from "../components/Underline";
import { AnimatePresence } from "framer-motion";
import ReservationModal from "../components/ReservationModal";
import { useNavigate } from "react-router-dom";

export interface IFormData {
    themeId: number;
    themeNameKo: string;
    curDate: string;
    reservationId: string;
    realTime: string;
    minParticipantCount: number;
    maxParticipantCount: number;
    priceList: IPrice[];
}

function Reservation() {
    const navigate = useNavigate();
    const [activeTabIndex, setActiveTabIndex] = useState<number>(0);
    const [tabUnderlineWidth, setTabUnderlineWidth] = useState<number>(0);
    const [tabUnderlineLeft, setTabUnderlineLeft] = useState<number>(0);

    const tabsRef = useRef<any>([]);

    useEffect(() => {
        const setTabPosition = () => {
            const currentTab = tabsRef.current[activeTabIndex];
            setTabUnderlineLeft(currentTab?.offsetLeft ?? 0);
            setTabUnderlineWidth(currentTab?.clientWidth ?? 0);
        };
        setTabPosition();
        window.addEventListener("resize", setTabPosition);

        return () => window.removeEventListener("resize", setTabPosition);
    }, [activeTabIndex]);

    const currentMerchant = useRecoilValue(merchant);
    const [date, setDate] = useState<Date>(new Date());
    const [targetDate, setTargetDate] = useState<Date>(new Date());
    const [loading, setLoading] = useState<boolean>(false);
    const [data, setData] = useState<IReservationTheme[]>([]);
    const phoneNumberRef = useRef<HTMLInputElement>(null);

    const handleInputPhoneNumber = (e: React.KeyboardEvent<HTMLInputElement>) => {
        onlyNumber(e.currentTarget);
    };

    useEffect(() => {
        setLoading(true);
        if (currentMerchant.id !== 0) {
            getReservationList(currentMerchant.id, toStringByFormatting(targetDate)).then((res) => {
                setData(res.result);
                setLoading(false);
            });
        }
    }, [currentMerchant, targetDate]);

    const [reservationFormData, setReservationFormData] = useState<IFormData>();
    const [selectTime, setSelectTime] = useState<String>("");
    const [openModal, setOpenModal] = useState<boolean>(false);

    const reservationConfirm = () => {
        const phoneNumber = phoneNumberRef.current!.value;
        if (validatePhoneNumber(phoneNumber)) {
            navigate(`/reservation-list?phoneNumber=${phoneNumber}`);
        } else {
            alert("핸드폰 번호를 확인해 주세요.");
        }
    };
    const handleOnBlur = () => {
        // TODO: 날짜 검증 기능 추가
    };

    const onTimeClicked = (
        themeId: number,
        themeNameKo: string,
        isPossible: Boolean,
        reservationId: string,
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
            reservationId,
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

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter") {
            reservationConfirm();
        }
    };

    return (
        <div className="bg-[url('./assets/images/bg_iron.png')]">
            <div className="bg-black bg-opacity-50">
                <div className="relative flex text-md lg:text-2xl justify-around text-white py-2 items-center">
                    <div
                        className="cursor-pointer"
                        ref={(el) => (tabsRef.current[0] = el)}
                        onClick={() => setActiveTabIndex(0)}
                    >
                        예약하기
                    </div>
                    <div
                        className="cursor-pointer"
                        ref={(el) => (tabsRef.current[1] = el)}
                        onClick={() => setActiveTabIndex(1)}
                    >
                        예약확인
                    </div>
                    <Underline tabUnderlineLeft={tabUnderlineLeft} tabUnderlineWidth={tabUnderlineWidth} />
                </div>
                {activeTabIndex === 0 ? (
                    <div className="mt-4">
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
                                    minDate={new Date()}
                                    maxDate={new Date(new Date().setDate(new Date().getDate() + 15))}
                                />
                            </div>
                        </div>
                        {loading ? (
                            <Loading />
                        ) : (
                            data.map((theme) => {
                                return (
                                    <div key={theme.themeId} className="border border-zinc-500 p-2 mt-3 w-full">
                                        <div className="flex justify-between py-2 text-zinc-100">
                                            <div>
                                                <div className="text-lg lg:text-2xl font-bold">{theme.themeNameKo}</div>
                                                <div className="text-sm lg:text-lg">{theme.themeNameEn}</div>
                                            </div>
                                            <div className="flex items-end">
                                                <div className="flex items-end">
                                                    <div className="text-sm lg:text-2xl">난이도</div>
                                                    {makeBooleanArray(theme.difficulty).map((star, index) => {
                                                        if (star) {
                                                            return (
                                                                <Icon.Star
                                                                    key={index}
                                                                    style={{
                                                                        color: theme.colorCode,
                                                                    }}
                                                                    className="h-4 w-4 xs:h-8 xs:w-8"
                                                                />
                                                            );
                                                        }
                                                        return (
                                                            <Icon.Star
                                                                key={index}
                                                                className="text-zinc-600 h-4 w-4 xs:h-8 xs:w-8"
                                                            />
                                                        );
                                                    })}
                                                </div>
                                                <div>
                                                    인원 {theme.minParticipantCount}-{theme.maxParticipantCount}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="w-full h-[300px]">
                                            <img
                                                className="w-full h-full object-contain"
                                                src={theme.mainImagePath}
                                                alt="mainImagePath"
                                            />
                                        </div>
                                        <div className="grid grid-cols-3 lg:grid-cols-4 gap-3 py-2">
                                            {theme.reservationList.map((reservation) => {
                                                return reservation.isReserved ? (
                                                    <div
                                                        key={reservation.id}
                                                        style={{ backgroundColor: "#1B1B1B" }}
                                                        className="text-center w-full p-2 text-zinc-700"
                                                    >
                                                        <div className="text-2xl font-bold">
                                                            {reservation.time.substring(0, 5)}
                                                        </div>
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
                                                        <div className="text-2xl font-bold">
                                                            {reservation.time.substring(0, 5)}
                                                        </div>
                                                        <div className="text-lg">예약가능</div>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>
                                );
                            })
                        )}
                    </div>
                ) : activeTabIndex === 1 ? (
                    <div className="my-4 text-white border border-[#363636] rounded-sm bg-[#282828]">
                        <div className="text-center font-bold m-10">
                            <div className="text-3xl">MY RESERVATION</div>
                            <div className="m-2">예약확인</div>
                            <div className="flex py-5 border-y border-[#888888] items-center">
                                <div className="w-1/5 text-[#aaaaaa]">
                                    <div>PHONE</div>
                                    <div className="text-xs">연락처</div>
                                </div>
                                <input
                                    ref={phoneNumberRef}
                                    className="h-8 p-2 w-2/3 bg-[#383838]"
                                    onInput={handleInputPhoneNumber}
                                    onKeyDown={handleKeyDown}
                                    maxLength={11}
                                />
                            </div>
                        </div>
                        <div
                            className="bg-[#92c78c] font-bold text-center w-1/2 cursor-pointer mx-auto mb-6 px-10 py-4"
                            onClick={reservationConfirm}
                        >
                            예약확인
                        </div>
                    </div>
                ) : null}
                {reservationFormData && (
                    <AnimatePresence>
                        {openModal && (
                            <ReservationModal
                                reservationFormData={reservationFormData}
                                onOverlayFunction={setOpenModal}
                            />
                        )}
                    </AnimatePresence>
                )}
            </div>
        </div>
    );
}

export default Reservation;
