import { atom, selector } from "recoil";
import { IMerchant, ITheme } from "./api";

export const merchant = atom<IMerchant>({
    key: "merchant",
    default: {
        id: 0,
        name: "",
        address: "",
        code: "",
        email: "",
        order: 0,
        parkingYn: false,
        telNumber: "",
        businessHour: "",
        businessRegistrationNumber: "",
        ceoName: "",
        businessIcon: "",
        themeList: [],
    },
});

export const themeList = atom<ITheme[]>({
    key: "themeList",
    default: [
        {
            id: 0,
            merchantId: 0,
            nameKo: "",
            nameEn: "",
            mainImagePath: "",
            bgImagePath: "",
            timetable: "",
            description: "",
            minParticipantCount: 0,
            maxParticipantCount: 0,
            difficulty: 0,
            genre: "",
            point: "",
            youtubeLink: "",
            colorCode: "",
            hasXKit: false,
            isCrimeScene: false,
            useYN: "N",
            priceList: [],
            abilityList: [],
        },
    ],
});

export const reservationDetail = atom({
    key: "reservationDetail",
    default: {
        phoneNumber: "",
        reservedBy: "",
        participantCount: 0,
        roomType: "",
    },
});

export const theme = atom<ITheme>({
    key: "theme",
    default: {
        id: 0,
        merchantId: 0,
        nameKo: "",
        nameEn: "",
        mainImagePath: "",
        bgImagePath: "",
        timetable: "",
        description: "",
        minParticipantCount: 0,
        maxParticipantCount: 0,
        difficulty: 0,
        genre: "",
        point: "",
        youtubeLink: "",
        colorCode: "",
        hasXKit: false,
        isCrimeScene: false,
        useYN: "N",
        priceList: [],
        abilityList: [],
    },
});

export const currentTheme = selector({
    key: "currentTheme",
    get: ({ get }) => get(theme),
});
