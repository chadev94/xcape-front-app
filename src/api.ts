//백엔드 주소
import axios from "axios";

const BASE_URL = process.env.REACT_APP_API_HOST;
const BASE_NODE_SERVER_URL = process.env.REACT_APP_NODE_SERVER_HOST;

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
    businessIcon: string;
    brandInfoNotionId: string;
    usingInfoNotionId: string;
    addressNotionId: string;
}

// export interface IReservation {
//     resultCode: string;
//     resultMessage: string;
//     result: IReservationTheme[];
// }

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
    id: string;
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

export interface IAbility {
    id: number;
    key: string;
    name: string;
    type: string;
    value: number;
    merchantId: number;
    themeId: number;
}

interface IReservationFormData {
    reservedBy: string;
    phoneNumber: string;
    participantCount: number;
}

export interface IReservationResponseData {
    date: string;
    seq: number;
    id: string;
    isReserved: boolean;
    merchantId: number;
    merchantName: string;
    participantCount: number;
    phoneNumber: string;
    price: number;
    reservedBy: string;
    themeId: number;
    themeName: string;
    time: string;
    type: string;
}

export interface IBanner {
    id: number;
    imagePath: string;
    link?: string;
    description?: string;
    type?: string;
    sequence?: number;
    useYn: boolean;
    merchantId?: number;
}

export interface IReservationHistoryTable {
    reservationHistoryId: string;
    themeName: string;
    date: string;
    time: string;
    participantCount: number;
    reservationId: string;
    reservedBy: string;
    type: string;
}

export interface IReservation {
    id: string;
    date: string;
    isReserved: boolean;
    merchantId: number;
    merchantName: string;
    participantCount: number;
    phoneNumber: string;
    price: number;
    reservedBy: string;
    seq: number;
    themeId: number;
    themeName: string;
    time: string;
}

export function getMerchantsInfo() {
    return axios.get(`${BASE_URL}/merchants`).then((res) => res.data);
}

export function getThemesInfo() {
    return axios.get(`${BASE_URL}/themes`).then((res) => res.data);
}

export function getBannersInfo() {
    return axios.get(`${BASE_URL}/banners`).then((res) => res.data);
}

export function getAbilitiesInfo() {
    return axios.get(`${BASE_URL}/abilities`).then((res) => res.data);
}

export function saveFile(path: String, data: JSON) {
    let req = { path, data };
    return axios
        .post(`${BASE_NODE_SERVER_URL}/save-file`, req, {
            headers: {
                "Content-Type": `application/json`,
            },
        })
        .then((res) => res.data);
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

export function getReservationHistoryDetail(reservationHistoryId: string) {
    return axios.get(`${BASE_URL}/reservation-histories/${reservationHistoryId}`).then((res) => {
        return res.data;
    });
}

export async function modifyReservation(id: string, params: IReservationFormData) {
    return axios.put(`${BASE_URL}/reservations/${id}`, params).then((res) => res.data);
}

export async function deleteReservation(id: string, params: object) {
    return axios.delete(`${BASE_URL}/reservations/${id}`, { data: params }).then((res) => res.data);
}

export async function getReservationListByPhoneNumber(phoneNumber: string) {
    return axios.get(`${BASE_URL}/reservation-histories`, { params: { phoneNumber } }).then((res) => res.data);
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

export function fetchReservationAuthenticatePhoneNumber(formData: { reservationId: string; recipientNo: string }) {
    const url = `${BASE_URL}/reservations/authentication`;

    return axios
        .post(url, formData, {
            headers: {
                "Content-Type": `application/json`,
            },
        })
        .then((res) => res.data);
}
