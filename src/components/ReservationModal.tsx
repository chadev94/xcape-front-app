import React, { useEffect, useRef, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { fetchReservationAuthenticatePhoneNumber, modifyReservation } from "../api";
import { IFormData } from "../pages/Reservation";
import { formatPrice, formatTimeString, onlyNumber } from "../util/util";
import { GENERAL, OPEN_ROOM, SUCCESS } from "../util/constant";
import AuthenticationTimer from "./AuthenticationTimer";
import Warning from "./Warning";

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
    authenticationCode: number;
    requestId: string;
    isOpenRoom: boolean;
}

function ReservationModal({ reservationFormData, onOverlayFunction }: IModalProps): React.ReactElement {
    const navigate = useNavigate();
    const [price, setPrice] = useState("000 원");
    const [isOpenRoom, setIsOpenRoom] = useState<boolean>(false);
    const [reservationIsLoading, setReservationIsLoading] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isDisabled, setIsDisabled] = useState<boolean>(true);
    const [requestId, setRequestId] = useState<string>();

    const participantCountRef = useRef<HTMLSelectElement | null>(null);
    const isOpenRoomRef = useRef<HTMLInputElement | null>(null);
    const reservationButton = useRef<HTMLButtonElement>(null);

    let interval: NodeJS.Timer;
    const timeRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (reservationFormData.roomType === OPEN_ROOM) {
            setIsOpenRoom(true);
            if (isOpenRoomRef.current) {
                isOpenRoomRef.current.checked = true;
                isOpenRoomRef.current.onclick = (e) => e.preventDefault();
            }
        }
    }, []);

    useEffect(() => {
        if (participantCountRef.current) {
            participantCountRef.current.value = participantCountRef.current?.options[0].value;
        }

        changePrice(Number(participantCountRef.current?.value));
    }, [isOpenRoom]);

    const { register, handleSubmit } = useForm<IForm>({ defaultValues: {} });
    const { ref: participantCountRegisterRef, ...participantRegister } = register("participantCount");
    const { ref: isOpenRoomRegisterRef, ...isOpenRoomRegister } = register("isOpenRoom");

    const onSubmit: SubmitHandler<IForm> = (inputData: IForm) => {
        setReservationIsLoading(true);
        const formData = {
            phoneNumber: inputData.phoneNumber,
            reservedBy: inputData.reservedBy,
            participantCount: Number(participantCountRef.current!.value),
            authenticationCode: inputData.authenticationCode,
            roomType: isOpenRoom ? OPEN_ROOM : GENERAL,
            price: price.slice(0, price.length - 1),
            requestId,
        };

        modifyReservation(reservationFormData.reservationId, formData).then((res) => {
            if (res.resultCode === SUCCESS) {
                setReservationIsLoading(false);
                navigate(`/reservation-detail/${res.result.id}`);
                onOverlayClick();
            } else {
                setReservationIsLoading(false);
                alert(res.resultMessage);
            }
        });
    };

    const authenticatePhoneNumber = (inputData: IForm, e: React.BaseSyntheticEvent | undefined) => {
        const formData = {
            recipientNo: inputData.phoneNumber,
            reservationId: reservationFormData?.reservationId,
        };
        setIsLoading(true);

        let afterThreeMinutes: Date = new Date(Date.parse(String(new Date())) + 60 * 3 * 1000);
        interval = setInterval(() => {
            const time = afterThreeMinutes.getTime() - new Date().getTime();
            if (timeRef.current) {
                timeRef.current.textContent = formatTimeString(time, false);
            }
        });

        e!.target.classList.add("cursor-now-allowed");
        e!.target.disabled = true;

        fetchReservationAuthenticatePhoneNumber(formData).then((res) => {
            const { result, resultMessage } = res;
            if (!result) {
                alert(resultMessage);
                setIsLoading(false);
                setReservationIsLoading(false);
                e!.target.classList.remove("cursor-now-allowed");
                e!.target.disabled = false;
            } else {
                setRequestId(res.result.requestId);
            }
        });
    };

    const onOverlayClick = () => onOverlayFunction(false);

    const participantDraw = () => {
        const participantSelect = [];
        const maxParticipant = reservationFormData?.maxParticipantCount;
        const minParticipant = reservationFormData?.minParticipantCount;

        if (isOpenRoom) {
            const canParticipantCount = reservationFormData.participantCount
                ? maxParticipant - reservationFormData.participantCount
                : maxParticipant;

            for (let num = 1; num <= canParticipantCount; num++) {
                participantSelect.push(
                    <option key={num} value={num}>
                        {num}
                    </option>
                );
            }
        } else {
            if (maxParticipant && minParticipant) {
                for (let num = minParticipant; num <= maxParticipant; num++) {
                    participantSelect.push(
                        <option key={num} value={num}>
                            {num}
                        </option>
                    );
                }
            }
        }

        return participantSelect;
    };

    const changePrice = (value: number) => {
        let price;

        if (isOpenRoom) {
            price = convertOpenRoomPrice(value);
        } else {
            const findPrice = reservationFormData.priceList.find((element) => element.person === value);
            price = findPrice!.price;
        }
        setPrice(formatPrice(String(price)) + "원");
    };

    const convertOpenRoomPrice = (participantCount: number) => {
        if (participantCount === 4) {
            return 100000;
        } else if (participantCount === 5) {
            return 115000;
        } else if (participantCount === 6) {
            return 138000;
        }

        return participantCount * 24000;
    };

    const handleInputPhoneNumber = (e: React.KeyboardEvent<HTMLInputElement>) => {
        onlyNumber(e.currentTarget);
    };

    const handleInput = (e: React.KeyboardEvent<HTMLInputElement>) => {
        onlyNumber(e.currentTarget);
        if (e.currentTarget.value.length === 6) {
            reservationButton.current!.classList.remove("cursor-not-allowed");
            reservationButton.current!.classList.remove("opacity-50");
            setIsDisabled(false);
        } else {
            reservationButton.current!.classList.add("cursor-not-allowed");
            reservationButton.current!.classList.add("opacity-50");
            setIsDisabled(true);
        }
    };

    return (
        <>
            <div
                className="bg-black fixed top-0 w-full h-full transition-all delay-100 duration-700 ease-in opacity-50"
                onClick={onOverlayClick}
            />
            <div className="bg-[#4a4a4a] rounded-md fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-11/12 lg:w-1/2 h-4/5 lg:h-fit overflow-auto text-white text-center">
                <header className="sticky bg-[#18181b] site-header flex h-12 w-full items-center justify-between legacyFixed top-0 left-0 z-40 px-5 py-3 duration-[250ms] border-solid border-b-[1px] bg-primary-white border-[rgba(0,0,0,0)]">
                    <div className="grid grid-cols-[min-content_1fr] gap-4 fc-direction-rtl invisible">
                        <button type="button" className="h-6 hover:cursor-pointer hover:bg-[#363636]">
                            <svg width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M19 12H5M19 18H5"
                                    stroke="#2E2C2C"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                ></path>
                                <path
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                    d="M14.006 5.25H5a.75.75 0 000 1.5h9.315a4.98 4.98 0 01-.309-1.5z"
                                    fill="#2E2C2C"
                                ></path>
                                <path
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                    d="M19 8.5a3.5 3.5 0 100-7 3.5 3.5 0 000 7z"
                                    fill="#F4733A"
                                ></path>
                            </svg>
                        </button>
                    </div>
                    <h1 className="font-bold text-lg truncate text-center mx-7 min-w-0 flex-1 typography-16">
                        예약하기
                    </h1>
                    <div className="grid grid-cols-[min-content_1fr]">
                        <button className="flex items-center p-0" type="button" onClick={onOverlayClick}>
                            <svg width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M5 5l14 14M19 5L5 19"
                                    stroke="white"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                ></path>
                            </svg>
                        </button>
                    </div>
                </header>
                <Warning content={"전화번호 형식이 맞지 않습니다."} />
                <form className="pt-6" onSubmit={handleSubmit(onSubmit)} autoComplete="off">
                    <div className="flex mb-3">
                        <div className="w-1/3">
                            <div className="text-base lg:text-lg">DATE</div>
                            <div className="text-xs lg:text-md">날짜</div>
                        </div>
                        <input className="bg-inherit" defaultValue={reservationFormData?.curDate} disabled />
                    </div>
                    <div className="flex mb-3">
                        <div className="w-1/3">
                            <div className="text-base lg:text-lg">TIME</div>
                            <div className="text-xs lg:text-md">시간</div>
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
                            <div className="text-base lg:text-lg">ROOM</div>
                            <div className="text-xs lg:text-md">테마</div>
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
                            <div className="text-base lg:text-lg">NAME</div>
                            <div className="text-xs lg:text-md">예약자</div>
                        </div>
                        <input
                            className="bg-[#7C7C7C] p-2 w-1/2"
                            {...register("reservedBy", {
                                required: "이름은 필수 입력 항목입니다.",
                            })}
                        />
                    </div>
                    {reservationFormData.isCrimeScene ? (
                        <div className="flex mb-3 text-md">
                            <div className="w-1/3">
                                <div className="text-base lg:text-lg">OPEN ROOM</div>
                                <div className="text-xs lg:text-md">오픈룸</div>
                            </div>
                            <input
                                className="bg-[#7C7C7C] p-2 w-1/2"
                                type="checkbox"
                                ref={(e) => {
                                    isOpenRoomRegisterRef(e);
                                    isOpenRoomRef.current = e;
                                }}
                                {...isOpenRoomRegister}
                                onChange={(e) => {
                                    if (reservationFormData.roomType === OPEN_ROOM) {
                                        e.preventDefault();
                                    } else {
                                        setIsOpenRoom(e.currentTarget.checked);
                                    }
                                }}
                            />
                        </div>
                    ) : null}
                    <div className="flex mb-3">
                        <div className="w-1/3">
                            <div className="text-base lg:text-lg">PLAYERS</div>
                            <div className="text-xs lg:text-md">인원선택</div>
                        </div>
                        <select
                            className="bg-[#7C7C7C] p-2 w-1/2"
                            {...participantRegister}
                            ref={(e) => {
                                participantCountRegisterRef(e);
                                participantCountRef.current = e;
                            }}
                            onChange={(e) => {
                                changePrice(Number(e.currentTarget.value));
                            }}
                        >
                            {participantDraw()}
                        </select>
                    </div>
                    <div className="flex mb-3">
                        <div className="w-1/3">
                            <div className="text-base lg:text-lg">PRICE</div>
                            <div className="text-xs lg:text-md">가격</div>
                        </div>
                        <div className="p-2">{price}</div>
                    </div>
                    <div className="flex justify-center mb-2">
                        <input id="privacy" type="checkbox" {...register("privacy", { required: true })} />
                        <label className="ml-1" htmlFor={"privacy"}>
                            개인정보 취급 방침에 동의함
                        </label>
                    </div>
                    <div className="flex mb-3">
                        <div className="w-1/5 text-right mr-2 sm:mr-8">
                            <div className="text-base lg:text-lg">PHONE</div>
                            <div className="text-xs lg:text-md">연락처</div>
                        </div>
                        <input
                            className="bg-[#7C7C7C] p-2 w-2/5 sm:w-1/3 text-xs md:text-base"
                            pattern="\d*"
                            onInput={handleInputPhoneNumber}
                            {...register("phoneNumber", {
                                required: "전화번호는 필수 입력 항목입니다.",
                                pattern: {
                                    value: /^[0-9]{3}[0-9]{4}[-\s]?[0-9]{4}$/,
                                    message: "숫자만 입력 가능합니다.",
                                },
                            })}
                            maxLength={11}
                            placeholder="숫자만 입력 해주세요."
                        />
                        <button
                            className={`py-2 font-semibold text-black bg-[#fff200] w-1/3 sm:w-1/5 text-xs md:text-md ${
                                isLoading ? "opacity-50" : ""
                            }`} //
                            onClick={handleSubmit((data, e) => authenticatePhoneNumber(data, e))}
                        >
                            {isLoading ? (
                                <div className="flex items-center justify-center">
                                    <svg
                                        className="animate-spin mr-2 h-5 w-5 text-white"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                    >
                                        <circle
                                            className="opacity-25"
                                            cx="12"
                                            cy="12"
                                            r="10"
                                            stroke="currentColor"
                                            strokeWidth="4"
                                        ></circle>
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
                                <div className="w-1/5 text-right mr-2 sm:mr-8">인증번호</div>
                                <input
                                    type="text"
                                    className="bg-[#7C7C7C] p-2 w-2/5 sm:w-1/3"
                                    onInput={handleInput}
                                    {...register("authenticationCode", {
                                        required: "인증번호는 필수 입력 항목입니다.",
                                        pattern: {
                                            value: /^[0-9]{6}$/,
                                            message: "숫자만 입력 가능합니다.",
                                        },
                                    })}
                                    placeholder="숫자만 입력 해주세요."
                                    maxLength={6}
                                    autoComplete="off"
                                />
                                <button
                                    ref={reservationButton}
                                    onClick={handleSubmit(onSubmit)}
                                    className={`py-2 bg-[#fff200] text-black w-1/3 sm:w-1/5 opacity-50 cursor-not-allowed ${
                                        reservationIsLoading ? "opacity-50" : ""
                                    }`}
                                    disabled={isDisabled || reservationIsLoading}
                                >
                                    {reservationIsLoading ? (
                                        <div className="flex items-center justify-center">
                                            <svg
                                                className="animate-spin mr-2 h-5 w-5 text-white"
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                            >
                                                <circle
                                                    className="opacity-25"
                                                    cx="12"
                                                    cy="12"
                                                    r="10"
                                                    stroke="currentColor"
                                                    strokeWidth="4"
                                                ></circle>
                                                <path
                                                    className="opacity-75"
                                                    fill="currentColor"
                                                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                                ></path>
                                            </svg>
                                            예약하기
                                        </div>
                                    ) : (
                                        <>예약하기</>
                                    )}
                                </button>
                            </div>
                            <div className="text-center">
                                <AuthenticationTimer />
                                <div className="text-red-500 text-xs mb-2">
                                    * 카카오톡 인증번호 확인 후 예약하기를 눌러주세요.
                                </div>
                            </div>
                        </>
                    )}
                    <div className="mb-3 text-2xl text-center font-bold">
                        <div>NOTICE</div>
                        <div>유의사항</div>
                    </div>
                    <div className="text-start w-full sm:w-3/4 m-auto text-[#fff200] pl-5 pr-5">
                        <div className="text-xs mb-2">
                            ⏺ 테마 시작 10분 전 도착하셔야 시간 차감 없이 진행이 가능합니다. 지각 시 자동 시간
                            차감됩니다.
                        </div>
                        <div className="text-xs mb-2">⏺ 예약취소는 예약 시간 24시간 전까지만 가능합니다.</div>
                        <div className="text-xs mb-2">
                            ⏺ 휴대전화 번호가 정확하지 않을 경우 예약이 취소되니 유의해 주시기 바랍니다.
                        </div>
                        <div className="text-xs mb-2">
                            ⏺ 임산부, 노약자, 유아 어린이(13세 미만)나 폐소공포증, 심장질환 등의 질병이 있으신 분들은
                            예약 전 전화 문의 바랍니다.
                        </div>
                    </div>
                </form>
            </div>
        </>
    );
}

export default ReservationModal;
