import { useState } from "react";
import { Colors } from "../../constants/designTokens";

/**
 * FutureCard Component
 * Displays future roadmap items
 */
export const FutureCard = ({ num, phase, icon, title, desc, tag }) => {
    const [hov, setHov] = useState(false);

    return (
        <div
            onMouseEnter={() => setHov(true)}
            onMouseLeave={() => setHov(false)}
            style={{
                background: Colors.charcoal,
                border: `1px solid ${hov ? "rgba(37,211,102,.25)" : Colors.mid}`,
                borderRadius: 20,
                padding: "30px 26px",
                position: "relative",
                overflow: "hidden",
                transform: hov ? "translateY(-4px)" : "translateY(0)",
                transition: "all .3s ease",
            }}
        >
            <div
                style={{
                    position: "absolute",
                    top: 16,
                    right: 20,
                    fontFamily: "'Syne', sans-serif",
                    fontSize: 52,
                    fontWeight: 800,
                    color: "rgba(37,211,102,.05)",
                    lineHeight: 1,
                    pointerEvents: "none",
                }}
            >
                {num}
            </div>

            <div
                style={{
                    fontSize: 11,
                    fontWeight: 700,
                    color: Colors.green,
                    letterSpacing: "1.5px",
                    textTransform: "uppercase",
                    marginBottom: 14,
                }}
            >
                {phase}
            </div>

            <div style={{ fontSize: 32, marginBottom: 12 }}>{icon}</div>

            <div
                style={{
                    fontFamily: "'Syne', sans-serif",
                    fontSize: 20,
                    fontWeight: 700,
                    letterSpacing: "-0.3px",
                    marginBottom: 10,
                }}
            >
                {title}
            </div>

            <p
                style={{
                    fontSize: 13,
                    color: Colors.muted,
                    lineHeight: 1.75,
                    fontWeight: 300,
                    marginBottom: 20,
                }}
            >
                {desc}
            </p>

            <span
                style={{
                    fontSize: 11,
                    fontWeight: 700,
                    padding: "5px 12px",
                    borderRadius: 100,
                    background: "rgba(37,211,102,.07)",
                    border: "1px solid rgba(37,211,102,.2)",
                    color: Colors.green,
                }}
            >
                {tag}
            </span>
        </div>
    );
};
