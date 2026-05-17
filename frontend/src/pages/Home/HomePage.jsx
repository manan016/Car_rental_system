import { useState, useEffect } from "react";
import { Colors } from "../../constants/designTokens";
import { SectionLabel, RevealBox, FeatureCard, TechCard, FutureCard } from "../../components/Shared";

/* ── Lucide SVGs ─────────────────────────────────────────────── */
const Icon = ({ d, size = 22, color = "currentColor", strokeW = 1.8 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
        stroke={color} strokeWidth={strokeW} strokeLinecap="round" strokeLinejoin="round">
        <path d={d} />
    </svg>
);
const I = {
    car:       "M5 17H3a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v5M7 17a2 2 0 1 0 4 0 2 2 0 0 0-4 0m10 0a2 2 0 1 0 4 0 2 2 0 0 0-4 0",
    calendar:  "M3 9h18M3 4h18a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1zM8 2v4M16 2v4",
    lock:      "M19 11H5a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7a2 2 0 0 0-2-2zM7 11V7a5 5 0 0 1 10 0v4",
    dashboard: "M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2zM9 22V12h6v10",
    dollar:    "M12 1v22M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6",
    chart:     "M18 20V10M12 20V4M6 20v-6",
    react:     "M12 2c5.52 0 10 4.48 10 10s-4.48 10-10 10S2 17.52 2 12 6.48 2 12 2zm0 18c4.41 0 8-3.59 8-8s-3.59-8-8-8-8 3.59-8 8 3.59 8 8 8zm0-14c3.31 0 6 2.69 6 6s-2.69 6-6 6-6-2.69-6-6 2.69-6 6-6zm0 10c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4z",
    server:    "M22 12h-4l-3 9L9 3l-3 9H2",
    db:        "M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z",
    shield:    "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z",
    card:      "M21 4H3a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h18a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2zM3 8h18M3 16h18",
    smartphone:"M5 2h14a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2zM12 18h.01",
    mapPin:    "M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0zM12 13a3 3 0 1 0 0-6 3 3 0 0 0 0 6z",
    brain:     "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm0-14c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6zm0 10c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4z",
    globe:     "M12 22C6.48 22 2 17.52 2 12S6.48 2 12 2s10 4.48 10 10-4.48 10-10 10zm-1-17.93c-3.95.49-7 3.85-7 7.93 0 3.32 2.01 6.17 4.91 7.39.2-2.52.27-5.06 0-7.39H4.15A7.952 7.952 0 0 1 11 4.07z",
    trophy:    "M8 21h8M12 17v4M7 4h10c1 0 2 1 2 2v4c0 3-2 5-5 5H10c-3 0-5-2-5-5V6c0-1 1-2 2-2z",
    link:      "M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71",
};

/**
 * HomePage Component
 * Agency-grade, premium landing page for Veloce Car Rental.
 */
export const HomePage = ({ setPage }) => {
    const bars = [38, 55, 42, 70, 62, 85, 95];
    const [count, setCount] = useState({ cars: 0, users: 0, rev: 0, rate: 0 });

    useEffect(() => {
        const targets = { cars: 48, users: 1284, rev: 8420, rate: 98 };
        const dur = 1800, steps = 60;
        let frame = 0;
        const iv = setInterval(() => {
            frame++;
            const p = Math.min(frame / steps, 1);
            const ease = 1 - Math.pow(1 - p, 3);
            setCount({
                cars: Math.round(targets.cars * ease),
                users: Math.round(targets.users * ease),
                rev: Math.round(targets.rev * ease),
                rate: Math.round(targets.rate * ease),
            });
            if (frame >= steps) clearInterval(iv);
        }, dur / steps);
        return () => clearInterval(iv);
    }, []);

    return (
        <div style={{ background: "#0B1114", color: "#fff", overflowX: "hidden" }}>
            {/* ── HERO SECTION ────────────────────────────────────────── */}
            <section style={{
                minHeight: "100vh", display: "grid", gridTemplateColumns: "1fr 1fr",
                alignItems: "center", padding: "130px 48px 80px", gap: 60,
                position: "relative",
            }}>
                {/* Cinematic Background */}
                <div style={{
                    position: "absolute", inset: 0,
                    background: "radial-gradient(circle at 70% 30%, rgba(37,211,102,.08) 0%, rgba(11,17,20,0) 60%)",
                    pointerEvents: "none"
                }} />
                <div style={{
                    position: "absolute", inset: 0,
                    backgroundImage: `linear-gradient(rgba(255,255,255,.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.02) 1px, transparent 1px)`,
                    backgroundSize: "64px 64px", opacity: 0.8, pointerEvents: "none"
                }} />

                {/* Left Content */}
                <div style={{ position: "relative", zIndex: 10 }}>
                    <div className="fade-up s1" style={{
                        display: "inline-flex", alignItems: "center", gap: 8,
                        background: "rgba(37,211,102,.08)", border: "1px solid rgba(37,211,102,.2)",
                        borderRadius: 100, padding: "6px 16px", marginBottom: 32,
                    }}>
                        <span style={{
                            width: 6, height: 6, background: Colors.green, borderRadius: "50%",
                            animation: "pulse 2s infinite", boxShadow: "0 0 10px rgba(37,211,102,.6)"
                        }} />
                        <span style={{ fontSize: 11, fontWeight: 700, color: Colors.green, letterSpacing: "1px", textTransform:"uppercase" }}>
                            Enterprise Car Rental OS
                        </span>
                    </div>

                    <h1 className="fade-up s2" style={{
                        fontFamily: "'Syne',sans-serif", fontSize: "clamp(52px, 5.5vw, 84px)",
                        fontWeight: 800, lineHeight: 1.05, letterSpacing: "-3px", marginBottom: 28,
                    }}>
                        Drive the <br />
                        <span style={{
                            color: "transparent", WebkitTextStroke: `1px ${Colors.green}`,
                            position: "relative"
                        }}>
                            Future.
                            <span style={{
                                position: "absolute", bottom: "10%", left: 0, width: "100%", height: "30%",
                                background: Colors.green, opacity: 0.15, transform: "skewX(-15deg)", zIndex: -1
                            }} />
                        </span>
                        <br />
                        <span style={{ color: "rgba(255,255,255,.15)" }}>Manage</span>
                        <br />
                        <span style={{ color: "rgba(255,255,255,.95)" }}>the Fleet.</span>
                    </h1>

                    <p className="fade-up s3" style={{
                        fontSize: 18, color: "#8696A0", lineHeight: 1.6, maxWidth: 520,
                        marginBottom: 44, fontWeight: 400, fontFamily: "'DM Sans', sans-serif"
                    }}>
                        A complete operations system designed for scale. Seamless client booking, 
                        real-time analytics, and uncompromising control over every vehicle.
                    </p>

                    <div className="fade-up s4" style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
                        <button onClick={() => setPage("Fleet")}
                            style={{
                                background: "linear-gradient(135deg, #25D366, #128C7E)",
                                color: "#111B21", border: "none", borderRadius: 100,
                                padding: "16px 36px", fontSize: 15, fontWeight: 800,
                                cursor: "pointer", fontFamily: "'Syne',sans-serif", letterSpacing: "0.5px",
                                boxShadow: "0 10px 30px rgba(37,211,102,.3)", transition: "all .3s cubic-bezier(.4,0,.2,1)"
                            }}
                            onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-3px)"; e.currentTarget.style.boxShadow = "0 14px 40px rgba(37,211,102,.45)"; }}
                            onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 10px 30px rgba(37,211,102,.3)"; }}
                        >
                            Explore Fleet →
                        </button>
                        <button onClick={() => setPage("Database")}
                            style={{
                                background: "rgba(255,255,255,.03)", border: `1px solid rgba(255,255,255,.15)`,
                                color: "#fff", borderRadius: 100, padding: "16px 36px",
                                fontSize: 15, fontWeight: 600, cursor: "pointer",
                                fontFamily: "'DM Sans',sans-serif", transition: "all .3s"
                            }}
                            onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,255,255,.08)"; e.currentTarget.style.borderColor = "rgba(255,255,255,.3)"; }}
                            onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,.03)"; e.currentTarget.style.borderColor = "rgba(255,255,255,.15)"; }}
                        >
                            Technical Specs
                        </button>
                    </div>

                    {/* Stats */}
                    <div className="fade-up s5" style={{
                        display: "flex", gap: 48, marginTop: 64, paddingTop: 40,
                        borderTop: "1px solid rgba(255,255,255,.08)"
                    }}>
                        {[
                            { val: count.cars, suffix: "", label: "Active Vehicles" },
                            { val: count.users.toLocaleString(), suffix: "+", label: "Registered Users" },
                            { val: "$" + count.rev.toLocaleString(), suffix: "", label: "Daily Revenue" },
                        ].map(s => (
                            <div key={s.label}>
                                <div style={{ fontFamily: "'Syne',sans-serif", fontSize: 36, fontWeight: 800, color: "#fff", lineHeight: 1 }}>
                                    {s.val}<span style={{ color: Colors.green }}>{s.suffix}</span>
                                </div>
                                <div style={{ fontSize: 12, color: "#8696A0", marginTop: 6, fontWeight: 600, textTransform:"uppercase", letterSpacing:"1px" }}>
                                    {s.label}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Right — Cinematic Mockup */}
                <div className="fade-up s3" style={{ position: "relative", zIndex: 10, display: "flex", justifyContent: "center" }}>
                    <div style={{
                        background: "rgba(28,43,51,.8)", backdropFilter:"blur(24px)",
                        border: `1px solid rgba(255,255,255,.08)`, borderRadius: 32,
                        padding: 30, width: "100%", maxWidth: 540,
                        boxShadow: "0 50px 100px -20px rgba(0,0,0,1), 0 0 60px rgba(37,211,102,.1)",
                        animation: "floatY 8s ease-in-out infinite",
                    }}>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 28 }}>
                            <span style={{ fontFamily: "'Syne',sans-serif", fontSize: 18, fontWeight: 700 }}>Live Operations</span>
                            <span style={{
                                background: "rgba(37,211,102,.12)", color: Colors.green, fontSize: 11, fontWeight: 800,
                                padding: "4px 12px", borderRadius: 100, border: `1px solid rgba(37,211,102,.3)`,
                                display: "flex", alignItems: "center", gap: 6, letterSpacing:"1px"
                            }}>
                                <span style={{ width: 6, height: 6, background: Colors.green, borderRadius: "50%", animation: "pulse 2s infinite" }} />
                                LIVE
                            </span>
                        </div>

                        {/* KPI Row */}
                        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 12, marginBottom: 20 }}>
                            {[
                                { label: "Fleet Util", val: "84%", change: "↑ Optimal" },
                                { label: "Pending", val: "12", change: "⚠ Action req" },
                                { label: "Revenue", val: "$8.4k", change: "↑ Today" },
                            ].map(k => (
                                <div key={k.label} style={{
                                    background: "rgba(17,27,33,.6)", borderRadius: 16, padding: "16px 14px",
                                    border: `1px solid rgba(255,255,255,.06)`
                                }}>
                                    <div style={{ fontSize: 10, color: "#8696A0", textTransform: "uppercase", letterSpacing: "1px", marginBottom: 6 }}>
                                        {k.label}
                                    </div>
                                    <div style={{ fontFamily: "'Syne',sans-serif", fontSize: 24, fontWeight: 800, color: Colors.green, lineHeight: 1 }}>
                                        {k.val}
                                    </div>
                                    <div style={{ fontSize: 10, color: k.label==="Pending" ? "#FFD166" : Colors.green, marginTop: 6, fontWeight:600 }}>{k.change}</div>
                                </div>
                            ))}
                        </div>

                        {/* Chart */}
                        <div style={{ background: "rgba(17,27,33,.6)", borderRadius: 16, border: `1px solid rgba(255,255,255,.06)`, padding: 20, marginBottom: 20 }}>
                            <div style={{ fontSize: 11, color: "#8696A0", textTransform: "uppercase", letterSpacing: "1px", marginBottom: 16, fontWeight: 700 }}>
                                7-Day Revenue Trend
                            </div>
                            <div style={{ display: "flex", alignItems: "flex-end", gap: 8, height: 80 }}>
                                {bars.map((h, i) => (
                                    <div key={i} style={{
                                        flex: 1, height: `${h}%`, borderRadius: "4px 4px 0 0",
                                        background: i === 6 || i === 5 ? "linear-gradient(180deg, #25D366, #128C7E)" : "rgba(134,150,160,.2)",
                                    }} />
                                ))}
                            </div>
                        </div>

                        {/* Recent Bookings */}
                        {[
                            { img: "https://images.unsplash.com/photo-1590362891991-f776e747a588?auto=format&fit=crop&q=80&w=150", name: "Toyota Corolla", status: "Active", sc: "rgba(37,211,102,.12)", cc: Colors.green },
                            { img: "https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&q=80&w=150", name: "BMW X5 M Sport", status: "Pending", sc: "rgba(255,209,102,.12)", cc: "#FFD166" },
                        ].map(c => (
                            <div key={c.name} style={{
                                display: "flex", alignItems: "center", justifyContent: "space-between",
                                background: "rgba(17,27,33,.6)", border: `1px solid rgba(255,255,255,.06)`,
                                borderRadius: 16, padding: "12px 16px", marginBottom: 10,
                            }}>
                                <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                                    <img src={c.img} alt={c.name} style={{ width: 44, height: 32, borderRadius: 6, objectFit:"cover", border:"1px solid rgba(255,255,255,.1)" }} />
                                    <div>
                                        <div style={{ fontSize: 14, fontWeight: 600 }}>{c.name}</div>
                                        <div style={{ fontSize: 12, color: "#8696A0" }}>Raza K. · 3 Days</div>
                                    </div>
                                </div>
                                <span style={{ fontSize: 11, fontWeight: 800, padding: "5px 12px", borderRadius: 100, background: c.sc, color: c.cc, border: `1px solid ${c.cc}40` }}>
                                    {c.status}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── FEATURES ────────────────────────────────────────────── */}
            <section style={{ padding: "120px 48px", background: "#111B21", borderTop: `1px solid rgba(255,255,255,.05)` }}>
                <div style={{ textAlign: "center", marginBottom: 80 }}>
                    <SectionLabel>Platform Features</SectionLabel>
                    <h2 style={{ fontFamily: "'Syne',sans-serif", fontSize: "clamp(36px, 4vw, 54px)", fontWeight: 800, letterSpacing: "-1.5px", marginBottom: 20 }}>
                        Engineered for Scale.
                    </h2>
                    <p style={{ fontSize: 17, color: "#8696A0", maxWidth: 600, margin: "0 auto", fontWeight: 400, lineHeight: 1.6 }}>
                        A dual-interface platform bridging the gap between customer convenience and administrative power.
                    </p>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 24, maxWidth:1300, margin:"0 auto" }}>
                    {[
                        { icon: <Icon d={I.car} size={28} color={Colors.green} />, title: "Smart Fleet Catalogue", desc: "Advanced vehicle filtering by price, brand, and category with live availability status.", tag: "Client Portal" },
                        { icon: <Icon d={I.calendar} size={28} color={Colors.green} />, title: "Interactive Booking", desc: "Conflict-free calendar booking with automatic cost calculations and dynamic promo codes.", tag: "Client Portal" },
                        { icon: <Icon d={I.lock} size={28} color={Colors.green} />, title: "Enterprise Security", desc: "Role-based access control with robust JWT sessions and heavily encrypted endpoints.", tag: "Security Layer" },
                        { icon: <Icon d={I.dashboard} size={28} color={Colors.green} />, title: "Command Dashboard", desc: "Bird's-eye view of your operations. Live revenue, active bookings, and actionable KPIs.", tag: "Admin Panel" },
                        { icon: <Icon d={I.dollar} size={28} color={Colors.green} />, title: "Revenue Operations", desc: "Process bookings, confirm payments, and instantly calculate dynamic pricing models.", tag: "Admin Panel" },
                        { icon: <Icon d={I.chart} size={28} color={Colors.green} />, title: "Advanced Analytics", desc: "Exportable fleet utilization data and multi-month revenue tracking for growth strategies.", tag: "Admin Panel" },
                    ].map((f, i) => (
                        <RevealBox key={f.title} style={{ transitionDelay: `${i * 0.08}s` }}>
                            <FeatureCard {...f} />
                        </RevealBox>
                    ))}
                </div>
            </section>

            {/* ── FLOW ────────────────────────────────────────────────── */}
            <section style={{ padding: "120px 48px", background: "#0B1114" }}>
                <div style={{ textAlign: "center", marginBottom: 80 }}>
                    <SectionLabel>Process Flow</SectionLabel>
                    <h2 style={{ fontFamily: "'Syne',sans-serif", fontSize: "clamp(36px, 4vw, 54px)", fontWeight: 800, letterSpacing: "-1.5px", marginBottom: 20 }}>
                        Frictionless Booking.
                    </h2>
                    <p style={{ fontSize: 17, color: "#8696A0", maxWidth: 600, margin: "0 auto", fontWeight: 400, lineHeight: 1.6 }}>
                        From initial search to confirmed reservation in under 60 seconds.
                    </p>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 30, position: "relative", maxWidth:1300, margin:"0 auto" }}>
                    <div style={{
                        position: "absolute", top: 44, left: "12.5%", right: "12.5%", height: 2,
                        background: `repeating-linear-gradient(90deg, ${Colors.green} 0, ${Colors.green} 6px, transparent 6px, transparent 18px)`,
                        opacity: 0.15,
                    }} />
                    {[
                        { n: "01", title: "Select Vehicle", desc: "Browse high-res images and detailed specs to find the perfect ride." },
                        { n: "02", title: "Choose Dates", desc: "Pick pickup and drop-off dates via our intelligent conflict-free calendar." },
                        { n: "03", title: "Instant Review", desc: "View the comprehensive cost breakdown including taxes and promos." },
                        { n: "04", title: "Admin Approval", desc: "Your booking hits the operations desk instantly for immediate dispatch." },
                    ].map((s, i) => (
                        <RevealBox key={s.n} style={{ textAlign: "center", padding: "0 10px", transitionDelay: `${i * 0.15}s` }}>
                            <div style={{
                                width: 88, height: 88, borderRadius: "50%", background: "#111B21",
                                border: `2px solid ${Colors.green}`, display: "flex", alignItems: "center", justifyContent: "center",
                                fontFamily: "'Syne',sans-serif", fontSize: 28, fontWeight: 900, color: Colors.green,
                                margin: "0 auto 30px", position: "relative", zIndex: 1, boxShadow: "0 10px 30px rgba(37,211,102,.15)"
                            }}>
                                {s.n}
                            </div>
                            <div style={{ fontFamily: "'Syne',sans-serif", fontSize: 20, fontWeight: 800, marginBottom: 14 }}>
                                {s.title}
                            </div>
                            <p style={{ fontSize: 14, color: "#8696A0", lineHeight: 1.6, fontWeight: 400 }}>{s.desc}</p>
                        </RevealBox>
                    ))}
                </div>
            </section>

            {/* ── TECH STACK ────────────────────────────────────────── */}
            <section style={{ padding: "100px 48px", background: "#111B21", borderTop: `1px solid rgba(255,255,255,.05)` }}>
                <div style={{ textAlign: "center", marginBottom: 60 }}>
                    <SectionLabel>Technology Stack</SectionLabel>
                    <h2 style={{ fontFamily: "'Syne',sans-serif", fontSize: "clamp(32px, 3.5vw, 46px)", fontWeight: 800, letterSpacing: "-1.5px" }}>
                        Built on Modern Foundations.
                    </h2>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(6,1fr)", gap: 16, maxWidth:1200, margin:"0 auto" }}>
                    {[
                        { icon: <Icon d={I.react} size={36} color="#61DAFB" />, name: "React 18", role: "UI Framework" },
                        { icon: <Icon d={I.server} size={36} color="#339933" />, name: "Node.js", role: "Runtime" },
                        { icon: <Icon d={I.db} size={36} color="#00758F" />, name: "MySQL", role: "Relational DB" },
                        { icon: <Icon d={I.shield} size={36} color="#FFD166" />, name: "JWT Auth", role: "Security" },
                        { icon: <Icon d={I.card} size={36} color="#635BFF" />, name: "Stripe API", role: "Payments" },
                        { icon: <Icon d={I.dashboard} size={36} color="#EF476F" />, name: "Lucide", role: "Iconography" },
                    ].map((t, i) => (
                        <RevealBox key={t.name} style={{ transitionDelay: `${i * 0.05}s` }}>
                            <TechCard {...t} />
                        </RevealBox>
                    ))}
                </div>
            </section>

            {/* ── ROADMAP ────────────────────────────────────────────── */}
            <section style={{ padding: "120px 48px", background: "#0B1114", borderTop: `1px solid rgba(255,255,255,.05)` }}>
                <div style={{ marginBottom: 80, textAlign:"center" }}>
                    <SectionLabel>Roadmap</SectionLabel>
                    <h2 style={{ fontFamily: "'Syne',sans-serif", fontSize: "clamp(36px, 4vw, 54px)", fontWeight: 800, letterSpacing: "-1.5px", marginBottom: 20 }}>
                        What's Next.
                    </h2>
                    <p style={{ fontSize: 17, color: "#8696A0", maxWidth: 600, margin: "0 auto", fontWeight: 400, lineHeight: 1.6 }}>
                        Our architecture is modular. Tomorrow's features plug directly into today's foundation.
                    </p>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 24, maxWidth:1300, margin:"0 auto" }}>
                    {[
                        { phase: "Phase 2", icon: <Icon d={I.smartphone} size={24} color={Colors.green} />, title: "Native Mobile App", desc: "iOS & Android clients for remote unlocking and push notifications.", tag: "React Native" },
                        { phase: "Phase 2", icon: <Icon d={I.mapPin} size={24} color={Colors.green} />, title: "GPS Live Tracking", desc: "Real-time fleet location mapping inside the admin dashboard.", tag: "Google Maps API" },
                        { phase: "Phase 3", icon: <Icon d={I.brain} size={24} color={Colors.green} />, title: "AI Recommendations", desc: "Machine learning for dynamic pricing and personalized fleet suggestions.", tag: "Python ML" },
                        { phase: "Phase 3", icon: <Icon d={I.globe} size={24} color={Colors.green} />, title: "Multi-Region Scaling", desc: "City-specific zoning and localized inventory routing.", tag: "Microservices" },
                        { phase: "Phase 4", icon: <Icon d={I.trophy} size={24} color={Colors.green} />, title: "Loyalty Program", desc: "Automated reward tiers based on booking frequency and volume.", tag: "Gamification" },
                        { phase: "Phase 4", icon: <Icon d={I.link} size={24} color={Colors.green} />, title: "Smart Contracts", desc: "Blockchain verifications for tamper-proof rental damage claims.", tag: "Web3" },
                    ].map((f, i) => (
                        <RevealBox key={f.title} style={{ transitionDelay: `${i * 0.1}s` }}>
                            <FutureCard {...f} num={`0${i + 1}`} />
                        </RevealBox>
                    ))}
                </div>
            </section>
        </div>
    );
};
