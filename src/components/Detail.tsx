import { useParams } from "react-router-dom";
import React, { useEffect, useRef, useState } from "react";
import { deleteReservation, fetchReservationAuthenticatePhoneNumber, fetchReservationDetail, IReservationResponseData } from "../api";
import { onlyNumber } from "../util/util";

interface IParams {
    reservationId: number;
    requestId: number;
    recipientNo: string;
}

function Detail() {
    const [reservationDetail, setReservationDetail] = useState<IReservationResponseData>();
    const [isLoading, setIsLoading] = useState<Boolean>(false);
    const [requestId, setRequestId] = useState<Number>();

    const { reservationId } = useParams<{ reservationId: string }>();

    const cancelButton = useRef<HTMLButtonElement>(null);
    const phoneNumberInput = useRef<HTMLInputElement>(null);

    const authenticatePhoneNumber = (e: React.BaseSyntheticEvent | undefined) => {
        setIsLoading(true);
        e?.target.classList.add("cursor-now-allowed");
        e!.target.disabled = true;

        const params: IParams = {
            reservationId: Number(reservationId),
            recipientNo: phoneNumberInput.current!.value,
            requestId: Number(requestId),
        };

        fetchReservationAuthenticatePhoneNumber(params).then((res) => {
            setRequestId(res.result.requestId);
        });
    };

    const cancelReservation = () => {
        deleteReservation(Number(reservationId), phoneNumberInput.current!.value).then((res) => {
            console.log(res);
        });
    };

    const handleInput = (e: React.KeyboardEvent<HTMLInputElement>) => {
        onlyNumber(e.currentTarget);
        if (e.currentTarget.value.length === 6) {
            cancelButton.current!.disabled = false;
            cancelButton.current!.classList.remove("cursor-not-allowed");
            cancelButton.current!.classList.remove("opacity-50");
        } else {
            cancelButton.current!.disabled = true;
            cancelButton.current!.classList.add("cursor-not-allowed");
            cancelButton.current!.classList.add("opacity-50");
        }
    };

    useEffect(() => {
        reservationId &&
            fetchReservationDetail(Number(reservationId)).then((res) => {
                setReservationDetail(res.result);
            });
    }, [reservationId]);

    return (
        <div className="bg-[#4a4a4a] border border-[#363636] rounded p-4 text-white text-lg">
            <div className="flex mb-3 text-md">
                <div className="w-1/5 text-right mr-8">예약지점명</div>
                <div>건대점</div>
            </div>
            <div className="flex mb-3 text-md">
                <div className="w-1/5 text-right mr-8">예약번호</div>
                <div>{reservationDetail?.id}</div>
            </div>
            <div className="flex mb-3 text-md">
                <div className="w-1/5 text-right mr-8">날짜</div>
                <div>{reservationDetail?.date}</div>
            </div>
            <div className="flex mb-3 text-md">
                <div className="w-1/5 text-right mr-8">시간</div>
                <div>{reservationDetail?.time}</div>
            </div>
            <div className="flex mb-3 text-md">
                <div className="w-1/5 text-right mr-8">테마</div>
                <div>{reservationDetail?.themeName}</div>
            </div>
            <div className="flex mb-3 text-md">
                <div className="w-1/5 text-right mr-8">예약자</div>
                <div>{reservationDetail?.reservedBy}</div>
            </div>
            <div className="flex mb-3 text-md">
                <div className="w-1/5 text-right mr-8">인원선택</div>
                <div>{reservationDetail?.participantCount}</div>
            </div>
            <div className="flex mb-3 text-md">
                <div className="w-1/5 text-right mr-8">가격</div>
                <div>44000</div>
            </div>
            <div className="mb-3 text-center">유의사항</div>
            <div className="text-[#86e57f] mb-3 text-sm">⏺ 휴대전화 번호가 정확하지 않을 경우 예약이 취소되니 유의해 주시기바랍니다.</div>
            <div className="text-[#86e57f] mb-3 text-sm">⏺ 임산부, 노약자, 유아 어린이(13세미만)나 폐소공포증, 심장질환 등의 질병이 있으신 분들은 예약전 전화문의 바랍니다.</div>
            <div className="text-[#86e57f] mb-3 text-sm">⏺ 예약취소는 예약시간 24시간 전까지만 가능합니다.</div>
            <div className="text-[#86e57f] mb-3 text-sm">⏺ 원활한 진행을 위해 게임 시작 10분 전까지 도착 부탁드립니다.</div>
            <div className="text-[#86e57f] mb-3 text-sm">⏺ 예약취소 및 환불은 게임시작 30분전까지 가능합니다.</div>
            <div className="flex mb-3">
                <div className="w-1/5 text-right mr-8">
                    <div className="text-lg">PHONE</div>
                    <div className="text-sm">연락처</div>
                </div>
                <input ref={phoneNumberInput} className="bg-transparent p-2" value={reservationDetail?.phoneNumber || ""} placeholder="숫자만 입력 해주세요." disabled />
                <button
                    className={`px-4 py-2 font-semibold text-white  bg-[#92c78c] w-1/5 text-sm ${isLoading && "opacity-50"}`} //
                    onClick={authenticatePhoneNumber}
                >
                    {isLoading ? (
                        <div className="flex items-center justify-center">
                            <svg className="animate-spin mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path
                                    className="opacity-75"
                                    fill="currentColor"
                                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                ></path>
                            </svg>
                            전송 중...
                        </div>
                    ) : (
                        <>인증번호 전송</>
                    )}
                </button>
            </div>
            {isLoading && (
                <>
                    <div className="flex mb-3 items-center">
                        <div className="w-1/5 text-right mr-8">인증번호</div>
                        <input type="text" className="bg-[#7C7C7C] p-2" onInput={handleInput} placeholder="숫자만 입력 해주세요." maxLength={6} />
                    </div>
                    <div className="text-red-500 text-xs mb-2"> * 인증번호 확인 후 예약하기를 눌러주세요.</div>
                </>
            )}
            <div className="text-center">
                <button ref={cancelButton} type="button" className="p-4 bg-red-600 w-2/5 opacity-50 cursor-not-allowed" onClick={cancelReservation} disabled>
                    예약취소
                </button>
            </div>
        </div>
    );
}

export default Detail;
