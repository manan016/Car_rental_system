/**
 * Utility Functions
 * Helper functions for common operations
 */

export const calculateDays = (startDate, endDate) => {
    if (!startDate || !endDate) return 0;
    return Math.max(1, Math.ceil((new Date(endDate) - new Date(startDate)) / 86400000));
};

export const calculateTotal = (rate, days, promo) => {
    const subtotal = rate * days;
    const discount = promo?.toUpperCase() === "VELOCE10" ? subtotal * 0.1 : 0;
    return subtotal - discount;
};

export const generateBookingRef = () => {
    return "#BK-" + Math.floor(Math.random() * 9000 + 1000);
};

export const injectGlobalStyles = (cssContent, styleId = "veloce-global") => {
    if (!document.getElementById(styleId)) {
        const style = document.createElement("style");
        style.id = styleId;
        style.textContent = cssContent;
        document.head.appendChild(style);
    }
};

export const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
};
