import React, { useEffect, useRef, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { fetchReservationAuthenticatePhoneNumber, IReservationResponseData, modifyReservation } from "../api";
import { reservationDetail } from "../atom";
import { IFormData } from "./Reservation";
import { onlyNumber } from "../util/util";

interface IModalProps {
    reservationFormData: IFormData;
    onOverlayFunction: React.Dispatch<React.SetStateAction<boolean>>;
}

interface IForm {
    date: string;
    time: string;
    themeName: string;
    reservedBy: string;
    phoneNumber: string;
    participantCount: number;
    privacy: boolean;
    authenticationNumber: number;
    requestId: string;
}

// interface IDetail {
//     phoneNumber: String;
//     reservedBy: String;
//     participantCount: Number;
//     roomType: String;
// }

function ReservationModal({ reservationFormData, onOverlayFunction }: IModalProps): React.ReactElement {
    const navigate = useNavigate();
    const setDetail = useSetRecoilState(reservationDetail) as any;
    const [reservationResponseData, setReservationResponseData] = useState<IReservationResponseData>();
    const [price, setPrice] = useState("000 원");
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isDisabled, setIsDisabled] = useState<boolean>(true);
    const [requestId, setRequestId] = useState<string>();

    const reservationButton = useRef<HTMLButtonElement>(null);

    useEffect(() => {
        changePrice(2);
    }, [reservationResponseData]);

    const { register, handleSubmit } = useForm<IForm>({ defaultValues: {} });

    const onSubmit: SubmitHandler<IForm> = (inputData: IForm) => {
        const formData = {
            phoneNumber: inputData.phoneNumber,
            reservedBy: inputData.reservedBy,
            participantCount: Number(inputData.participantCount),
            roomType: "general",
            authenticationNumber: inputData.authenticationNumber,
            requestId: requestId,
        };
        setDetail(formData);
        modifyReservation(reservationFormData.reservationId, formData).then((res) => console.log(res));
        // fetchReservationPut(reservationFormData?.reservationId, formData).then((res) => {
        //     setReservationResponseData(res.result);
        //     navigate(`/ku/reservation-detail/${res.result.id}`);
        // });
        onOverlayClick();
    };

    const authenticatePhoneNumber = (inputData: IForm, e: React.BaseSyntheticEvent | undefined) => {
        const formData = {
            recipientNo: inputData.phoneNumber,
            reservationId: reservationFormData?.reservationId,
        };
        setIsLoading(true);
        e?.target.classList.add("cursor-now-allowed");
        e!.target.disabled = true;

        fetchReservationAuthenticatePhoneNumber(formData).then((res) => {
            setRequestId(res.result.requestId);
        });
    };

    const onOverlayClick = () => onOverlayFunction(false);

    const participantDraw = () => {
        const maxParticipant = reservationFormData?.maxParticipantCount;
        const minParticipant = reservationFormData?.minParticipantCount;
        const participantSelect = [];
        if (maxParticipant && minParticipant) {
            for (let num: number = minParticipant; num <= maxParticipant; num++) {
                participantSelect.push(
                    <option key={num} value={num}>
                        {num}
                    </option>
                );
            }
        }

        return participantSelect;
    };

    const changePrice = (value: number) => {
        const findPrice = reservationFormData?.priceList.find((element) => element.type === "general" && element.person === value);

        const price = findPrice!.price;
        setPrice(price.toLocaleString(navigator.language) + "원");
    };

    const handleInput = (e: React.KeyboardEvent<HTMLInputElement>) => {
        onlyNumber(e.currentTarget);
        if (e.currentTarget.value.length === 6) {
            reservationButton.current!.disabled = false;
            reservationButton.current!.classList.remove("cursor-not-allowed");
            reservationButton.current!.classList.remove("opacity-50");
            setIsDisabled(false);
        } else {
            reservationButton.current!.disabled = true;
            reservationButton.current!.classList.add("cursor-not-allowed");
            reservationButton.current!.classList.add("opacity-50");
            setIsDisabled(true);
        }
    };
    return (
        <>
            <div className="bg-black fixed top-0 w-full h-full transition-all delay-100 duration-700 ease-in opacity-50" onClick={onOverlayClick} />
            <div className="bg-[#4a4a4a] rounded-md fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-2 w-11/12 lg:w-1/2 h-4/5 lg:h-fit overflow-auto text-white text-center">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="flex mb-3">
                        <div className="w-1/3">
                            <div className="text-lg">DATE</div>
                            <div className="text-sm">날짜</div>
                        </div>
                        <input className="bg-inherit" defaultValue={reservationFormData?.curDate} disabled />
                    </div>
                    <div className="flex mb-3">
                        <div className="w-1/3">
                            <div className="text-lg">TIME</div>
                            <div className="text-sm">시간</div>
                        </div>
                        <input
                            className="bg-inherit"
                            defaultValue={reservationFormData?.realTime}
                            {...register("time", {
                                required: "테마는 필수 입력 항목입니다.",
                                disabled: true,
                            })}
                        />
                    </div>
                    <div className="flex mb-3">
                        <div className="w-1/3">
                            <div className="text-lg">ROOM</div>
                            <div className="text-sm">테마</div>
                        </div>
                        <input
                            className="bg-inherit"
                            defaultValue={reservationFormData?.themeNameKo}
                            {...register("themeName", {
                                required: "테마는 필수 입력 항목입니다.",
                                disabled: true,
                            })}
                        />
                    </div>
                    <div className="flex mb-3 text-md">
                        <div className="w-1/3">
                            <div className="text-lg">NAME</div>
                            <div className="text-sm">예약자</div>
                        </div>
                        <input
                            className="bg-[#7C7C7C] p-2"
                            {...register("reservedBy", {
                                required: "이름은 필수 입력 항목입니다.",
                            })}
                        />
                    </div>
                    <div className="flex mb-3">
                        <div className="w-1/3">
                            <div className="text-lg">PLAYERS</div>
                            <div className="text-sm">인원선택</div>
                        </div>
                        <select
                            className="bg-[#7C7C7C] p-2"
                            {...register("participantCount", {
                                onChange: (event) => changePrice(Number(event.target.value)),
                            })}
                        >
                            {participantDraw()}
                        </select>
                    </div>
                    <div className="flex mb-3">
                        <div className="w-1/3">
                            <div className="text-lg">PRICE</div>
                            <div className="text-sm">가격</div>
                        </div>
                        <input className="bg-inherit p-2" value={price} disabled />
                    </div>
                    <div className="mb-3 text-2xl text-center font-bold">
                        <div>NOTICE</div>
                        <div>유의사항</div>
                    </div>
                    <div className="text-[#86e57f] text-xs mb-2">⏺ 휴대전화 번호가 정확하지 않을 경우 예약이 취소되니 유의해 주시기 바랍니다.</div>
                    <div className="text-[#86e57f] text-xs mb-2">⏺ 임산부, 노약자, 유아 어린이(13세미만)나 페소공포증, 심장질환 등의 질병이 있으신 분들은 예약전 전화문의 바랍니다.</div>
                    <div className="text-[#86e57f] text-xs mb-2">⏺ 예약취소는 예약시간 24시간 전까지만 가능합니다. 원활한 진행을 위해 게임 시작 10분 전까지 도착 부탁드립니다.</div>
                    <div className="flex justify-center mb-2">
                        <input id="privacy" type="checkbox" {...register("privacy", { required: true })} />
                        <label className="ml-1" htmlFor={"privacy"}>
                            개인정보 취급 방침에 동의함
                        </label>
                    </div>
                    <div className="flex mb-3">
                        <div className="w-1/3">
                            <div className="text-lg">PHONE</div>
                            <div className="text-sm">연락처</div>
                        </div>
                        <input
                            className="bg-[#7C7C7C] p-2"
                            {...register("phoneNumber", {
                                required: "전화번호는 필수 입력 항목입니다.",
                                pattern: {
                                    value: /^[0-9]{3}[0-9]{4}[-\s]?[0-9]{4}$/,
                                    message: "숫자만 입력 가능합니다.",
                                },
                            })}
                            placeholder="숫자만 입력 해주세요."
                        />
                        <button
                            className={`px-4 py-2 font-semibold text-white  bg-[#92c78c] w-1/5 text-sm ${isLoading && "opacity-50"}`} //
                            onClick={handleSubmit((data, e) => authenticatePhoneNumber(data, e))}
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
                                <div className="w-1/3">인증번호</div>
                                <input
                                    type="text"
                                    className="bg-[#7C7C7C] p-2"
                                    onInput={handleInput}
                                    {...register("authenticationNumber", {
                                        required: "인증번호는 필수 입력 항목입니다.",
                                        pattern: {
                                            value: /^[0-9]{6}$/,
                                            message: "숫자만 입력 가능합니다.",
                                        },
                                    })}
                                    placeholder="숫자만 입력 해주세요."
                                    maxLength={6}
                                />
                            </div>
                            <div className="text-red-500 text-xs mb-2"> * 인증번호 확인 후 예약하기를 눌러주세요.</div>
                        </>
                    )}
                </form>
                <button ref={reservationButton} onClick={handleSubmit(onSubmit)} className="p-4 bg-[#92c78c] w-2/5 opacity-50 cursor-not-allowed" disabled={isDisabled}>
                    예약하기
                </button>
            </div>
        </>
    );
}

export default ReservationModal;
