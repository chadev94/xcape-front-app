/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./public/**/*.html", "./src/**/*.{js,jsx,ts,tsx}"],
    theme: {
        extend: {
            width: {
                "150px": "150px",
                "190px": "190px",
            },
            height: {
                400: "430px",
                "190px": "190px",
            },
            colors: {
                primary: "#4c3d35",
                sub: "#9C8871",
            },
            screens: {
                xs: "470px",
            },
        },
    },
    plugins: [],
};
