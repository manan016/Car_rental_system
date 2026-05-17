import { useBookings } from "../../../context/BookingContext";

/* ── Lucide inline SVG helper ─────────────────────────────────── */
const Icon = ({ d, size = 16, color = "currentColor", strokeW = 1.8 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
        stroke={color} strokeWidth={strokeW} strokeLinecap="round" strokeLinejoin="round">
        <path d={d} />
    </svg>
);
const I = {
    car:      "M5 17H3a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v5M7 17a2 2 0 1 0 4 0 2 2 0 0 0-4 0m10 0a2 2 0 1 0 4 0 2 2 0 0 0-4 0",
    users:    "M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75",
    calendar: "M3 9h18M3 4h18a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1zM8 2v4M16 2v4",
    dollar:   "M12 1v22M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6",
    check:    "M20 6L9 17l-5-5",
    x:        "M18 6L6 18M6 6l12 12",
    eye:      "M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8zM12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6",
    trend:    "M23 6l-9.5 9.5-5-5L1 18M17 6h6v6",
    plus:     "M12 5v14M5 12h14",
    alert:    "M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0zM12 9v4M12 17h.01",
    download: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3",
};

const STATUS_MAP = {
    Pending:   { bg:"rgba(255,209,102,.12)", c:"#FFD166", border:"rgba(255,209,102,.25)" },
    Confirmed: { bg:"rgba(37,211,102,.12)",  c:"#25D366", border:"rgba(37,211,102,.25)"  },
    Completed: { bg:"rgba(17,138,178,.12)",  c:"#118AB2", border:"rgba(17,138,178,.25)"  },
    Cancelled: { bg:"rgba(239,71,111,.12)",  c:"#EF476F", border:"rgba(239,71,111,.25)"  },
};

const MONTHS = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
const REVENUE = [38, 52, 44, 67, 81, 74, 90, 88, 95, 72, 84, 92];
const maxRev  = Math.max(...REVENUE);

const AVATAR_COLORS = ["#25D366","#118AB2","#FFD166","#EF476F","#9B5DE5","#F15BB5","#00BBF9","#00F5D4"];
function avatarColor(str = "") {
    let h = 0; for (const c of str) h = c.charCodeAt(0) + ((h << 5) - h);
    return AVATAR_COLORS[Math.abs(h) % AVATAR_COLORS.length];
}

export const DashboardSection = ({ setSideTab }) => {
    const { bookings, updateBookingStatus } = useBookings();

    const now     = new Date();
    const greeting = now.getHours() < 12 ? "Good morning" : now.getHours() < 18 ? "Good afternoon" : "Good evening";
    const dateStr = now.toLocaleDateString("en-US", { weekday:"long", year:"numeric", month:"long", day:"numeric" });

    /* ── Computed KPIs from live data ──────────────────────────── */
    const totalBookings  = bookings.length;
    const pendingCount   = bookings.filter(b => b.status === "Pending").length;
    const totalRevenue   = bookings.filter(b => b.status !== "Cancelled")
                                   .reduce((s, b) => s + (b.total || 0), 0);
    const confirmedCount = bookings.filter(b => b.status === "Confirmed").length;

    const kpis = [
        { label:"Active Cars",      val:"48",                  change:"↑ 3 this week",                cc:"#25D366", icon:I.car      },
        { label:"Total Bookings",   val:totalBookings,         change:`${confirmedCount} confirmed`,   cc:"#25D366", icon:I.calendar },
        { label:"Pending Approval", val:pendingCount,          change: pendingCount > 0 ? "⚠ Action needed" : "✓ All clear",
          cc: pendingCount > 0 ? "#FFD166" : "#25D366",                                                              icon:I.alert    },
        { label:"Lifetime Revenue", val:`$${(totalRevenue/1000).toFixed(1)}k`,
          change:"Across all bookings",                                                                cc:"#25D366", icon:I.dollar   },
    ];

    /* ── Recent 5 bookings ─────────────────────────────────────── */
    const recentBookings = [...bookings]
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .slice(0, 5);

    return (
        <div className="adm-section">
            {/* ── Header ─────────────────────────────────────────── */}
            <div className="adm-header">
                <div>
                    <h2 className="adm-section-title">{greeting}, Admin 👋</h2>
                    <p className="adm-section-sub">{dateStr} · Real-time booking data</p>
                </div>
                <div className="adm-header-actions">
                    <button className="adm-btn adm-btn-ghost">
                        <Icon d={I.download} size={14} /> Export CSV
                    </button>
                    <button className="adm-btn adm-btn-primary" onClick={() => setSideTab("Fleet")}>
                        <Icon d={I.plus} size={14} /> Add Vehicle
                    </button>
                </div>
            </div>

            {/* ── KPI Cards ──────────────────────────────────────── */}
            <div className="adm-kpi-grid">
                {kpis.map(k => (
                    <div className="adm-kpi" key={k.label}>
                        <div style={{ position:"absolute", right:16, top:16,
                            opacity:.15 }}>
                            <Icon d={k.icon} size={32} color="#fff" />
                        </div>
                        <div className="adm-kpi-label">{k.label}</div>
                        <div className="adm-kpi-val" style={{ color:k.cc }}>
                            {typeof k.val === "number" ? k.val.toLocaleString() : k.val}
                        </div>
                        <div className="adm-kpi-change" style={{ color:k.cc }}>{k.change}</div>
                    </div>
                ))}
            </div>

            {/* ── Two-col: Revenue chart + Fleet health ──────────── */}
            <div style={{ display:"grid", gridTemplateColumns:"1fr 300px", gap:16, marginBottom:16 }}>
                {/* Revenue Chart */}
                <div className="adm-panel" style={{ marginBottom:0 }}>
                    <div className="adm-panel-head">
                        <span className="adm-panel-title">Revenue Overview — 2026</span>
                        <span style={{ fontSize:13, color:"#25D366", fontWeight:700 }}>
                            <Icon d={I.trend} size={13} color="#25D366" /> ${REVENUE.reduce((a,b)=>a+b,0)}k YTD
                        </span>
                    </div>
                    <div className="adm-panel-body">
                        <div className="adm-chart-outer">
                            <div className="adm-chart-bars">
                                {REVENUE.map((v, i) => (
                                    <div className="adm-chart-bar-col" key={i}>
                                        <div className="adm-chart-bar"
                                            style={{ height: Math.round((v / maxRev) * 110) + "px" }}
                                            title={`$${v}k`} />
                                    </div>
                                ))}
                            </div>
                            <div className="adm-chart-labels">
                                {MONTHS.map(m => <div className="adm-chart-label-col" key={m}>{m}</div>)}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Fleet Health */}
                <div className="adm-panel" style={{ marginBottom:0 }}>
                    <div className="adm-panel-head">
                        <span className="adm-panel-title">Fleet Health</span>
                    </div>
                    <div className="adm-panel-body" style={{ display:"flex", flexDirection:"column", gap:16 }}>
                        {[
                            { label:"Fleet Utilization", val:"78%",    bar:78, c:"#25D366" },
                            { label:"Avg Booking Days",  val:"4.2d",   bar:60, c:"#118AB2" },
                            { label:"Customer Rating",   val:"4.8 ★",  bar:96, c:"#FFD166" },
                            { label:"Maintenance Due",   val:"3 cars", bar:20, c:"#EF476F" },
                        ].map(s => (
                            <div key={s.label}>
                                <div style={{ display:"flex", justifyContent:"space-between", marginBottom:4 }}>
                                    <span style={{ fontSize:12, color:"#8696A0" }}>{s.label}</span>
                                    <span style={{ fontSize:12, fontWeight:700, color:s.c }}>{s.val}</span>
                                </div>
                                <div className="adm-bar-track">
                                    <div className="adm-bar-fill" style={{ width:`${s.bar}%`, background:s.c }} />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* ── Booking Status Breakdown ────────────────────────── */}
            <div className="adm-grid-4" style={{ marginBottom:16 }}>
                {["Pending","Confirmed","Completed","Cancelled"].map(s => {
                    const sm = STATUS_MAP[s];
                    const cnt = bookings.filter(b => b.status === s).length;
                    const pct = totalBookings > 0 ? Math.round((cnt/totalBookings)*100) : 0;
                    return (
                        <div className="adm-panel" key={s} style={{ marginBottom:0 }}>
                            <div className="adm-panel-body">
                                <div style={{ fontSize:11, color:sm.c, textTransform:"uppercase",
                                    letterSpacing:".6px", fontWeight:700, marginBottom:8 }}>{s}</div>
                                <div style={{ fontFamily:"'Syne',sans-serif", fontSize:26,
                                    fontWeight:800, color:"#fff", marginBottom:6 }}>{cnt}</div>
                                <div className="adm-bar-track">
                                    <div className="adm-bar-fill" style={{ width:`${pct}%`, background:sm.c }} />
                                </div>
                                <div style={{ fontSize:11, color:"#8696A0", marginTop:5 }}>{pct}% of all</div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* ── Recent Bookings table ───────────────────────────── */}
            <div className="adm-panel">
                <div className="adm-panel-head">
                    <span className="adm-panel-title">
                        Recent Bookings
                        {pendingCount > 0 && (
                            <span style={{ marginLeft:10, fontSize:11, fontWeight:700,
                                color:"#FFD166", background:"rgba(255,209,102,.1)",
                                border:"1px solid rgba(255,209,102,.2)",
                                padding:"2px 8px", borderRadius:100 }}>
                                {pendingCount} pending
                            </span>
                        )}
                    </span>
                    <button className="adm-btn adm-btn-ghost adm-btn-sm"
                        onClick={() => setSideTab("Bookings")}>
                        <Icon d={I.eye} size={13} /> View All
                    </button>
                </div>
                <div className="adm-table-wrap">
                    <table className="adm-table">
                        <thead>
                            <tr>
                                {["Booking","Customer","Vehicle","Dates","Amount","Status","Actions"].map(h => (
                                    <th key={h}>{h}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {recentBookings.map(b => {
                                const sc  = STATUS_MAP[b.status] || STATUS_MAP.Pending;
                                const ac  = avatarColor(b.user);
                                const ini = (b.user || "?").split(" ").map(w => w[0]).join("").slice(0,2).toUpperCase();
                                return (
                                    <tr key={b.id}>
                                        <td>
                                            <span style={{ fontFamily:"monospace", fontSize:11,
                                                color:"#8696A0", background:"rgba(134,150,160,.08)",
                                                padding:"3px 8px", borderRadius:5 }}>
                                                {b.id}
                                            </span>
                                        </td>
                                        <td>
                                            <div style={{ display:"flex", alignItems:"center", gap:8 }}>
                                                <div className="adm-avatar"
                                                    style={{ background:ac, width:30, height:30, fontSize:11 }}>
                                                    {ini}
                                                </div>
                                                <span style={{ fontWeight:600, fontSize:13 }}>{b.user}</span>
                                            </div>
                                        </td>
                                        <td>
                                            <div style={{ display:"flex", alignItems:"center", gap:8 }}>
                                                {b.image && (
                                                    <img src={b.image} alt={b.car}
                                                        style={{ width:40, height:26, objectFit:"cover",
                                                            borderRadius:5, border:"1px solid #2A3942" }}
                                                        onError={e => e.target.style.display="none"} />
                                                )}
                                                <span style={{ fontSize:12, color:"#8696A0" }}>{b.car}</span>
                                            </div>
                                        </td>
                                        <td style={{ fontSize:12, color:"#8696A0", whiteSpace:"nowrap" }}>
                                            {b.start} → {b.end}
                                        </td>
                                        <td style={{ fontWeight:700, color:"#25D366",
                                            fontFamily:"'Syne',sans-serif" }}>
                                            {b.amount}
                                        </td>
                                        <td>
                                            <span className="adm-badge"
                                                style={{ background:sc.bg, color:sc.c, borderColor:sc.border }}>
                                                {b.status}
                                            </span>
                                        </td>
                                        <td>
                                            {b.status === "Pending" ? (
                                                <div style={{ display:"flex", gap:6 }}>
                                                    <button className="adm-btn adm-btn-primary adm-btn-sm"
                                                        onClick={() => updateBookingStatus(b.id, "Confirmed")}>
                                                        <Icon d={I.check} size={12} /> Approve
                                                    </button>
                                                    <button className="adm-btn adm-btn-danger adm-btn-sm"
                                                        onClick={() => updateBookingStatus(b.id, "Cancelled")}>
                                                        <Icon d={I.x} size={12} />
                                                    </button>
                                                </div>
                                            ) : (
                                                <span style={{ color:"#8696A0", fontSize:12 }}>—</span>
                                            )}
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* ── Bottom stat cards ───────────────────────────────── */}
            <div className="adm-grid-3">
                {[
                    { label:"Top Vehicle",           val:"Ferrari Roma",
                      sub:`${bookings.filter(b=>b.car?.includes("Ferrari")).length} bookings`, c:"#FFD166" },
                    { label:"Busiest Day",            val:"Saturday",     sub:"avg 9 active bookings", c:"#25D366" },
                    { label:"Avg Revenue / Booking",
                      val: totalBookings > 0
                           ? `$${Math.round(totalRevenue / totalBookings)}`
                           : "$—",
                      sub:"Across confirmed orders", c:"#118AB2" },
                ].map(s => (
                    <div className="adm-panel" key={s.label} style={{ marginBottom:0 }}>
                        <div className="adm-panel-body">
                            <div style={{ fontSize:11, color:"#8696A0", textTransform:"uppercase",
                                letterSpacing:".6px", marginBottom:8 }}>{s.label}</div>
                            <div style={{ fontFamily:"'Syne',sans-serif", fontSize:22,
                                fontWeight:800, color:s.c, marginBottom:4 }}>{s.val}</div>
                            <div style={{ fontSize:12, color:"#8696A0" }}>{s.sub}</div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
