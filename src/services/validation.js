export const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // ביטוי רגולרי למייל תקין
    return emailRegex.test(email); // מחזיר true אם המייל תקין
};
