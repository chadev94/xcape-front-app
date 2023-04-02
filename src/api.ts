//백엔드 주소
const BASE_URL = "https://api.xcape-apps.com";

interface test {
    resultMessage: string;
    resultCode: string;
}

export interface IGetMerchants {
    result: IMerchants[];
    resultCode: string;
    resultMessage: string;
}

export interface IMerchants {
    address: string;
    id: number;
    name: string;
    themeList: ITheme[];
}

export interface IMerchant {
    id: number;
    name: string;
    address: string;
    result: IMerchants;
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
    // colorCode
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
    reservationList: string;
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

// xcape 상단 지점 리스트 가져오기
export function fetchMerchantListWithThemeList() {
    return fetch(`${BASE_URL + "/merchants"}`).then((response) => response.json());
}

export function fetchMerchantThemeList(merchantId: number) {
    return fetch(`${BASE_URL + "/merchants/" + merchantId}`).then((response) => response.json());
}

export function fetchReservation(merchantId: number, date: string) {
    return fetch(`${BASE_URL}/reservations?merchantId=${merchantId}&date=${date}`).then((response) => response.json());
}

export function fetchReservationPut(id: number, formData: IReservationFormData) {
    const url = `${BASE_URL}/reservations/${id}?reservedBy=${formData.reservedBy}&phoneNumber=${formData.phoneNumber}&participantCount=${formData.participantCount}&roomType=general`;

    return fetch(url, {
        method: "PUT",
        cache: "no-cache",
        headers: {
            "Content-Type": "application/json",
        },
    }).then((response) => {
        response.json();
    });
}
