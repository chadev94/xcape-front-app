import { useMediaQuery } from "react-responsive";
import { atom } from "recoil";

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
