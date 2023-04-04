import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { fetchReservationPut, IPrice, IReservationResponseData } from "../api";
import { reservationDetail } from "../atom";
import { IFormData } from "./Reservation";

interface IModalProps {
    reservationFormData?: IFormData;
    onOverlayFunction: React.Dispatch<React.SetStateAction<boolean>>;
}

interface IForm {
    date: string;
    time: string;
    themeName: string;
    reservedBy: string;
    phoneNumber: string;
    participantCount: number;
    privacy: Boolean;
}

interface IDetail {
    phoneNumber: String;
    reservedBy: String;
    participantCount: Number;
    roomType: String;
}

function ReservationModal({ reservationFormData, onOverlayFunction }: IModalProps): React.ReactElement {
    const navigate = useNavigate();
    const setDetail = useSetRecoilState(reservationDetail) as any;
    const [reservationResponseData, setReservationResponseData] = useState<IReservationResponseData>();
    const [price, setPrice] = useState("000 원");

    useEffect(() => {
        changePrice(2);
    }, [reservationResponseData]);

    const {
        register,
        handleSubmit,
        formState: { errors },
        setError,
    } = useForm<IForm>({ defaultValues: {} });

    const onVaild = (inputData: IForm) => {
        const formData = {
            phoneNumber: inputData.phoneNumber,
            reservedBy: inputData.reservedBy,
            participantCount: Number(inputData.participantCount),
            roomType: "general",
        };
        setDetail(formData);
        if (reservationFormData?.time)
            fetchReservationPut(reservationFormData?.time, formData).then((res) => {
                setReservationResponseData(res.result);
                navigate(`/ku/reservation-detail/${res.result.id}`);
            });
        onOverlayClick();
    };

    const onOverlayClick = () => onOverlayFunction(false);

    const participantDraw = () => {
        const maxParticipant = reservationFormData?.maxParticipantCount;
        const minParticipant = reservationFormData?.minParticipantCount;
        const participantSelect = [];
        if (maxParticipant && minParticipant) {
            for (let num: number = minParticipant; num <= maxParticipant; num++) {
                participantSelect.push(<option value={num}>{num}</option>);
            }
        }

        return participantSelect;
    };

    const changePrice = (value: number) => {
        const findPrice = reservationFormData?.priceList.find((element) => {
            if (element.type == "general" && element.person == value) {
                return true;
            }
        }) as IPrice;

        let price = findPrice.price;
        setPrice(price.toLocaleString(navigator.language) + "원");
    };

    return (
        <>
            <div className="bg-black fixed top-0 w-full h-full transition-all delay-100 duration-700 ease-in opacity-50" onClick={onOverlayClick} />
            <div className="bg-[#4a4a4a] rounded-md fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-2 w-11/12 lg:w-1/2 h-4/5 lg:h-fit overflow-auto text-white text-center">
                <form onSubmit={handleSubmit(onVaild)}>
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
                            <div className="text-lg">PHONE</div>
                            <div className="text-sm">연락처</div>
                        </div>
                        <input
                            className="bg-[#7C7C7C] p-2"
                            // onChange={(e) => {handleOnChange(e)}
                            {...register("phoneNumber", {
                                required: "전화번호는 필수 입력 항목입니다.",
                                // onChange: handleOnChange,
                                validate: {
                                    positive: (v) => parseInt(v) > 0,
                                    lessThanTen: (v) => parseInt(v) < 10,
                                    validateNumber: (_, values) => !!values.phoneNumber,
                                },
                                pattern: {
                                    value: /^[0-9]{3}[0-9]{4}[-\s]?[0-9]{4}$/,
                                    message: "숫자만 입력 가능합니다.",
                                },
                            })}
                            placeholder="숫자만 입력 해주세요."
                        />
                    </div>
                    <div className="text-[#86e57f] text-xs mb-2">* 입력하신 연락처로 예약취소&변경이 가능하니 신중히 입력 부탁드립니다.</div>
                    <div className="text-[#86e57f] text-xs mb-2">* 체험 당일 예약 확인을 위하여 입력하신 번호로 전화 또는 문자를 드립니다. 답변이 없을시 예약이 자동 취소됩니다.</div>
                    <div className="flex mb-3">
                        <div className="w-1/3">
                            <div className="text-lg">PLAYERS</div>
                            <div className="text-sm">인원선택</div>
                        </div>
                        <select
                            className="bg-[#7C7C7C] p-2"
                            {...register("participantCount", {
                                onChange: (event) => changePrice(event.target.value),
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
                        <input className="bg-inherit p-2" defaultValue={price} disabled />
                    </div>
                    <div className="mb-3 text-2xl text-center font-bold">
                        <div>NOTICE</div>
                        <div>유의사항</div>
                    </div>
                    <div className="text-[#86e57f] text-xs mb-2">휴대전화 번호가 정확하지 않을 경우 예약이 취소되니 유의해 주시기 바랍니다.</div>
                    <div className="text-[#86e57f] text-xs mb-2">임산부, 노약자, 유아 어린이(13세미만)나 페소공포증, 심장질환 등의 질병이 있으신 분들은 예약전 전화문의 바랍니다.</div>
                    <div className="text-[#86e57f] text-xs mb-2">예약취소는 예약시간 24시간 전까지만 가능합니다. 원활한 진행을 위해 게임 시작 10분 전까지 도착 부탁드립니다.</div>
                </form>
                <div className="flex justify-center mb-2">
                    <input id={"privacy"} type="checkbox" {...register("privacy", { required: true })} />
                    <label className="ml-1" htmlFor={"privacy"}>
                        개인정보 취급 방침에 동의함
                    </label>
                </div>
                <button className="p-4 bg-[#92c78c] w-2/5" onClick={handleSubmit(onVaild)}>
                    예약하기
                </button>
            </div>
        </>
    );
}

export default ReservationModal;
