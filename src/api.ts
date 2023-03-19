//백엔드 주소
const BASE_URL = "http://xcape-api.ap-northeast-1.elasticbeanstalk.com";
//http://xcape-api.ap-northeast-1.elasticbeanstalk.com/merchants/1/reservations?date=2023-02-13

//http://xcape-api.ap-northeast-1.elasticbeanstalk.com/merchants/1/reservations?date=2023-02-08

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

interface IReservationTheme {
    themeId: number;
    themeNameKo: string;
    themeNameEn: string;
    mainImagePath: string;
    minParticipant: number;
    maxParticipant: number;
    difficulty: number;
    reservationInfos: ITimeTable[];
}

interface ITimeTable {
    id: number;
    time: string;
    date: string;
    isReserved: boolean;
    themeId: number;
    merchantId: number;
}

interface ITheme {
    merchantId: number;
    nameKo: string;
    nameEn: string;
    mainImagePath: string;
    bgImagePath: string;
    timetable: string;
    description: string;
    reasoning: number;
    observation: number;
    activity: number;
    teamwork: number;
    minParticipantCount: number;
    maxParticipantCount: number;
    difficulty: number;
    genre: string;
    point: string;
    youtubeLink: string;
    colorCode: string;
    hasXKit: Boolean;
    isCrimeScene: Boolean;
    useYN: string;
    reservationDtos: string;
    ablity: IAbility[];
}

interface IAbility {
    codeId: number;
    key: string;
    name: string;
    type: string;
}

interface IReservationFormData {
    reservedBy: string;
    phoneNumber: string;
    participantCount: number;
    roomType: string;
}

// xcape 상단 지점 리스트 가져오기
export function fetchMerchantList() {
    return fetch(`${BASE_URL + "/merchants"}`).then((response) =>
        response.json()
    );
}

export function fetchMerchantThemeList(merchantId: number) {
    return fetch(`${BASE_URL + "/merchants/" + merchantId}`).then((response) =>
        response.json()
    );
}

export function fetchReservation(merchantId: number, date: string) {
    return fetch(
        `${
            BASE_URL +
            "/merchants/" +
            merchantId +
            "/reservations?date=" +
            "2023-02-08"
        }`
    ).then((response) => response.json());
}

export function fetchReservationPut(
    id: number,
    formData: IReservationFormData
) {
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
