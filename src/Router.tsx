import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Contact from "./components/Contact";
import Event from "./components/Event";
import Reservation from "./components/Reservation";
import Review from "./components/Review";
import Xcape from "./components/Xcape";
import Merchant from "./routes/Merchant";
import Rooms from "./routes/Rooms";
import Detail from "./components/Detail";
import Information from "./components/Information";
import ThemeDetail from "./components/ThemeDetail";

//router
const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "xcape",
                element: <Xcape />,
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
                    // {
                    //     path: "detail/:time",
                    //     element: <Reservation />,
                    // },
                ],
            },
            {
                path: "reservation-detail/:reservationId",
                element: <Detail />,
            },
            {
                path: "review",
                element: <Review />,
            },
            {
                path: "event",
                element: <Event />,
            },
            {
                path: "contact",
                element: <Contact />,
            },
        ],
    },
]);

export default router;
