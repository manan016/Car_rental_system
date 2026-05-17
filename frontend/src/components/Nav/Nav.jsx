import { useState, useEffect, useRef } from "react";
import { Colors } from "../../constants/designTokens";
import { NAV_LINKS } from "../../constants/carData";
import { useAuth } from "../../context/AuthContext";

/* ── Lucide inline SVG ────────────────────────────────────────── */
const Icon = ({ d, size = 16, color = "currentColor", strokeW = 1.8 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
        stroke={color} strokeWidth={strokeW} strokeLinecap="round" strokeLinejoin="round">
        <path d={d} />
    </svg>
);
const I = {
    user:     "M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z",
    admin:    "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z",
    home:     "M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z",
    car:      "M5 17H3a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v5M7 17a2 2 0 1 0 4 0 2 2 0 0 0-4 0m10 0a2 2 0 1 0 4 0 2 2 0 0 0-4 0",
    calendar: "M3 9h18M3 4h18a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1z",
    logout:   "M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9",
};

const PUBLIC_NAV_LINKS = NAV_LINKS.filter((l) => l !== "Admin" && l !== "Database");

/**
 * Nav Component
 * Premium, agency-grade fixed navigation bar.
 */
export const Nav = ({ active, setPage }) => {
    const { currentUser, logout } = useAuth();
    const [scrolled, setScrolled] = useState(false);
    const [dropOpen, setDropOpen] = useState(false);
    const dropRef = useRef(null);

    useEffect(() => {
        const h = () => setScrolled(window.scrollY > 40);
        window.addEventListener("scroll", h);
        return () => window.removeEventListener("scroll", h);
    }, []);

    // Close dropdown on outside click
    useEffect(() => {
        const handler = (e) => {
            if (dropRef.current && !dropRef.current.contains(e.target)) setDropOpen(false);
        };
        document.addEventListener("mousedown", handler);
        return () => document.removeEventListener("mousedown", handler);
    }, []);

    function handleLogout() {
        setDropOpen(false);
        logout();
        setPage("Home");
    }

    return (
        <nav
            style={{
                position: "fixed", top: 0, left: 0, right: 0, zIndex: 900,
                display: "flex", alignItems: "center", justifyContent: "space-between",
                padding: "0 48px", height: 72,
                background: scrolled ? "rgba(17,27,33,.85)" : "rgba(17,27,33,.4)",
                backdropFilter: "blur(24px)",
                borderBottom: scrolled ? `1px solid rgba(255,255,255,.06)` : "1px solid transparent",
                transition: "all .35s cubic-bezier(.4,0,.2,1)",
                boxShadow: scrolled ? "0 10px 30px -10px rgba(0,0,0,.3)" : "none",
            }}
        >
            {/* Logo */}
            <div
                style={{ display: "flex", alignItems: "center", gap: 12, cursor: "pointer", group:"logo" }}
                onClick={() => setPage("Home")}
            >
                <div
                    style={{
                        width: 38, height: 38, borderRadius: 12,
                        background: "linear-gradient(135deg, #25D366, #128C7E)",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        fontSize: 18, fontWeight: 900, color: "#111B21",
                        fontFamily: "'Syne',sans-serif",
                        boxShadow: "0 4px 20px rgba(37,211,102,.4)",
                        transition: "transform .25s ease",
                    }}
                >
                    V
                </div>
                <span
                    style={{
                        fontFamily: "'Syne',sans-serif",
                        fontSize: 22, fontWeight: 800,
                        letterSpacing: "-0.5px", color: "#fff",
                    }}
                >
                    VELOCE
                </span>
            </div>

            {/* Desktop Links */}
            <ul style={{ display: "flex", gap: 40, listStyle: "none", alignItems: "center", margin: 0, padding: 0 }}>
                {PUBLIC_NAV_LINKS.map((l) => (
                    <li key={l}>
                        <button
                            onClick={() => setPage(l)}
                            style={{
                                position: "relative",
                                background: "none", border: "none",
                                cursor: "pointer", fontSize: 14, fontWeight: active === l ? 700 : 500,
                                fontFamily: "'DM Sans',sans-serif",
                                color: active === l ? Colors.green : "#A0AEC0",
                                transition: "color .25s", padding: "8px 0",
                            }}
                            onMouseEnter={(e) => {
                                if (active !== l) e.currentTarget.style.color = "#fff";
                            }}
                            onMouseLeave={(e) => {
                                if (active !== l) e.currentTarget.style.color = "#A0AEC0";
                            }}
                        >
                            {l}
                            {/* Animated underline indicator */}
                            <span
                                style={{
                                    position: "absolute",
                                    bottom: 0, left: "50%",
                                    width: active === l ? "100%" : "0%",
                                    height: 2,
                                    background: Colors.green,
                                    transition: "all .3s cubic-bezier(.4,0,.2,1)",
                                    transform: "translateX(-50%)",
                                    borderRadius: 2,
                                    opacity: active === l ? 1 : 0,
                                    boxShadow: active === l ? "0 0 10px rgba(37,211,102,.5)" : "none",
                                }}
                            />
                        </button>
                    </li>
                ))}
            </ul>

            {/* Right section — Auth */}
            <div style={{ display: "flex", gap: 14, alignItems: "center" }}>
                {currentUser ? (
                    <div ref={dropRef} style={{ position: "relative" }}>
                        <button
                            onClick={() => setDropOpen((d) => !d)}
                            style={{
                                display: "flex", alignItems: "center", gap: 12,
                                background: dropOpen ? "rgba(255,255,255,.05)" : "rgba(255,255,255,.03)",
                                border: `1px solid ${dropOpen ? "rgba(37,211,102,.3)" : "rgba(255,255,255,.1)"}`,
                                borderRadius: 100,
                                padding: "6px 16px 6px 6px",
                                cursor: "pointer",
                                transition: "all .25s ease",
                            }}
                            onMouseEnter={(e) => {
                                if(!dropOpen) e.currentTarget.style.background = "rgba(255,255,255,.05)";
                            }}
                            onMouseLeave={(e) => {
                                if(!dropOpen) e.currentTarget.style.background = "rgba(255,255,255,.03)";
                            }}
                        >
                            <div
                                style={{
                                    width: 32, height: 32, borderRadius: "50%",
                                    background: currentUser.role === "admin"
                                        ? "linear-gradient(135deg,#25D366,#128C7E)"
                                        : "linear-gradient(135deg,#118AB2,#075E54)",
                                    display: "flex", alignItems: "center", justifyContent: "center",
                                    fontSize: 14, fontWeight: 800,
                                    color: "#111B21", fontFamily: "'Syne',sans-serif",
                                }}
                            >
                                {currentUser.avatar}
                            </div>
                            <div style={{ textAlign: "left" }}>
                                <div style={{ fontSize: 13, fontWeight: 600, color: "#fff", lineHeight: 1.2 }}>
                                    {currentUser.name.split(" ")[0]}
                                </div>
                                <div
                                    style={{
                                        fontSize: 10, fontWeight: 700,
                                        color: currentUser.role === "admin" ? Colors.green : Colors.info,
                                        textTransform: "uppercase", letterSpacing: ".5px",
                                    }}
                                >
                                    {currentUser.role}
                                </div>
                            </div>
                            <span style={{ fontSize: 10, color: Colors.muted, marginLeft: 2, transition: "transform .2s", transform: dropOpen ? "rotate(180deg)" : "rotate(0deg)" }}>
                                ▼
                            </span>
                        </button>

                        {/* Dropdown */}
                        {dropOpen && (
                            <div
                                style={{
                                    position: "absolute", top: "calc(100% + 12px)", right: 0,
                                    background: "#1C2B33",
                                    border: `1px solid rgba(255,255,255,.08)`,
                                    borderRadius: 16, padding: "8px",
                                    minWidth: 220,
                                    boxShadow: "0 20px 48px rgba(0,0,0,.5), 0 0 20px rgba(37,211,102,.05)",
                                    animation: "authFadeDown .2s cubic-bezier(.4,0,.2,1) forwards",
                                    zIndex: 1000,
                                }}
                            >
                                {/* User info */}
                                <div
                                    style={{
                                        padding: "12px 14px 14px",
                                        borderBottom: `1px solid rgba(255,255,255,.06)`,
                                        marginBottom: 8,
                                    }}
                                >
                                    <div style={{ fontSize: 14, fontWeight: 600, color: "#fff" }}>
                                        {currentUser.name}
                                    </div>
                                    <div style={{ fontSize: 12, color: Colors.muted, marginTop: 4 }}>
                                        {currentUser.email}
                                    </div>
                                </div>

                                {currentUser.role === "admin" && (
                                    <DropItem
                                        icon={I.admin}
                                        label="Admin Panel"
                                        accent={Colors.green}
                                        onClick={() => { setDropOpen(false); setPage("Admin"); }}
                                    />
                                )}

                                <DropItem icon={I.home} label="Home" onClick={() => { setDropOpen(false); setPage("Home"); }} />
                                <DropItem icon={I.car} label="Browse Fleet" onClick={() => { setDropOpen(false); setPage("Fleet"); }} />
                                <DropItem icon={I.calendar} label="My Bookings" onClick={() => { setDropOpen(false); setPage("Booking"); }} />

                                <div style={{ borderTop: `1px solid rgba(255,255,255,.06)`, marginTop: 8, paddingTop: 8 }}>
                                    <DropItem
                                        icon={I.logout}
                                        label="Sign Out"
                                        accent="#EF476F"
                                        onClick={handleLogout}
                                    />
                                </div>
                            </div>
                        )}
                    </div>
                ) : (
                    <>
                        <button
                            onClick={() => setPage("Auth")}
                            style={{
                                background: "transparent",
                                border: `1px solid rgba(255,255,255,.15)`,
                                color: "#fff",
                                borderRadius: 100, padding: "10px 24px",
                                fontSize: 13, fontWeight: 600,
                                cursor: "pointer", fontFamily: "'DM Sans',sans-serif",
                                transition: "all .25s ease",
                            }}
                            onMouseEnter={(e) => {
                                e.target.style.background = "rgba(255,255,255,.05)";
                            }}
                            onMouseLeave={(e) => {
                                e.target.style.background = "transparent";
                            }}
                        >
                            Sign In
                        </button>

                        <button
                            onClick={() => setPage("Booking")}
                            style={{
                                background: "linear-gradient(135deg, #25D366, #128C7E)",
                                color: "#111B21",
                                border: "none", borderRadius: 100, padding: "10px 26px",
                                fontSize: 13, fontWeight: 700,
                                cursor: "pointer", fontFamily: "'DM Sans',sans-serif",
                                boxShadow: "0 6px 20px rgba(37,211,102,.35)",
                                transition: "all .25s ease",
                            }}
                            onMouseEnter={(e) => {
                                e.target.style.transform = "translateY(-2px)";
                                e.target.style.boxShadow = "0 10px 24px rgba(37,211,102,.5)";
                            }}
                            onMouseLeave={(e) => {
                                e.target.style.transform = "translateY(0)";
                                e.target.style.boxShadow = "0 6px 20px rgba(37,211,102,.35)";
                            }}
                        >
                            Book Now →
                        </button>
                    </>
                )}
            </div>

            <style>{`
                @keyframes authFadeDown {
                    from { opacity: 0; transform: translateY(-10px) scale(0.98); }
                    to   { opacity: 1; transform: translateY(0) scale(1); }
                }
            `}</style>
        </nav>
    );
};

/* ── Dropdown menu item ─────────────────────────────────────────────────── */
const DropItem = ({ icon, label, onClick, accent }) => {
    const [hov, setHov] = useState(false);
    return (
        <button
            onClick={onClick}
            onMouseEnter={() => setHov(true)}
            onMouseLeave={() => setHov(false)}
            style={{
                display: "flex", alignItems: "center", gap: 12,
                width: "100%", padding: "10px 14px",
                background: hov ? (accent ? `${accent}1A` : "rgba(255,255,255,.04)") : "transparent",
                border: "none", borderRadius: 12,
                cursor: "pointer", textAlign: "left",
                fontFamily: "'DM Sans',sans-serif",
                fontSize: 13, fontWeight: 500,
                color: accent || "#E2E8F0",
                transition: "all .2s ease",
            }}
        >
            <Icon d={icon} size={15} color={accent || (hov ? "#fff" : "#A0AEC0")} />
            <span style={{ color: accent || (hov ? "#fff" : "#E2E8F0"), transition: "color .2s" }}>{label}</span>
        </button>
    );
};
