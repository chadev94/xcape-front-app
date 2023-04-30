import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { getReservationListByPhoneNumber, IReservationHistoryTable } from "../api";
import Loading from "../components/Loading";
import { convertReservationType } from "../util/util";
import { OPEN_ROOM } from "../util/constant";

function ReservationList() {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const phoneNumber = searchParams.get("phoneNumber");
    const [reservationHistoryTable, setReservationHistoryTable] = useState<IReservationHistoryTable[]>();
    const [isLoading, setIsLoading] = useState<boolean>(false);

    useEffect(() => {
        setIsLoading(true);
        if (phoneNumber) {
            getReservationListByPhoneNumber(phoneNumber).then((res) => {
                setReservationHistoryTable(res.result);
                setIsLoading(false);
            });
        }
    }, [phoneNumber]);

    return (
        <>
            {isLoading ? (
                <Loading />
            ) : (
                <>
                    <div className="text-3xl text-white text-center p-4">예약목록</div>
                    <table className="table-auto border-collapse border border-slate-500 text-white w-full text-center">
                        <thead>
                            <tr>
                                <th className="border border-zinc-600 py-2">테마</th>
                                <th className="border border-zinc-600 py-2">예약날짜</th>
                                <th className="border border-zinc-600 py-2">예약시간</th>
                                <th className="border border-zinc-600 py-2">예약자</th>
                                <th className="border border-zinc-600 py-2">예약인원</th>
                                <th className="border border-zinc-600 py-2">오픈룸</th>
                                <th className="border border-zinc-600 py-2">예약분류</th>
                            </tr>
                        </thead>
                        <tbody>
                            {reservationHistoryTable &&
                                reservationHistoryTable.map((reservationHistory, index) => {
                                    return (
                                        <tr
                                            key={index}
                                            className="cursor-pointer hover:bg-[#363636]"
                                            onClick={() =>
                                                navigate(
                                                    `/reservation-detail/${reservationHistory.reservationHistoryId}`
                                                )
                                            }
                                        >
                                            <td className="border border-zinc-700 py-4">
                                                {reservationHistory.themeName}
                                            </td>
                                            <td className="border border-zinc-700 py-4">{reservationHistory.date}</td>
                                            <td className="border border-zinc-700 py-4">{reservationHistory.time}</td>
                                            <td className="border border-zinc-700 py-4">
                                                {reservationHistory.reservedBy}
                                            </td>
                                            <td className="border border-zinc-700 py-4">
                                                {reservationHistory.participantCount}
                                            </td>
                                            <td className="border border-zinc-700 py-4">
                                                {reservationHistory.roomType === OPEN_ROOM ? "✅" : ""}
                                            </td>
                                            <td className="border border-zinc-700 py-4">
                                                {convertReservationType(reservationHistory.type)}
                                            </td>
                                        </tr>
                                    );
                                })}
                        </tbody>
                    </table>
                </>
            )}
        </>
    );
}

export default ReservationList;
