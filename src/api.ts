//백엔드 주소
import axios from "axios";

const BASE_URL = "https://api.xcape-apps.com";

export interface IMerchant {
    id: number;
    name: string;
    address: string;
    code: string;
    email: string;
    order: number;
    parkingYn: boolean;
    telNumber: string;
    businessHour: string;
    businessRegistrationNumber: string;
    ceoName: string;
}

export interface IReservation {
    resultCode: string;
    resultMessage: string;
    result: IReservationTheme[];
}

export interface IReservationTheme {
    themeId: number;
    themeNameKo: string;
    themeNameEn: string;
    mainImagePath: string;
    minParticipantCount: number;
    maxParticipantCount: number;
    difficulty: number;
    reservationList: ITimeTable[];
    colorCode: "";
    priceList: IPrice[];
}

export interface IPrice {
    id: number;
    person: number;
    price: number;
    themeId: number;
    type: string;
    useYn: boolean;
}

interface ITimeTable {
    id: number;
    time: string;
    date: string;
    isReserved: boolean;
    themeId: number;
    merchantId: number;
}

export interface ITheme {
    id: number;
    merchantId: number;
    nameKo: string;
    nameEn: string;
    mainImagePath: string;
    bgImagePath: string;
    timetable: string;
    description: string;
    minParticipantCount: number;
    maxParticipantCount: number;
    difficulty: number;
    genre: string;
    point: string;
    youtubeLink: string;
    colorCode: string;
    hasXKit: boolean;
    isCrimeScene: boolean;
    useYN: string;
    priceList: IPrice[];
    abilityList: IAbility[];
}

interface IAbility {
    id: number;
    key: string;
    name: string;
    type: string;
    value: number;
}

interface IReservationFormData {
    reservedBy: string;
    phoneNumber: string;
    participantCount: number;
    roomType: string;
}

export interface IReservationResponseData {
    date: string;
    id: number;
    isReserved: boolean;
    merchantId: number;
    merchantName: string;
    participantCount: number;
    phoneNumber: string;
    price: number;
    reservedBy: string;
    roomType: string;
    themeId: number;
    themeName: string;
    time: string;
}

// xcape 상단 지점 리스트 가져오기
export function getMerchantDetail(merchantId: number) {
    return axios.get(`${BASE_URL}/merchants/${merchantId}`).then((res) => res.data);
}

export function getThemeDetail(themeId: number) {
    return axios.get(`${BASE_URL}/themes/${themeId}`).then((res) => res.data);
}

export function getReservationList(merchantId: number, date: string) {
    return axios.get(`${BASE_URL}/reservations?merchantId=${merchantId}&date=${date}`).then((res) => res.data);
}

export function fetchReservationDetail(reservationId: number) {
    return fetch(`${BASE_URL}/reservations/${reservationId}`).then((response) => response.json());
}

export function fetchReservationPut(id: number, formData: IReservationFormData) {
    const url = `${BASE_URL}/reservations/${id}?reservedBy=${formData.reservedBy}&phoneNumber=${formData.phoneNumber}&participantCount=${formData.participantCount}&roomType=general`;

    return fetch(url, {
        method: "PUT",
        cache: "no-cache",
        headers: {
            "Content-Type": "application/json",
        },
    }).then((response) => response.json());
}
