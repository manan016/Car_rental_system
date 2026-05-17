import { useState } from "react";
import { Colors } from "../../constants/designTokens";

/**
 * FeatureCard Component
 * Displays feature with icon, title, description, and tag
 */
export const FeatureCard = ({ icon, title, desc, tag }) => {
    const [hov, setHov] = useState(false);

    return (
        <div
            onMouseEnter={() => setHov(true)}
            onMouseLeave={() => setHov(false)}
            style={{
                background: Colors.panel,
                border: `1px solid ${hov ? "rgba(37,211,102,.3)" : Colors.mid}`,
                borderRadius: 20,
                padding: "34px 30px",
                transform: hov ? "translateY(-5px)" : "translateY(0)",
                boxShadow: hov ? "0 16px 48px rgba(0,0,0,.3)" : "none",
                transition: "all .3s ease",
                position: "relative",
                overflow: "hidden",
            }}
        >
            <div
                style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    height: 3,
                    background: Colors.green,
                    transform: hov ? "scaleX(1)" : "scaleX(0)",
                    transformOrigin: "left",
                    transition: "transform .3s ease",
                }}
            />

            <div
                style={{
                    width: 54,
                    height: 54,
                    background: "rgba(37,211,102,.1)",
                    border: "1px solid rgba(37,211,102,.15)",
                    borderRadius: 14,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 24,
                    marginBottom: 22,
                    transition: "background .3s",
                    ...(hov ? { background: "rgba(37,211,102,.18)" } : {}),
                }}
            >
                {icon}
            </div>

            <div
                style={{
                    fontFamily: "'Syne', sans-serif",
                    fontSize: 20,
                    fontWeight: 700,
                    marginBottom: 10,
                    letterSpacing: "-0.3px",
                }}
            >
                {title}
            </div>

            <p
                style={{
                    fontSize: 14,
                    color: Colors.muted,
                    lineHeight: 1.75,
                    fontWeight: 300,
                    marginBottom: 18,
                }}
            >
                {desc}
            </p>

            <span
                style={{
                    fontSize: 11,
                    fontWeight: 700,
                    color: Colors.green,
                    letterSpacing: "0.3px",
                }}
            >
                → {tag}
            </span>
        </div>
    );
};
