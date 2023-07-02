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
                <div className="text-sky-700">
                    <div className="text-2xl font-bold">{reservation.time.substring(0, 5)}</div>
                    <div className="text-lg">
                        {reservation.participantCount}/{theme.maxParticipantCount}
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
