export const BREAKPOINT_PC = "pc";
export const BREAKPOINT_TABLET = "tablet";
export const BREAKPOINT_PHONE_MEDIUM = "phoneMedium";
export const BREAKPOINT_PHONE_SMALL = "phoneSmall";

export const breakpoints = {
    pc: 1279,
    tablet: 767,
    phoneMedium: 359,
    phoneSmall: 325,
};

export const mediaQueries = (key: keyof typeof breakpoints) => {
    return `@media (max-width: ${breakpoints[key]}px)`;
};
