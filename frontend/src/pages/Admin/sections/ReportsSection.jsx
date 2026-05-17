import { Colors } from "../../../constants/designTokens";

const MONTHS = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
const REVENUE = [38,52,44,67,81,74,90,88,95,72,84,92];
const BOOKINGS_PER_MONTH = [22,31,28,40,52,47,58,55,61,44,53,59];
const CHART_H = 110;

const TOP_CARS = [
    { name:"Ferrari Roma 2024",        cat:"Luxury",  bookings:18, revenue:"$11,700", rating:"4.9" },
    { name:"BMW X5 M Sport",           cat:"Luxury",  bookings:15, revenue:"$13,500", rating:"4.8" },
    { name:"Mercedes-Benz E-Class",    cat:"Luxury",  bookings:14, revenue:"$3,080",  rating:"4.9" },
    { name:"Kia Sportage X",           cat:"SUV",     bookings:21, revenue:"$1,785",  rating:"4.7" },
    { name:"Toyota Corolla 2024",      cat:"Economy", bookings:29, revenue:"$1,305",  rating:"4.6" },
];

const CAT_SHARE = [
    { cat:"Economy", pct:32, color:"#118AB2" },
    { cat:"Sedan",   pct:24, color:"#25D366" },
    { cat:"SUV",     pct:28, color:"#FFD166" },
    { cat:"Luxury",  pct:16, color:"#EF476F" },
];

