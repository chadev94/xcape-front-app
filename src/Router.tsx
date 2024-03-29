import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Contact from "./pages/Contact";
import Info from "./components/Info";
import Reservation from "./pages/Reservation";
import Review from "./pages/Review";
import Xcape from "./pages/Xcape";
import Merchant from "./routes/Merchant";
import Rooms from "./routes/Rooms";
import ReservationDetail from "./pages/ReservationDetail";
import Information from "./components/Information";
import ThemeDetail from "./pages/ThemeDetail";
import UpdateJsonInfo from "./pages/UpdateJsonInfo";
import ReservationList from "./pages/ReservationList";
import React from "react";
import MainPage from "./pages/MainPage";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "",
                element: <MainPage />,
            },
            {
                path: "xcape",
                element: <Xcape />,
            },
            {
                path: "reservation-list",
                element: <ReservationList />,
            },
            {
                path: "reservation-detail/:reservationId",
                element: <ReservationDetail />,
            },
        ],
    },
    {
        path: "/:merchantCode",
        element: <Merchant />,
        children: [
            {
                path: "",
                element: <Information />,
            },
            {
                path: "xcape",
                element: <Xcape />,
            },
            {
                path: "rooms",
                element: <Rooms />,
            },
            {
                path: "theme-detail/:themeId",
                element: <ThemeDetail />,
            },
            {
                path: "reservation",
                element: <Reservation />,
                children: [
                    {
                        path: ":time",
                        element: <Reservation />,
                    },
                ],
            },

            {
                path: "review",
                element: <Review />,
            },
            {
                path: "info",
                element: <Info />,
            },
            {
                path: "contact",
                element: <Contact />,
            },
        ],
    },

    {
        path: "update/:contents",
        element: <UpdateJsonInfo />,
    },
]);

export default router;
