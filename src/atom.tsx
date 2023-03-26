import { useMediaQuery } from "react-responsive";
import { atom, RecoilState, selector } from "recoil";
import { ITheme } from "./api";

export const isMainAtom = atom({
    key: "isMain",
    default: true,
});

export const merchantsIndex = atom({
    key: "merchants",
    default: 2,
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

export const allData = atom({
    key: "allData",
    default: {
        result: [],
    },
});

export const merchant = atom({
    key: "merchant",
    default: {},
});

export const theme: any = atom({
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
        hasXKit: "N",
        isCrimeScene: "N",
        useYN: "N",
        reservationDtoList: [],
        abilityList: [],
    },
});

export const currentTheme = selector({
    key: "currentTheme",
    get: ({ get }) => get(theme),
});
