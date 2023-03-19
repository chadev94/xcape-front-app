import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useMediaQuery } from "react-responsive";
import { Form, useNavigate } from "react-router-dom";
import { useResetRecoilState, useSetRecoilState } from "recoil";
import { fetchReservationPut } from "../api";
import { reservationDetail } from "../atom";
import { IFormData } from "./Reservation";
import {
    Accept,
    CheckBox,
    CheckBoxRow,
    FormEnTitle,
    FormKrTitle,
    FormWrapper,
    Overlay,
    Privacy,
    Row,
    Select,
    SelectDate,
    SelectTheme,
    SelectTime,
    TitleWrapper,
    UserName,
    UserPhone,
} from "./styled/reservationStyled";

interface IModalProps {
    reservationFormData?: IFormData;
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

function ReservationModal({
    reservationFormData,
}: IModalProps): React.ReactElement {
    const navigate = useNavigate();
    const setDetail = useSetRecoilState(reservationDetail) as any;
    const isPortrait = useMediaQuery({ query: "(orientation: portrait)" });

    const {
        register,
        handleSubmit,
        formState: { errors },
        setError,
    } = useForm<IForm>({ defaultValues: {} });

    const onVaild = (inputData: IForm) => {
        console.log(inputData);
        const formData = {
            phoneNumber: inputData.phoneNumber,
            reservedBy: inputData.reservedBy,
            participantCount: Number(inputData.participantCount),
            roomType: "general",
        };
        setDetail(formData);
        if (reservationFormData?.time)
            fetchReservationPut(reservationFormData?.time, formData).then(
                (response) => {
                    console.log(response);
                    navigate(`detail/${reservationFormData?.time}`);
                }
            );
    };

    const onOverlayClick = () => navigate(-1);

    const participantDraw = () => {
        const maxParticipant = reservationFormData?.maxParticipant;
        const minParticipant = reservationFormData?.minParticipant;
        const participantSelect = [];
        if (maxParticipant && minParticipant) {
            for (
                let num: number = minParticipant;
                num <= maxParticipant;
                num++
            ) {
                participantSelect.push(<option value={num}>{num}</option>);
            }
        }

        return participantSelect;
    };

    return (
        <>
            <Overlay
                onClick={onOverlayClick}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
            />
            <FormWrapper
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                isPortrait={isPortrait}
            >
                <Form onSubmit={handleSubmit(onVaild)}>
                    <Row>
                        <TitleWrapper isPortrait={isPortrait}>
                            <FormEnTitle>DATE</FormEnTitle>
                            <FormKrTitle>날짜</FormKrTitle>
                        </TitleWrapper>
                        <SelectDate
                            value={reservationFormData?.curDate}
                            disabled
                        />
                    </Row>
                    <Row>
                        <TitleWrapper isPortrait={isPortrait}>
                            <FormEnTitle>TIME</FormEnTitle>
                            <FormKrTitle>시간</FormKrTitle>
                        </TitleWrapper>
                        <SelectTime
                            value={reservationFormData?.realTime}
                            {...register("time", {
                                required: "테마는 필수 입력 항목입니다.",
                                disabled: true,
                            })}
                        />
                    </Row>
                    <Row>
                        <TitleWrapper isPortrait={isPortrait}>
                            <FormEnTitle>ROOM</FormEnTitle>
                            <FormKrTitle>테마</FormKrTitle>
                        </TitleWrapper>
                        <SelectTheme
                            value={reservationFormData?.themeNameKo}
                            {...register("themeName", {
                                required: "테마는 필수 입력 항목입니다.",
                                disabled: true,
                            })}
                        />
                    </Row>
                    <Row>
                        <TitleWrapper isPortrait={isPortrait}>
                            <FormEnTitle>NAME</FormEnTitle>
                            <FormKrTitle>예약자</FormKrTitle>
                        </TitleWrapper>
                        <UserName
                            {...register("reservedBy", {
                                required: "이름은 필수 입력 항목입니다.",
                            })}
                        />
                    </Row>
                    <Row>
                        <TitleWrapper isPortrait={isPortrait}>
                            <FormEnTitle>PHONE</FormEnTitle>
                            <FormKrTitle>연락처</FormKrTitle>
                        </TitleWrapper>
                        <UserPhone
                            {...register("phoneNumber", {
                                required: "전화번호는 필수 입력 항목입니다.",
                                pattern: {
                                    value: /^[0-9]{3}[0-9]{4}[-\s\.]?[0-9]{4}$/,
                                    message: "숫자만 입력 가능합니다.",
                                },
                            })}
                            placeholder="숫자만 입력 해주세요."
                        />
                    </Row>
                    <Row notice={true}>
                        * 입력하신 연락처로 예약취소&변경이 가능하니 신중히 입력
                        부탁드립니다.
                    </Row>
                    <Row notice={true}>
                        * 체험 당일 예약 확인을 위하여 입력하신 번호로 전화 또는
                        문자를 드립니다. 답변이 없을시 예약이 자동 취소됩니다.
                    </Row>
                    <Row>
                        <TitleWrapper isPortrait={isPortrait}>
                            <FormEnTitle>PLAYERS</FormEnTitle>
                            <FormKrTitle>인원선택</FormKrTitle>
                        </TitleWrapper>
                        <Select {...register("participantCount")}>
                            {participantDraw()}
                        </Select>
                    </Row>
                    <Row>
                        <TitleWrapper isPortrait={isPortrait}>
                            <FormEnTitle>PRICE</FormEnTitle>
                            <FormKrTitle>가격</FormKrTitle>
                        </TitleWrapper>
                    </Row>
                    <Row>
                        <TitleWrapper isPortrait={isPortrait} center={true}>
                            <FormEnTitle>NOTICE</FormEnTitle>
                            <FormKrTitle>유의사항</FormKrTitle>
                        </TitleWrapper>
                    </Row>
                    <Row notice={true}>
                        휴대전화 번호가 정확하지 않을 경우 예약이 취소되니
                        유의해 주시기 바랍니다.
                    </Row>
                    <Row notice={true}>
                        임산부, 노약자, 유아 어린이(13세미만)나 페소공포증,
                        심장질환 등의 질병이 있으신 분들은 예약전 전화문의
                        바랍니다.
                    </Row>
                    <Row notice={true}>
                        예약취소는 예약시간 24시간 전까지만 가능합니다. 원활한
                        진행을 위해 게임 시작 10분 전까지 도착 부탁드립니다.
                    </Row>
                </Form>
                <CheckBoxRow>
                    <CheckBox
                        type="checkbox"
                        {...register("privacy", { required: true })}
                    />
                    <Privacy>개인정보 취급 방침에 동의함</Privacy>
                </CheckBoxRow>
                <Accept onClick={handleSubmit(onVaild)}>예약하기</Accept>
            </FormWrapper>
        </>
    );
}

export default ReservationModal;
