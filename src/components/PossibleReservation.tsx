import React, { useEffect } from "react";
import { IReservationTheme, ITimeTable } from "../api";
import { OPEN_ROOM } from "../util/constant";

interface IProps {
    theme: IReservationTheme;
    reservation: ITimeTable;
}

function PossibleReservation({ theme, reservation }: IProps) {
    return (
        <>
            {reservation.roomType === OPEN_ROOM ? (
                <div className="text-amber-500">
                    <div className="text-2xl font-bold">{reservation.time.substring(0, 5)}</div>
                    <div className="text-xs">OPEN ROOM</div>
                    <div className="text-xs font-bold -mt-1.5">
                        {reservation.participantCount}{" "}
                        <span className="font-light">
                            / {theme.minParticipantCount}-{theme.maxParticipantCount} 인
                        </span>
                    </div>
                </div>
            ) : (
                <div className="text-[#00EA6F]">
                    <div className="text-2xl font-bold">{reservation.time.substring(0, 5)}</div>
                    <div className="text-lg">예약가능</div>
                </div>
            )}
        </>
    );
}

export default PossibleReservation;
