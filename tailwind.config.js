/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./public/**/*.html", "./src/**/*.{js,jsx,ts,tsx}"],
    theme: {
        extend: {
            height: {
                400: "400px",
            },
            backgroundImage: {
                logo: "url('http://www.xcape.co.kr/m/img/logo.png')",
            },
            colors: {
                primary: "#4c3d35",
                sub: "#9C8871",
            },

            // container: {
            // 	center: true,
            // 	screens: {
            // 		sm: "600px",
            // 		md: "728px",
            // 		lg: "984px",
            // 		xl: "1240px",
            // 		"2xl": "1496px",
            // 	},
            // },
        },
    },
    plugins: [],
};
