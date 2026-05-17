import { useState } from "react";
import { Colors } from "../../constants/designTokens";

/**
 * CarCard Component
 * Individual vehicle card with booking functionality
 */
export const CarCard = ({ car, onBook }) => {
    const [hov, setHov] = useState(false);

    const catColors = {
        economy: { bg: "rgba(37,211,102,.1)", c: Colors.green },
        sedan: { bg: "rgba(17,138,178,.1)", c: Colors.info },
        suv: { bg: "rgba(255,209,102,.1)", c: Colors.warn },
        luxury: { bg: "rgba(239,71,111,.1)", c: Colors.danger },
    };

    const cc = catColors[car.cat];

    return (
        <div
            onMouseEnter={() => setHov(true)}
            onMouseLeave={() => setHov(false)}
            style={{
                background: Colors.charcoal,
                border: `1px solid ${hov ? "rgba(37,211,102,.35)" : Colors.mid}`,
                borderRadius: 20,
                overflow: "hidden",
                cursor: "pointer",
                transform: hov ? "translateY(-6px)" : "translateY(0)",
                boxShadow: hov
                    ? "0 24px 56px rgba(0,0,0,.4),0 0 0 1px rgba(37,211,102,.08)"
                    : "none",
                transition: "all .3s ease",
            }}
        >
            {/* Image area */}
            <div
                style={{
                    height: 180,
                    background: Colors.panel,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 80,
                    borderBottom: `1px solid ${Colors.mid}`,
                    position: "relative",
                    overflow: "hidden",
                }}
            >
                <span style={{ filter: hov ? "drop-shadow(0 0 20px rgba(37,211,102,.2))" : "none", transition: "filter .3s" }}>
                    {car.icon}
                </span>

                <span
                    style={{
                        position: "absolute",
                        top: 12,
                        left: 12,
                        fontSize: 10,
                        fontWeight: 700,
                        letterSpacing: "0.8px",
                        textTransform: "uppercase",
                        padding: "4px 10px",
                        borderRadius: 100,
                        background: cc.bg,
                        color: cc.c,
                        border: `1px solid ${cc.c}30`,
                    }}
                >
                    {car.cat}
                </span>

                {!car.avail && (
                    <div
                        style={{
                            position: "absolute",
                            inset: 0,
                            background: "rgba(17,27,33,.7)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontSize: 14,
                            fontWeight: 700,
                            color: Colors.danger,
                            letterSpacing: "1px",
                            backdropFilter: "blur(2px)",
                        }}
                    >
                        UNAVAILABLE
                    </div>
                )}

                <span
                    style={{
                        position: "absolute",
                        top: 12,
                        right: 12,
                        background: car.avail ? "rgba(37,211,102,.12)" : "rgba(239,71,111,.12)",
                        color: car.avail ? Colors.green : Colors.danger,
                        fontSize: 10,
                        fontWeight: 700,
                        padding: "4px 10px",
                        borderRadius: 100,
                        border: `1px solid ${car.avail ? Colors.green + "30" : Colors.danger + "30"}`,
                    }}
                >
                    {car.avail ? "Available" : "Booked"}
                </span>
            </div>

            <div style={{ padding: "20px 22px 24px" }}>
                <div
                    style={{
                        fontSize: 11,
                        color: Colors.green,
                        fontWeight: 700,
                        letterSpacing: "1px",
                        textTransform: "uppercase",
                        marginBottom: 4,
                    }}
                >
                    {car.brand}
                </div>

                <div
                    style={{
                        fontFamily: "'Syne', sans-serif",
                        fontSize: 22,
                        fontWeight: 700,
                        letterSpacing: "-0.5px",
                        marginBottom: 14,
                    }}
                >
                    {car.name}
                </div>

                {/* Specs */}
                <div style={{ display: "flex", gap: 14, marginBottom: 18, paddingBottom: 18, borderBottom: `1px solid ${Colors.mid}` }}>
                    {[
                        { i: "⚡", v: car.engine },
                        { i: "👥", v: `${car.seats} seats` },
                        { i: "⚙️", v: car.trans },
                    ].map((s) => (
                        <div key={s.v} style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 12, color: Colors.muted }}>
                            <span style={{ fontSize: 14 }}>{s.i}</span>
                            {s.v}
                        </div>
                    ))}
                </div>

                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 28, fontWeight: 800 }}>
                        ${car.price}
                        <span style={{ fontSize: 13, fontWeight: 400, color: Colors.muted, fontFamily: "'DM Sans', sans-serif" }}>
                            /day
                        </span>
                    </div>

                    <button
                        disabled={!car.avail}
                        onClick={onBook}
                        style={{
                            background: car.avail ? Colors.green : Colors.mid,
                            color: car.avail ? Colors.black : Colors.muted,
                            border: "none",
                            borderRadius: 10,
                            padding: "10px 20px",
                            fontSize: 13,
                            fontWeight: 700,
                            cursor: car.avail ? "pointer" : "not-allowed",
                            fontFamily: "'DM Sans', sans-serif",
                            transition: "all .2s",
                        }}
                        onMouseEnter={(e) => {
                            if (car.avail) e.target.style.background = "#2de677";
                        }}
                        onMouseLeave={(e) => {
                            if (car.avail) e.target.style.background = Colors.green;
                        }}
                    >
                        Book Now
                    </button>
                </div>
            </div>
        </div>
    );
};
