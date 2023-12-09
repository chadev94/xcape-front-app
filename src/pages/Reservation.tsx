import React, { useEffect, useRef, useState } from "react";
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
import Calendar from "react-calendar";
import "../styles/CustomCalendar.css";
import moment from "moment";
import 'moment/locale/ko';
import { OPEN_ROOM } from "../util/constant";
import PossibleReservation from "../components/PossibleReservation";

export interface IFormData {
    themeId: number;
    themeNameKo: string;
    curDate: string;
    reservationId: string;
    realTime: string;
    roomType: string;
    participantCount: number;
    minParticipantCount: number;
    maxParticipantCount: number;
    priceList: IPrice[];
    isCrimeScene: boolean;
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
    const [loading, setLoading] = useState<boolean>(false);
    const [data, setData] = useState<IReservationTheme[]>([]);
    const phoneNumberRef = useRef<HTMLInputElement>(null);

    const [date, setDate] = useState<string>(moment(new Date()).format("YYYY-MM-DD"));

    const handleInputPhoneNumber = (e: React.KeyboardEvent<HTMLInputElement>) => {
        onlyNumber(e.currentTarget);
    };

    useEffect(() => {
        setLoading(true);
        if (currentMerchant.id !== 0) {
            getReservationList(currentMerchant.id, date).then((res) => {
                setData(res.result);
                setLoading(false);
            });
        }
    }, [date]);

    const [reservationFormData, setReservationFormData] = useState<IFormData>();
    const [openModal, setOpenModal] = useState<boolean>(false);

    const reservationConfirm = () => {
        const phoneNumber = phoneNumberRef.current!.value;
        if (validatePhoneNumber(phoneNumber)) {
            navigate(`/reservation-list?phoneNumber=${phoneNumber}`);
        } else {
            alert("핸드폰 번호를 확인해 주세요.");
        }
    };

