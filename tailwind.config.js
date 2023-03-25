/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./public/**/*.html", "./src/**/*.{js,jsx,ts,tsx}"],
    theme: {
        extend: {
            height: {
                400: "430px",
            },
            backgroundImage: {
                logo: "url('http://www.xcape.co.kr/m/img/logo.png')",
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
