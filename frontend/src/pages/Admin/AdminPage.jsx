import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { useBookings } from "../../context/BookingContext";
import { injectGlobalStyles } from "../../utils/helpers";
import { ADMIN_CSS } from "./adminStyles";

import { DashboardSection } from "./sections/DashboardSection";
import { FleetSection }     from "./sections/FleetSection";
import { BookingsSection }  from "./sections/BookingsSection";
import { UsersSection }     from "./sections/UsersSection";
import { PricingSection }   from "./sections/PricingSection";
import { ReportsSection }   from "./sections/ReportsSection";
import { SecuritySection }  from "./sections/SecuritySection";
import { SettingsSection }  from "./sections/SettingsSection";

/* ── Lucide inline SVG ────────────────────────────────────────── */
const Icon = ({ d, size = 16, color = "currentColor", strokeW = 1.8 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
        stroke={color} strokeWidth={strokeW} strokeLinecap="round" strokeLinejoin="round">
        <path d={d} />
    </svg>
);

const NAV_ICONS = {
    Dashboard: "M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2zM9 22V12h6v10",
    Fleet:     "M5 17H3a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v5M7 17a2 2 0 1 0 4 0 2 2 0 0 0-4 0m10 0a2 2 0 1 0 4 0 2 2 0 0 0-4 0",
    Bookings:  "M3 9h18M3 4h18a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1zM8 2v4M16 2v4",
    Users:     "M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75",
    Pricing:   "M12 1v22M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6",
    Reports:   "M18 20V10M12 20V4M6 20v-6",
    Security:  "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z",
    Settings:  "M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z",
    Logout:    "M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9",
};

const SIDE_TABS = ["Dashboard","Fleet","Bookings","Users","Pricing","Reports","Security","Settings"];

/**
 * AdminPage — Agency-grade admin panel with live BookingContext integration
 */
export const AdminPage = ({ setPage }) => {
    const { currentUser, logout } = useAuth();
    const { bookings }            = useBookings();
    const [sideTab, setSideTab]   = useState("Dashboard");
    const [sideCollapsed, setSideCollapsed] = useState(false);

    useEffect(() => { injectGlobalStyles(ADMIN_CSS, "veloce-admin"); }, []);

    const pendingCount = bookings.filter(b => b.status === "Pending").length;

    function handleLogout() { logout(); setPage("Home"); }

    /* ── Live badge counts ─────────────────────────────────────── */
    function badgeFor(tab) {
        if (tab === "Bookings") return pendingCount > 0 ? pendingCount : null;
        if (tab === "Fleet")    return 9;
        return null;
    }

    const SECTION_MAP = {
        Dashboard: <DashboardSection setSideTab={setSideTab} />,
        Fleet:     <FleetSection />,
        Bookings:  <BookingsSection />,
        Users:     <UsersSection />,
        Pricing:   <PricingSection />,
        Reports:   <ReportsSection />,
        Security:  <SecuritySection />,
        Settings:  <SettingsSection />,
    };

    const SIDEBAR_W = sideCollapsed ? 72 : 240;

    return (
        <div style={{ display:"flex", minHeight:"100vh", background:"#111B21",
            fontFamily:"'DM Sans',sans-serif", color:"#fff" }}>

            {/* ── Sidebar ──────────────────────────────────────────── */}
            <aside style={{
                width: SIDEBAR_W, flexShrink:0,
                background:"#1C2B33",
                borderRight:"1px solid #2A3942",
                display:"flex", flexDirection:"column",
                position:"fixed", top:0, bottom:0, left:0, zIndex:100,
                transition:"width .25s cubic-bezier(.4,0,.2,1)",
                overflow:"hidden",
            }}>
                {/* Logo */}
                <div style={{ padding:sideCollapsed ? "20px 0" : "20px 20px 16px",
                    borderBottom:"1px solid #2A3942",
                    display:"flex", alignItems:"center",
                    justifyContent: sideCollapsed ? "center" : "space-between",
                    gap:10, flexShrink:0 }}>
                    {!sideCollapsed && (
                        <div style={{ display:"flex", alignItems:"center", gap:10 }}>
                            <div style={{ width:34, height:34, borderRadius:10,
                                background:"linear-gradient(135deg,#25D366,#128C7E)",
                                display:"flex", alignItems:"center", justifyContent:"center",
                                fontSize:16, fontWeight:900, color:"#111B21",
                                fontFamily:"'Syne',sans-serif", flexShrink:0 }}>V</div>
                            <div>
                                <div style={{ fontFamily:"'Syne',sans-serif", fontSize:15,
                                    fontWeight:800, color:"#fff", lineHeight:1 }}>VELOCE</div>
                                <div style={{ fontSize:10, color:"#25D366", fontWeight:700,
                                    letterSpacing:"1.5px" }}>ADMIN</div>
                            </div>
                        </div>
                    )}
                    {sideCollapsed && (
                        <div style={{ width:34, height:34, borderRadius:10,
                            background:"linear-gradient(135deg,#25D366,#128C7E)",
                            display:"flex", alignItems:"center", justifyContent:"center",
                            fontSize:16, fontWeight:900, color:"#111B21",
                            fontFamily:"'Syne',sans-serif" }}>V</div>
                    )}
                    <button onClick={() => setSideCollapsed(!sideCollapsed)}
                        style={{ background:"transparent", border:"1px solid #2A3942",
                            borderRadius:7, width:28, height:28, cursor:"pointer",
                            display:"flex", alignItems:"center", justifyContent:"center",
                            flexShrink:0, transition:"all .2s",
                            color:"#8696A0" }}>
                        <Icon d={sideCollapsed
                            ? "M9 18l6-6-6-6"
                            : "M15 18l-6-6 6-6"} size={14} color="#8696A0" />
                    </button>
                </div>

                {/* Nav items */}
                <nav style={{ flex:1, padding:"12px 8px", overflowY:"auto",
                    overflowX:"hidden" }}>
                    {SIDE_TABS.map(tab => {
                        const active  = sideTab === tab;
                        const badge   = badgeFor(tab);
                        return (
                            <button key={tab} onClick={() => setSideTab(tab)}
                                title={sideCollapsed ? tab : undefined}
                                style={{
                                    width:"100%", display:"flex",
                                    alignItems:"center",
                                    justifyContent: sideCollapsed ? "center" : "flex-start",
                                    gap:10, padding: sideCollapsed ? "11px 0" : "11px 14px",
                                    borderRadius:10, border:"none",
                                    background: active
                                        ? "rgba(37,211,102,.08)"
                                        : "transparent",
                                    color: active ? "#25D366" : "#8696A0",
                                    cursor:"pointer",
                                    fontFamily:"'DM Sans',sans-serif",
                                    fontSize:13, fontWeight: active ? 700 : 500,
                                    marginBottom:2,
                                    transition:"all .15s",
                                    borderLeft: active && !sideCollapsed
                                        ? "3px solid #25D366"
                                        : "3px solid transparent",
                                    position:"relative",
                                    whiteSpace:"nowrap",
                                }}>
                                <Icon d={NAV_ICONS[tab]} size={17}
                                    color={active ? "#25D366" : "#8696A0"} />
                                {!sideCollapsed && <span>{tab}</span>}
                                {badge && (
                                    <span style={{
                                        marginLeft:"auto",
                                        background: tab === "Bookings" ? "#FFD166" : "rgba(37,211,102,.15)",
                                        color:      tab === "Bookings" ? "#111B21" : "#25D366",
                                        fontSize:10, fontWeight:800,
                                        padding:"2px 7px", borderRadius:100,
                                        minWidth:20, textAlign:"center",
                                        display: sideCollapsed ? "none" : "block",
                                    }}>{badge}</span>
                                )}
                                {/* Collapsed dot badge */}
                                {badge && sideCollapsed && (
                                    <span style={{
                                        position:"absolute", top:6, right:6,
                                        width:8, height:8, borderRadius:"50%",
                                        background: tab === "Bookings" ? "#FFD166" : "#25D366",
                                    }} />
                                )}
                            </button>
                        );
                    })}
                </nav>

                {/* User profile + logout */}
                <div style={{ padding:sideCollapsed ? "12px 8px" : "12px",
                    borderTop:"1px solid #2A3942", flexShrink:0 }}>
                    {!sideCollapsed && (
                        <div style={{ display:"flex", alignItems:"center", gap:10,
                            padding:"10px 12px", background:"rgba(134,150,160,.05)",
                            borderRadius:10, marginBottom:8 }}>
                            <div style={{
                                width:34, height:34, borderRadius:"50%",
                                background:"linear-gradient(135deg,#25D366,#128C7E)",
                                display:"flex", alignItems:"center", justifyContent:"center",
                                fontSize:14, fontWeight:800, color:"#111B21",
                                fontFamily:"'Syne',sans-serif", flexShrink:0,
                            }}>
                                {currentUser?.avatar || "A"}
                            </div>
                            <div style={{ minWidth:0 }}>
                                <div style={{ fontSize:13, fontWeight:700, color:"#fff",
                                    whiteSpace:"nowrap", overflow:"hidden",
                                    textOverflow:"ellipsis" }}>
                                    {currentUser?.name || "Admin"}
                                </div>
                                <div style={{ fontSize:10, color:"#25D366", fontWeight:700 }}>
                                    Super Admin
                                </div>
                            </div>
                        </div>
                    )}
                    <button onClick={handleLogout}
                        style={{ width:"100%", display:"flex", alignItems:"center",
                            justifyContent: sideCollapsed ? "center" : "flex-start",
                            gap:10, padding: sideCollapsed ? "10px 0" : "10px 12px",
                            borderRadius:10, border:"1px solid rgba(239,71,111,.2)",
                            background:"rgba(239,71,111,.06)", color:"#EF476F",
                            cursor:"pointer", fontSize:13, fontWeight:600,
                            fontFamily:"'DM Sans',sans-serif", transition:"all .2s" }}>
                        <Icon d={NAV_ICONS.Logout} size={15} color="#EF476F" />
                        {!sideCollapsed && "Sign Out"}
                    </button>
                </div>
            </aside>

            {/* ── Main content ─────────────────────────────────────── */}
            <div style={{ marginLeft:SIDEBAR_W, flex:1, display:"flex",
                flexDirection:"column", transition:"margin-left .25s cubic-bezier(.4,0,.2,1)" }}>

                {/* Top bar */}
                <header style={{
                    position:"sticky", top:0, zIndex:90,
                    background:"rgba(28,43,51,.92)", backdropFilter:"blur(12px)",
                    borderBottom:"1px solid #2A3942",
                    padding:"0 28px", height:60,
                    display:"flex", alignItems:"center", justifyContent:"space-between",
                }}>
                    {/* Breadcrumb */}
                    <div style={{ display:"flex", alignItems:"center", gap:8 }}>
                        <span style={{ fontSize:12, color:"#8696A0" }}>Admin</span>
                        <span style={{ fontSize:12, color:"#2A3942" }}>/</span>
                        <span style={{ fontSize:13, fontWeight:700, color:"#fff" }}>{sideTab}</span>
                    </div>

                    {/* Right cluster */}
                    <div style={{ display:"flex", alignItems:"center", gap:12 }}>
                        {/* Live indicator */}
                        <div style={{ display:"flex", alignItems:"center", gap:6,
                            fontSize:11, color:"#25D366", fontWeight:700 }}>
                            <span style={{ width:7, height:7, borderRadius:"50%",
                                background:"#25D366",
                                animation:"admPulse 2s infinite" }} />
                            LIVE
                        </div>

                        {/* Pending bookings bell */}
                        {pendingCount > 0 && (
                            <button onClick={() => setSideTab("Bookings")}
                                style={{ position:"relative", background:"transparent",
                                    border:"1px solid rgba(255,209,102,.25)",
                                    borderRadius:9, padding:"6px 10px", cursor:"pointer",
                                    display:"flex", alignItems:"center", gap:6 }}>
                                <Icon d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 0 1-3.46 0"
                                    size={15} color="#FFD166" />
                                <span style={{ fontSize:11, fontWeight:800, color:"#FFD166" }}>
                                    {pendingCount} pending
                                </span>
                                <span style={{ position:"absolute", top:-4, right:-4,
                                    width:8, height:8, borderRadius:"50%",
                                    background:"#FFD166" }} />
                            </button>
                        )}

                        {/* Go to site */}
                        <button onClick={() => setPage("Home")}
                            style={{ background:"transparent",
                                border:"1px solid #2A3942", borderRadius:9,
                                padding:"7px 14px", cursor:"pointer",
                                fontSize:12, color:"#8696A0", fontWeight:600,
                                display:"flex", alignItems:"center", gap:6,
                                fontFamily:"'DM Sans',sans-serif", transition:"all .2s" }}>
                            <Icon d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3"
                                size={13} color="#8696A0" />
                            View Site
                        </button>
                    </div>
                </header>

                {/* Section content */}
                <main style={{ flex:1, padding:"28px 32px", overflowY:"auto" }}>
                    {SECTION_MAP[sideTab]}
                </main>
            </div>

            {/* Pulse animation */}
            <style>{`
                @keyframes admPulse {
                    0%, 100% { opacity:1; transform:scale(1); }
                    50%       { opacity:.6; transform:scale(1.4); }
                }
            `}</style>
        </div>
    );
};