    const onTimeClicked = (
        themeId: number,
        themeNameKo: string,
        isReserved: boolean,
        roomType: string,
        reservationId: string,
        realTime: string,
        minParticipantCount: number,
        maxParticipantCount: number,
        isCrimeScene: boolean,
        participantCount: number,
        priceList: IPrice[]
    ) => {
        const curDate = date;
        const formData = {
            themeId,
            themeNameKo,
            curDate,
            reservationId,
            realTime,
            roomType,
            participantCount,
            minParticipantCount,
            maxParticipantCount,
            isCrimeScene,
            priceList,
        };
        setReservationFormData(formData);

        setOpenModal(true);
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter") {
            reservationConfirm();
        }
    };

    const checkPossibleReservation = (
        isReserved: boolean,
        roomType: string,
        participantCount: number,
        reservationDate: string,
        reservationTime: string,
        maxParticipantCount: number
    ) => {
        if (!isReserved) {
            return true;
        } else if (isReserved && roomType === OPEN_ROOM && isCanReservedTime(reservationDate, reservationTime)) {
            return participantCount < maxParticipantCount;
        } else {
            return false;
        }
    };

    const isCanReservedTime = (reservationDate: string, reservationTime: string) => {
        const hour = reservationTime.split(":")[0];
        const minute = reservationTime.split(":")[1];
        const reservationDateTime = new Date(reservationDate);
        reservationDateTime.setHours(Number(hour));
        reservationDateTime.setMinutes(Number(minute) + 10);

        const now = new Date();

        return now <= reservationDateTime;
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
                        <div className="p-4">
                            <Calendar
                                className="mx-auto w-full border rounded"
                                onChange={(value, event) =>
                                    value && setDate(moment(new Date(value.toString())).format("YYYY-MM-DD"))
                                }
                                value={date}
                                defaultValue={date}
                                calendarType="US"
                                formatDay={(locale, date) => date.toLocaleString("en", { day: "numeric" })}
                                minDetail="month"
                                maxDetail="month"
                                next2Label={null}
                                prev2Label={null}
                                minDate={new Date()}
                                maxDate={new Date(new Date().setDate(new Date().getDate() + 15))}
                            />
                            <div className="font-bold text-black text-xl text-center py-4 mt-4 bg-[#fff200] rounded">
                                {moment(new Date(date)).locale('ko').format("YYYY년 MMM Do dddd")}
                            </div>
                        </div>
                        {loading ? (
                            <Loading />
                        ) : (
                            data
                                .sort((prev, next) => {
                                    return next.themeId! - prev.themeId!;
                                })
                                .map((theme) => {
                                    return (
                                        <div className="p-4">
                                            <div key={theme.themeId} className="border border-zinc-500 p-4 mt-3 w-full">
                                                <div className="flex justify-between py-2 text-zinc-100">
                                                    <div>
                                                        <div className="text-lg lg:text-lg font-bold tracking-tight w-max">
                                                            {theme.themeNameKo} &nbsp;
                                                            <span
                                                                style={{ backgroundColor: theme.colorCode }}
                                                                className="px-2 py-1 text-sm whitespace-nowrap text-black text-lg"
                                                            >
                                                                {theme.runningTime}분
                                                            </span>
                                                        </div>
                                                        <div className="text-xs tracking-tight w-max">{theme.themeNameEn}</div>
                                                    </div>
                                                    <div>
                                                        <div className="flex items-end">
                                                            {makeBooleanArray(theme.difficulty).map((star, index) => {
                                                                if (star) {
                                                                    return (
                                                                        <Icon.Star
                                                                            key={index}
                                                                            style={{
                                                                                color: theme.colorCode,
                                                                            }}
                                                                            className="h-8 w-8"
                                                                        />
                                                                    );
                                                                }
                                                                return (
                                                                    <Icon.Star
                                                                        key={index}
                                                                        className="text-zinc-600 h-8 w-8"
                                                                    />
                                                                );
                                                            })}
                                                        </div>
                                                        <div className="float-right tracking-tight">
                                                            인원 {theme.minParticipantCount}-{theme.maxParticipantCount}명
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
                                                        return checkPossibleReservation(
                                                            reservation.isReserved,
                                                            reservation.roomType,
                                                            reservation.participantCount,
                                                            reservation.date,
                                                            reservation.time,
                                                            theme.maxParticipantCount
                                                        ) ? (
                                                            <div
                                                                key={reservation.id}
                                                                style={{ backgroundColor: "#1B1B1B" }}
                                                                className="text-center w-full p-2 cursor-pointer"
                                                                onClick={() => {
                                                                    onTimeClicked(
                                                                        theme.themeId,
                                                                        theme.themeNameKo,
                                                                        reservation.isReserved,
                                                                        reservation.roomType,
                                                                        reservation.id,
                                                                        reservation.time.slice(0, 5),
                                                                        theme.minParticipantCount,
                                                                        theme.maxParticipantCount,
                                                                        theme.isCrimeScene,
                                                                        reservation.participantCount,
                                                                        theme.priceList
                                                                    );
                                                                }}
                                                            >
                                                                <PossibleReservation
                                                                    theme={theme}
                                                                    reservation={reservation}
                                                                />
                                                            </div>
                                                        ) : (
                                                            <div
                                                                key={reservation.id}
                                                                style={{ backgroundColor: "#1B1B1B" }}
                                                                className="text-center w-full p-2 text-zinc-700"
                                                            >
                                                                <div className="text-2xl font-bold">
                                                                    {reservation.time.substring(0, 5)}
                                                                </div>
                                                                <div className="text-md tracking-tight">예약불가</div>
                                                            </div>
                                                        );
                                                    })}
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })
                        )}
                    </div>
                ) : activeTabIndex === 1 ? (
                    <div className="my-4 text-white border border-[#363636] rounded-sm bg-[#282828]">
                        <div className="text-center font-bold m-10">
                            <div className="text-2xl">MY RESERVATION</div>
                            <div className="m-2">예약확인</div>
                            <div className="flex py-4 px-2 border-y border-[#888888] items-center">
                                <div className="w-1/3 text-[#aaaaaa]">
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
                        <div className="text-center">
                            <button
                                className="bg-[#92c78c] font-bold w-1/2 cursor-pointer mx-auto mb-6 px-10 py-4"
                                onClick={reservationConfirm}
                            >
                                예약확인
                            </button>
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
