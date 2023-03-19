export const drawFigure = (difficulty: number) => {
    const star = "★".repeat(difficulty);
    const level = star + "☆".repeat(5 - difficulty);
    return level;
};
