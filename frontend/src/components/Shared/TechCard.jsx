import { useState } from "react";
import { Colors } from "../../constants/designTokens";

/**
 * TechCard Component
 * Displays technology stack items
 */
export const TechCard = ({ icon, name, role }) => {
    const [hov, setHov] = useState(false);

    return (
        <div
            onMouseEnter={() => setHov(true)}
            onMouseLeave={() => setHov(false)}
            style={{
                background: hov ? Colors.panel : Colors.charcoal,
                border: `1px solid ${hov ? "rgba(37,211,102,.3)" : Colors.mid}`,
                borderRadius: 14,
                padding: "22px 14px",
                textAlign: "center",
                transform: hov ? "translateY(-4px)" : "translateY(0)",
                transition: "all .3s",
            }}
        >
            <div style={{ fontSize: 32, marginBottom: 10 }}>{icon}</div>
            <div style={{ fontSize: 13, fontWeight: 700, color: "#fff", marginBottom: 4 }}>
                {name}
            </div>
            <div style={{ fontSize: 11, color: Colors.muted }}>{role}</div>
        </div>
    );
};
