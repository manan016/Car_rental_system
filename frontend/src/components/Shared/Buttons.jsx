import { useState } from "react";
import { Colors } from "../../constants/designTokens";

/**
 * AdminBtn Component
 * Admin panel button with variants
 */
export const AdminBtn = ({ children, variant, onClick }) => {
    const [hov, setHov] = useState(false);

    return (
        <button
            onClick={onClick}
            onMouseEnter={() => setHov(true)}
            onMouseLeave={() => setHov(false)}
            style={{
                background: variant === "primary" ? Colors.green : "transparent",
                color: variant === "primary" ? Colors.black : Colors.muted,
                border: variant === "primary" ? "none" : `1px solid ${Colors.mid}`,
                borderRadius: 10,
                padding: "9px 18px",
                fontSize: 13,
                fontWeight: variant === "primary" ? 700 : 500,
                cursor: "pointer",
                fontFamily: "'DM Sans', sans-serif",
                transition: "all .2s",
                ...(hov && variant === "primary" ? { background: "#2de677" } : {}),
                ...(hov && variant !== "primary" ? { borderColor: Colors.green, color: "#fff" } : {}),
            }}
        >
            {children}
        </button>
    );
};

/**
 * ActionBtn Component
 * Small action button for tables
 */
export const ActionBtn = ({ children, color, onClick }) => {
    const [hov, setHov] = useState(false);

    return (
        <button
            onClick={onClick}
            onMouseEnter={() => setHov(true)}
            onMouseLeave={() => setHov(false)}
            style={{
                background: hov ? `${color}15` : "transparent",
                color: color,
                border: `1px solid ${color}30`,
                borderRadius: 6,
                padding: "4px 10px",
                fontSize: 11,
                fontWeight: 700,
                cursor: "pointer",
                fontFamily: "'DM Sans', sans-serif",
                transition: "all .15s",
            }}
        >
            {children}
        </button>
    );
};
