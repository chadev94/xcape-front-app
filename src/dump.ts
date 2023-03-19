interface IAvility {
    [key: string]: number;
}

interface IDump {
    activity: number;
    bgImagePath: string;
    colorCode: string;
    description: string;
    difficulty: number;
    generalPrice: Array<Object>;
    // '[{"person":1,"price":30000},{"person":4,"price":50000},{"person":5,"price":60000}]',
    genre: string;
    hasXKit: string;
    id: number;
    isCrimeScene: string;
    mainImagePath: string;
    maxParticipantCount: number;
    merchantId: number;
    minParticipantCount: number;
    nameKr: string;
    nameEn: string;
    observation: number;
    openRoomPrice: Array<Object>;
    // '[{"person":1,"price":30000},{"person":4,"price":50000},{"person":5,"price":60000}]',
    point: string;
    reasoning: number;
    teamwork: number;
    timetable: Array<string>;
    // ability: { 추리력: number; 팀워크: number; 관찰력: number; 활동성: number };
    ability: IAvility;
}

export const dump: IDump = {
    activity: 3,
    bgImagePath: "test",
    colorCode: "#E14FBC",
    description: "test",
    difficulty: 4,
    generalPrice: [
        { person: 1, price: 30000 },
        { person: 4, price: 50000 },
        { person: 5, price: 60000 },
    ],
    genre: "추리/스릴러",
    hasXKit: "Y",
    id: 2,
    isCrimeScene: "N",
    mainImagePath: "ㅅㄷㄴㅅ",
    maxParticipantCount: 6,
    merchantId: 1,
    minParticipantCount: 2,
    nameKr: "수취인 초대",
    nameEn: "HIDE & SEEK",
    observation: 4,
    openRoomPrice: [
        { person: 1, price: 30000 },
        { person: 4, price: 50000 },
        { person: 5, price: 60000 },
    ],
    point: "string",
    reasoning: 3,
    teamwork: 4,
    timetable: ["09:00", "10:00", "11:30"],
    ability: { 추리력: 4, 팀워크: 3, 관찰력: 2, 활동성: 2 },
};

// export const dump1: IDump = {
//     id: 1,
//     merchantId: 1,
//     nameKo: "기억의 틈",
//     nameEn: "memory",
//     mainImagePath:
//         "https://xcape-business-sdk-uploads.s3.ap-northeast-2.amazonaws.com/1/2dec5f78-7d2b-4cf6-8544-45c866cd1dcc_icon.png",
//     bgImagePath: null,
//     generalPrice:
//         '[{"person":"3","price":"30000"},{"person":"4","price":"50000"}]',
//     openRoomPrice:
//         '[{"person":"3","price":"30000"},{"person":"4","price":"50000"}]',
//     timetable: "09:15,10:20",
//     description: "카뎁이",
//     reasoning: 4,
//     observation: 3,
//     activity: 3,
//     teamwork: 3,
//     minParticipantCount: 2,
//     maxParticipantCount: 7,
//     difficulty: 3,
//     genre: "ㅋㅋㅋ",
//     point: "1234",
//     youtubeLink: "https://www.youtube.com/watch?v=JlTa9cVywmA",
//     colorCode: "#242424",
//     hasXKit: "Y",
//     isCrimeScene: "N",
// };
