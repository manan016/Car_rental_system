import { Colors } from "../../constants/designTokens";
import { SectionLabel } from "../../components/Shared";

/* ── Lucide SVGs ─────────────────────────────────────────────── */
const Icon = ({ d, size = 22, color = "currentColor", strokeW = 1.8 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
        stroke={color} strokeWidth={strokeW} strokeLinecap="round" strokeLinejoin="round">
        <path d={d} />
    </svg>
);
const I = {
    platform:   "M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z",
    version:    "M12 8v4l3 3m6-3a9 9 0 1 1-18 0 9 9 0 0 1 18 0z",
    user:       "M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z",
    clock:      "M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20z M12 6v6l4 2",
    code:       "M16 18l6-6-6-6M8 6l-6 6 6 6",
    database:   "M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z",
    award:      "M12 15l-3 4 1-5-3-3 5-1 1-5 1 5 5 1-3 3 1 5z",
    cloud:      "M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9z",
    shield:     "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"
};

/**
 * AboutPage Component
 * Premium agency-grade project information
 */
export const AboutPage = () => {
    return (
        <div style={{ paddingTop: 70, minHeight: "100vh", background: "#0B1114", color: "#fff", position: "relative" }}>
            
            {/* Ambient Backgrounds */}
            <div style={{
                position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)",
                width: "100%", height: 600,
                background: "radial-gradient(circle at top, rgba(37,211,102,.07) 0%, rgba(11,17,20,0) 70%)",
                pointerEvents: "none", zIndex: 0
            }} />
            <div style={{
                position: "absolute", inset: 0,
                backgroundImage: `linear-gradient(rgba(255,255,255,.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.02) 1px, transparent 1px)`,
                backgroundSize: "48px 48px", pointerEvents: "none", zIndex: 0
            }} />

            <div style={{ padding: "100px 48px", maxWidth: 960, margin: "0 auto", position: "relative", zIndex: 10 }}>
                <div style={{ display: "flex", justifyContent: "flex-start", marginBottom: 20 }}>
                    <SectionLabel>About This Project</SectionLabel>
                </div>

                <h1 style={{
                    fontFamily: "'Syne',sans-serif", fontSize: "clamp(42px, 5.5vw, 76px)",
                    fontWeight: 800, letterSpacing: "-3px", marginBottom: 24, lineHeight: 1.05,
                }}>
                    CRMS — Car Rental<br />
                    <span style={{ color: "transparent", WebkitTextStroke: `1px ${Colors.green}`, position: "relative" }}>
                        Management System.
                        <span style={{
                            position: "absolute", bottom: "5%", left: 0, width: "100%", height: "25%",
                            background: Colors.green, opacity: 0.15, transform: "skewX(-15deg)", zIndex: -1
                        }} />
                    </span>
                </h1>

                <p style={{
                    fontSize: 18, color: "#8696A0", lineHeight: 1.8,
                    fontWeight: 400, maxWidth: 740, marginBottom: 70, fontFamily: "'DM Sans', sans-serif"
                }}>
                    Veloce is a next-generation mobility platform designed to streamline fleet operations, 
                    optimize dynamic pricing, and deliver a frictionless booking experience for premium vehicle rentals.
                </p>

                {/* Project info Grid */}
                <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 20, marginBottom: 60 }}>
                    {[
                        { label: "Platform Name", val: "Veloce Enterprise OS", icon: I.platform },
                        { label: "Current Release", val: "Version 2.4.0 (Stable)", icon: I.version },
                        { label: "System Architecture", val: "React 18 + Node.js + MySQL", icon: I.code },
                        { label: "Cloud Infrastructure", val: "AWS Distributed Clusters", icon: I.cloud },
                        { label: "Security Protocol", val: "AES-256 & JWT Auth", icon: I.shield },
                        { label: "Service Level Agreement", val: "99.99% Guaranteed Uptime", icon: I.clock },
                    ].map(({ label, val, icon }) => (
                        <div key={label} style={{
                            background: "rgba(17,27,33,.6)", border: `1px solid rgba(255,255,255,.05)`,
                            borderRadius: 16, padding: "24px", display: "flex", alignItems: "flex-start", gap: 16,
                            transition: "all .3s ease", cursor: "default",
                        }}
                        onMouseEnter={e => { e.currentTarget.style.background = "rgba(17,27,33,.9)"; e.currentTarget.style.borderColor = "rgba(37,211,102,.3)"; }}
                        onMouseLeave={e => { e.currentTarget.style.background = "rgba(17,27,33,.6)"; e.currentTarget.style.borderColor = "rgba(255,255,255,.05)"; }}>
                            <div style={{
                                background: "rgba(37,211,102,.1)", padding: "10px", borderRadius: "12px",
                                border: "1px solid rgba(37,211,102,.2)", display: "flex", color: Colors.green
                            }}>
                                <Icon d={icon} size={22} />
                            </div>
                            <div>
                                <div style={{
                                    fontSize: 11, color: Colors.green, fontWeight: 700,
                                    letterSpacing: "1px", textTransform: "uppercase", marginBottom: 6,
                                }}>
                                    {label}
                                </div>
                                <div style={{ fontFamily: "'Syne',sans-serif", fontSize: 18, fontWeight: 700, color:"#fff" }}>{val}</div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Objectives */}
                <div style={{ marginBottom: 70 }}>
                    <h2 style={{
                        fontFamily: "'Syne',sans-serif", fontSize: 32, fontWeight: 800,
                        letterSpacing: "-1px", marginBottom: 28, color: "#fff"
                    }}>
                        Project Objectives.
                    </h2>
                    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                        {[
                            "Design and develop a user-friendly web interface for browsing and booking rental vehicles online.",
                            "Build a secure admin panel to manage cars, users, bookings, pricing, and system analytics.",
                            "Implement robust JWT authentication and role-based access control (RBAC) to ensure data security.",
                            "Automate key processes: pricing calculations, availability checks, and booking confirmations.",
                            "Design a normalized relational database schema (MySQL) following 3NF DBMS principles.",
                            "Provide data-driven reports and analytics to support business decision-making.",
                            "Lay groundwork for future enhancements including mobile apps and AI-based features.",
                        ].map((o, i) => (
                            <div key={i} style={{
                                display: "flex", alignItems: "center", gap: 20,
                                background: "rgba(17,27,33,.4)", border: `1px solid rgba(255,255,255,.05)`,
                                borderRadius: 14, padding: "20px 24px",
                                transition: "transform .25s ease",
                            }}
                            onMouseEnter={e => e.currentTarget.style.transform = "translateX(8px)"}
                            onMouseLeave={e => e.currentTarget.style.transform = "translateX(0)"}>
                                <span style={{
                                    width: 32, height: 32, flexShrink: 0, borderRadius: "50%",
                                    background: "rgba(37,211,102,.1)", border: `1px solid rgba(37,211,102,.2)`,
                                    display: "flex", alignItems: "center", justifyContent: "center",
                                    fontFamily: "'Syne',sans-serif", fontSize: 13, fontWeight: 800, color: Colors.green,
                                }}>
                                    {String(i + 1).padStart(2, "0")}
                                </span>
                                <p style={{ fontSize: 15, color: "#8696A0", lineHeight: 1.6, fontWeight: 400, margin: 0 }}>
                                    {o}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* CTA */}
                <div style={{
                    background: "rgba(17,27,33,.6)", border: `1px solid rgba(37,211,102,.25)`,
                    borderRadius: 24, padding: "60px 40px", textAlign: "center",
                    position: "relative", overflow: "hidden",
                    boxShadow: "0 20px 50px -10px rgba(0,0,0,.5)"
                }}>
                    <div style={{
                        position: "absolute", inset: 0, opacity: 0.05,
                        backgroundImage: `linear-gradient(45deg, ${Colors.green} 25%, transparent 25%, transparent 50%, ${Colors.green} 50%, ${Colors.green} 75%, transparent 75%, transparent)`,
                        backgroundSize: "20px 20px"
                    }} />
                    
                    <div style={{ position: "relative", zIndex: 1 }}>
                        <div style={{
                            width: 64, height: 64, margin: "0 auto 24px",
                            background: "linear-gradient(135deg, #25D366, #128C7E)",
                            borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center",
                            color: "#111B21", boxShadow: "0 10px 30px rgba(37,211,102,.3)"
                        }}>
                            <Icon d={I.award} size={32} />
                        </div>
                        <h2 style={{
                            fontFamily: "'Syne',sans-serif", fontSize: 36, fontWeight: 800,
                            letterSpacing: "-1.5px", marginBottom: 16, color: "#fff"
                        }}>
                            A System Built to Last.
                        </h2>
                        <p style={{
                            fontSize: 16, color: "#8696A0", maxWidth: 540, margin: "0 auto 32px",
                            lineHeight: 1.7, fontWeight: 400,
                        }}>
                            Modular by design. Scalable by architecture. Ready for real-world deployment — 
                            today and in every version that follows.
                        </p>
                        <div style={{ fontSize: 13, color: "#8696A0", fontWeight: 600 }}>
                            Powered by <span style={{ color: Colors.green }}>React · Node.js · MySQL · Stripe · AWS</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