export const ReportsSection = () => {
    const maxRev = Math.max(...REVENUE);
    const maxBK  = Math.max(...BOOKINGS_PER_MONTH);
    const totalRevenue  = REVENUE.reduce((a,b)=>a+b,0);
    const totalBookings = BOOKINGS_PER_MONTH.reduce((a,b)=>a+b,0);

    return (
        <div className="adm-section">
            <div className="adm-header">
                <div>
                    <h2 className="adm-section-title">Reports & Analytics</h2>
                    <p className="adm-section-sub">Business intelligence for 2026 · Updated in real-time</p>
                </div>
                <div className="adm-header-actions">
                    <button className="adm-btn adm-btn-ghost">⬇ Export PDF</button>
                    <button className="adm-btn adm-btn-ghost">📅 Date Range</button>
                </div>
            </div>

            {/* KPI row */}
            <div className="adm-kpi-grid" style={{ marginBottom:20 }}>
                {[
                    { label:"YTD Revenue",            val:`$${totalRevenue}k`, change:"↑ 23% vs 2025",     cc:"#25D366", icon:"💰" },
                    { label:"Total Bookings",          val:totalBookings,      change:"↑ 31% vs 2025",     cc:"#25D366", icon:"📅" },
                    { label:"Avg Revenue / Booking",   val:"$312",             change:"↑ $28 last month",  cc:"#118AB2", icon:"📊" },
                    { label:"Repeat Customers",        val:"64%",              change:"↑ 8pts YoY",        cc:"#FFD166", icon:"👥" },
                ].map(k => (
                    <div className="adm-kpi" key={k.label}>
                        <div className="adm-kpi-icon">{k.icon}</div>
                        <div className="adm-kpi-label">{k.label}</div>
                        <div className="adm-kpi-val" style={{ color:k.cc }}>{k.val}</div>
                        <div className="adm-kpi-change" style={{ color:k.cc }}>{k.change}</div>
                    </div>
                ))}
            </div>

            {/* Two charts side by side */}
            <div className="adm-grid-2" style={{ marginBottom:16 }}>
                {/* Revenue */}
                <div className="adm-panel" style={{ marginBottom:0 }}>
                    <div className="adm-panel-head">
                        <span className="adm-panel-title">Monthly Revenue ($k)</span>
                        <span style={{ fontSize:12, color:"#25D366", fontWeight:700 }}>${totalRevenue}k YTD</span>
                    </div>
                    <div className="adm-panel-body">
                        <div className="adm-chart-outer">
                            <div className="adm-chart-bars">
                                {REVENUE.map((v, i) => {
                                    const barH = Math.round((v / maxRev) * 110);
                                    return (
                                        <div className="adm-chart-bar-col" key={i}>
                                            <div className="adm-chart-bar" style={{ height:barH+"px" }} title={`$${v}k`} />
                                        </div>
                                    );
                                })}
                            </div>
                            <div className="adm-chart-labels">
                                {MONTHS.map(m => <div className="adm-chart-label-col" key={m}>{m}</div>)}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bookings */}
                <div className="adm-panel" style={{ marginBottom:0 }}>
                    <div className="adm-panel-head">
                        <span className="adm-panel-title">Monthly Bookings</span>
                        <span style={{ fontSize:12, color:"#118AB2", fontWeight:700 }}>{totalBookings} total</span>
                    </div>
                    <div className="adm-panel-body">
                        <div className="adm-chart-outer">
                            <div className="adm-chart-bars">
                                {BOOKINGS_PER_MONTH.map((v, i) => {
                                    const barH = Math.round((v / maxBK) * 110);
                                    return (
                                        <div className="adm-chart-bar-col" key={i}>
                                            <div className="adm-chart-bar adm-chart-bar--blue" style={{ height:barH+"px" }} title={v} />
                                        </div>
                                    );
                                })}
                            </div>
                            <div className="adm-chart-labels">
                                {MONTHS.map(m => <div className="adm-chart-label-col" key={m}>{m}</div>)}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Category share + Top cars */}
            <div style={{ display:"grid", gridTemplateColumns:"280px 1fr", gap:16 }}>
                <div className="adm-panel" style={{ marginBottom:0 }}>
                    <div className="adm-panel-head">
                        <span className="adm-panel-title">Bookings by Category</span>
                    </div>
                    <div className="adm-panel-body" style={{ display:"flex", flexDirection:"column", gap:16 }}>
                        {CAT_SHARE.map(s => (
                            <div key={s.cat}>
                                <div style={{ display:"flex", justifyContent:"space-between", marginBottom:5 }}>
                                    <span style={{ fontSize:13, fontWeight:600, color:"#fff" }}>{s.cat}</span>
                                    <span style={{ fontSize:13, fontWeight:700, color:s.color }}>{s.pct}%</span>
                                </div>
                                <div className="adm-bar-track">
                                    <div className="adm-bar-fill" style={{ width:`${s.pct}%`, background:s.color }} />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="adm-panel" style={{ marginBottom:0 }}>
                    <div className="adm-panel-head">
                        <span className="adm-panel-title">🏆 Top Performing Vehicles</span>
                        <span style={{ fontSize:12, color:"#8696A0" }}>By bookings · 2026</span>
                    </div>
                    <div className="adm-table-wrap">
                        <table className="adm-table">
                            <thead>
                                <tr>{["#","Vehicle","Category","Bookings","Revenue","Rating"].map(h=><th key={h}>{h}</th>)}</tr>
                            </thead>
                            <tbody>
                                {TOP_CARS.map((c,i) => (
                                    <tr key={c.name}>
                                        <td>
                                            <span style={{ fontFamily:"'Syne',sans-serif", fontWeight:800, fontSize:15,
                                                color: i===0?"#FFD700":i===1?"#C0C0C0":i===2?"#CD7F32":"#8696A0" }}>
                                                {i===0?"🥇":i===1?"🥈":i===2?"🥉":`#${i+1}`}
                                            </span>
                                        </td>
                                        <td style={{ fontWeight:600 }}>{c.name}</td>
                                        <td><span className="adm-badge" style={{ background:"rgba(134,150,160,.1)", color:"#8696A0" }}>{c.cat}</span></td>
                                        <td style={{ fontWeight:700, color:"#25D366" }}>{c.bookings}</td>
                                        <td style={{ fontWeight:700, color:"#118AB2" }}>{c.revenue}</td>
                                        <td style={{ color:"#FFD166", fontWeight:700 }}>⭐ {c.rating}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};
