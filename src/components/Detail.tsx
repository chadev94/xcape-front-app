import { useRecoilValue } from "recoil";
import { reservationDetail } from "../atom";
import { IFormData } from "./Reservation";
import {
    DetailContent,
    DetailHr,
    DetailNotice,
    DetailNoticeWrapper,
    DetailTitle,
    DetailWrapper,
    NoticeContent,
    ReservationWrapper,
    RowWrapper,
} from "./styled/reservationStyled";

interface IDetailProps {
    reservationFormData?: IFormData;
}

function Detail({ reservationFormData }: IDetailProps): React.ReactElement {
    const value = useRecoilValue(reservationDetail);
    console.log(value);
    return (
        <ReservationWrapper>
            <DetailWrapper>
                <RowWrapper>
                    <DetailTitle>예약지점명</DetailTitle>
                    <DetailContent>건대점</DetailContent>
                </RowWrapper>
                <RowWrapper>
                    <DetailTitle>예약번호</DetailTitle>
                    <DetailContent>{reservationFormData?.time}</DetailContent>
                </RowWrapper>
                <RowWrapper>
                    <DetailTitle>날짜</DetailTitle>
                    <DetailContent>
                        {reservationFormData?.curDate}
                    </DetailContent>
                </RowWrapper>
                <RowWrapper>
                    <DetailTitle>테마</DetailTitle>
                    <DetailContent>
                        {reservationFormData?.themeNameKo}
                    </DetailContent>
                </RowWrapper>
                <RowWrapper>
                    <DetailTitle>예약자</DetailTitle>
                    <DetailContent>{value.reservedBy}</DetailContent>
                </RowWrapper>
                <RowWrapper>
                    <DetailTitle>연락처</DetailTitle>
                    <DetailContent>{value.phoneNumber}</DetailContent>
                </RowWrapper>
                <RowWrapper>
                    <DetailTitle>인원선택</DetailTitle>
                    <DetailContent>{value.participantCount}</DetailContent>
                </RowWrapper>
                <RowWrapper>
                    <DetailTitle>가격</DetailTitle>
                    <DetailContent>44000</DetailContent>
                </RowWrapper>
                <DetailNotice>유의사항</DetailNotice>
                <NoticeContent>
                    ⏺ 휴대전화 번호가 정확하지 않을 경우 예약이 취소되니 유의해
                    주시기바랍니다.
                </NoticeContent>
                <NoticeContent>
                    ⏺ 임산부, 노약자, 유아 어린이(13세미만)나 폐소공포증,
                    심장질환 등의 질병이 있으신 분들은 예약전 전화문의 바랍니다.
                </NoticeContent>
                <NoticeContent>
                    ⏺ 예약취소는 예약시간 24시간 전까지만 가능합니다.
                </NoticeContent>
                <NoticeContent>
                    ⏺ 원활한 진행을 위해 게임 시작 10분 전까지 도착
                    부탁드립니다.
                </NoticeContent>
                <NoticeContent>
                    ⏺ 예약취소 및 환불은 게임시작 30분전까지 가능합니다.
                </NoticeContent>
            </DetailWrapper>
        </ReservationWrapper>
    );
}

export default Detail;
