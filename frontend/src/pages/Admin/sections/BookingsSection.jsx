import { useState, useMemo } from "react";
import { useBookings } from "../../../context/BookingContext";

/* ── Lucide inline icon helper ────────────────────────────────── */
const Icon = ({ d, size = 15, color = "currentColor", strokeW = 1.8 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
        stroke={color} strokeWidth={strokeW} strokeLinecap="round" strokeLinejoin="round">
        <path d={d} />
    </svg>
);
const I = {
    search:  "M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16zM21 21l-4.35-4.35",
    filter:  "M22 3H2l8 9.46V19l4 2v-8.54L22 3z",
    check:   "M20 6L9 17l-5-5",
    x:       "M18 6L6 18M6 6l12 12",
    clock:   "M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zM12 6v6l4 2",
    refresh: "M23 4v6h-6M1 20v-6h6M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15",
    eye:     "M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8zM12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6",
    car:     "M5 17H3a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v5M7 17a2 2 0 1 0 4 0 2 2 0 0 0-4 0m10 0a2 2 0 1 0 4 0 2 2 0 0 0-4 0",
    user:    "M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8",
    calendar:"M3 9h18M3 4h18a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1zM8 2v4M16 2v4",
    credit:  "M1 4h22v16H1zM1 10h22",
    alert:   "M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0zM12 9v4M12 17h.01",
    bell:    "M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 0 1-3.46 0",
};

const STATUS_MAP = {
    Pending:   { bg:"rgba(255,209,102,.1)", c:"#FFD166", border:"rgba(255,209,102,.25)" },
    Confirmed: { bg:"rgba(37,211,102,.1)",  c:"#25D366", border:"rgba(37,211,102,.25)"  },
    Completed: { bg:"rgba(17,138,178,.1)",  c:"#118AB2", border:"rgba(17,138,178,.25)"  },
    Cancelled: { bg:"rgba(239,71,111,.1)",  c:"#EF476F", border:"rgba(239,71,111,.25)"  },
};

const FILTERS = ["All", "Pending", "Confirmed", "Completed", "Cancelled"];

const AVATAR_COLORS = [
    "#25D366","#118AB2","#FFD166","#EF476F",
    "#9B5DE5","#F15BB5","#00BBF9","#00F5D4",
];
function avatarColor(str) {
    let h = 0;
    for (let i = 0; i < str.length; i++) h = str.charCodeAt(i) + ((h << 5) - h);
    return AVATAR_COLORS[Math.abs(h) % AVATAR_COLORS.length];
}

export const BookingsSection = () => {
    const { bookings, updateBookingStatus } = useBookings();
    const [filter, setFilter]   = useState("All");
    const [search, setSearch]   = useState("");
    const [detail, setDetail]   = useState(null);   // booking being viewed
    const [sortBy, setSortBy]   = useState("newest");

    /* ── Derived lists ─────────────────────────────────────────── */
    const counts = useMemo(() => {
        const c = { All: bookings.length, Pending:0, Confirmed:0, Completed:0, Cancelled:0 };
        bookings.forEach(b => { if (c[b.status] !== undefined) c[b.status]++; });
        return c;
    }, [bookings]);

    const displayed = useMemo(() => {
        let list = bookings.filter(b => {
            const matchStatus = filter === "All" || b.status === filter;
            const q = search.toLowerCase();
            const matchSearch = !q || b.user.toLowerCase().includes(q)
                || b.car.toLowerCase().includes(q)
                || b.id.toLowerCase().includes(q)
                || (b.email || "").toLowerCase().includes(q);
            return matchStatus && matchSearch;
        });
        if (sortBy === "newest") list = [...list].sort((a,b) => new Date(b.createdAt) - new Date(a.createdAt));
        if (sortBy === "oldest") list = [...list].sort((a,b) => new Date(a.createdAt) - new Date(b.createdAt));
        if (sortBy === "amount") list = [...list].sort((a,b) => (b.total||0) - (a.total||0));
        return list;
    }, [bookings, filter, search, sortBy]);

    function approve(id)  { updateBookingStatus(id, "Confirmed"); }
    function reject(id)   { updateBookingStatus(id, "Cancelled"); }
    function complete(id) { updateBookingStatus(id, "Completed"); }

    const newBookingCount = counts["Pending"];

    /* ── Detail modal ──────────────────────────────────────────── */
    const DetailModal = ({ b }) => (
        <div className="adm-modal-overlay" onClick={() => setDetail(null)}>
            <div className="adm-modal" style={{ maxWidth:560 }}
                onClick={e => e.stopPropagation()}>
                <div className="adm-modal-head">
                    <div>
                        <div className="adm-modal-title">Booking Details</div>
                        <div style={{ fontSize:12, color:"#8696A0", marginTop:2 }}>{b.id}</div>
                    </div>
                    <button className="adm-modal-close" onClick={() => setDetail(null)}>✕</button>
                </div>

                {/* Car image */}
                {b.image && (
                    <div style={{ position:"relative", height:160, overflow:"hidden" }}>
                        <img src={b.image} alt={b.car}
                            style={{ width:"100%", height:"100%", objectFit:"cover" }}
                            onError={e => { e.target.style.background="#111B21"; }} />
                        <div style={{ position:"absolute", inset:0,
                            background:"linear-gradient(to top, rgba(17,27,33,.9) 0%, transparent 60%)" }} />
                        <div style={{ position:"absolute", bottom:12, left:20 }}>
                            <div style={{ fontFamily:"'Syne',sans-serif", fontSize:18,
                                fontWeight:800, color:"#fff" }}>{b.car}</div>
                        </div>
                    </div>
                )}

                <div className="adm-modal-body" style={{ display:"flex", flexDirection:"column", gap:0 }}>
                    {/* Status */}
                    <div style={{ marginBottom:16 }}>
                        {(() => {
                            const s = STATUS_MAP[b.status] || STATUS_MAP.Pending;
                            return (
                                <span className="adm-badge" style={{
                                    background:s.bg, color:s.c, borderColor:s.border }}>
                                    {b.status}
                                </span>
                            );
                        })()}
                    </div>

                    {/* Info grid */}
                    <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12, marginBottom:16 }}>
                        {[
                            { icon:I.user,     label:"Customer",  val:b.user },
                            { icon:I.car,      label:"Vehicle",   val:b.car },
                            { icon:I.calendar, label:"Pickup",    val:b.start },
                            { icon:I.calendar, label:"Return",    val:b.end },
                            { icon:I.clock,    label:"Duration",  val:`${b.days} day${b.days !== 1 ? "s" : ""}` },
                            { icon:I.credit,   label:"Total",     val:b.amount, c:"#25D366" },
                            { icon:I.credit,   label:"Payment",   val:b.payment === "stripe" ? "💳 Stripe" : "🅿 PayPal" },
                            { icon:I.bell,     label:"Booked",    val:b.createdAt ? new Date(b.createdAt).toLocaleDateString("en-US",{month:"short",day:"numeric",hour:"2-digit",minute:"2-digit"}) : "—" },
                        ].map(row => (
                            <div key={row.label} style={{ background:"#111B21",
                                border:"1px solid #2A3942", borderRadius:10, padding:"10px 12px" }}>
                                <div style={{ fontSize:10, color:"#8696A0", marginBottom:4,
                                    display:"flex", alignItems:"center", gap:5,
                                    textTransform:"uppercase", letterSpacing:".6px", fontWeight:700 }}>
                                    <Icon d={row.icon} size={10} color="#8696A0" /> {row.label}
                                </div>
                                <div style={{ fontSize:13, fontWeight:600,
                                    color: row.c || "#fff" }}>{row.val || "—"}</div>
                            </div>
                        ))}
                    </div>

                    {/* Contact */}
                    <div style={{ background:"#111B21", border:"1px solid #2A3942",
                        borderRadius:10, padding:"12px 14px", marginBottom:16 }}>
                        <div style={{ fontSize:10, color:"#8696A0", marginBottom:8,
                            textTransform:"uppercase", letterSpacing:".6px", fontWeight:700 }}>Contact Info</div>
                        <div style={{ fontSize:12, color:"#fff", marginBottom:4 }}>📧 {b.email || "—"}</div>
                        <div style={{ fontSize:12, color:"#fff" }}>📱 {b.phone || "—"}</div>
                    </div>

                    {/* Notes */}
                    {b.notes && (
                        <div style={{ background:"rgba(255,209,102,.05)", border:"1px solid rgba(255,209,102,.15)",
                            borderRadius:10, padding:"12px 14px", marginBottom:16 }}>
                            <div style={{ fontSize:11, color:"#FFD166", marginBottom:4, fontWeight:700 }}>Special Notes</div>
                            <div style={{ fontSize:13, color:"#fff" }}>{b.notes}</div>
                        </div>
                    )}
                </div>

                {/* Actions */}
                <div className="adm-modal-footer">
                    {b.status === "Pending" && (
                        <>
                            <button className="adm-btn adm-btn-danger adm-btn-sm"
                                onClick={() => { reject(b.id); setDetail(null); }}>
                                <Icon d={I.x} size={13} /> Reject
                            </button>
                            <button className="adm-btn adm-btn-primary adm-btn-sm"
                                onClick={() => { approve(b.id); setDetail(null); }}>
                                <Icon d={I.check} size={13} /> Approve
                            </button>
                        </>
                    )}
                    {b.status === "Confirmed" && (
                        <button className="adm-btn adm-btn-sm"
                            style={{ background:"rgba(17,138,178,.1)", color:"#118AB2",
                                border:"1px solid rgba(17,138,178,.25)" }}
                            onClick={() => { complete(b.id); setDetail(null); }}>
                            <Icon d={I.check} size={13} /> Mark Completed
                        </button>
                    )}
                    <button className="adm-btn adm-btn-ghost adm-btn-sm"
                        onClick={() => setDetail(null)}>Close</button>
                </div>
            </div>
        </div>
    );

    return (
        <div className="adm-section">
            {/* Header */}
            <div className="adm-header">
                <div>
                    <h2 className="adm-section-title">Booking Management</h2>
                    <p className="adm-section-sub">
                        {bookings.length} total bookings ·{" "}
                        {newBookingCount > 0
                            ? <span style={{ color:"#FFD166", fontWeight:700 }}>
                                ⚡ {newBookingCount} pending action{newBookingCount > 1 ? "s" : ""}
                              </span>
                            : "all clear"
                        }
                    </p>
                </div>
                <div className="adm-header-actions">
                    <button className="adm-btn adm-btn-ghost">
                        <Icon d={I.refresh} size={14} /> Refresh
                    </button>
                    <button className="adm-btn adm-btn-ghost">
                        ⬇ Export CSV
                    </button>
                </div>
            </div>

            {/* Status count tiles */}
            <div className="adm-grid-4" style={{ marginBottom:20 }}>
                {["All","Pending","Confirmed","Completed","Cancelled"].map(s => {
                    const sm = STATUS_MAP[s] || { bg:"rgba(134,150,160,.1)", c:"#8696A0", border:"rgba(134,150,160,.2)" };
                    const isActive = filter === s;
                    return (
                        <div key={s} onClick={() => setFilter(s)}
                            style={{ background: isActive ? sm.bg : "#1C2B33",
                                border:`1px solid ${isActive ? sm.border : "#2A3942"}`,
                                borderRadius:14, padding:"16px 20px",
                                cursor:"pointer", transition:"all .2s",
                                transform: isActive ? "translateY(-2px)" : "none",
                                boxShadow: isActive ? `0 6px 20px ${sm.c}20` : "none",
                            }}>
                            <div style={{ fontSize:11, color: isActive ? sm.c : "#8696A0",
                                textTransform:"uppercase", letterSpacing:".6px",
                                fontWeight:700, marginBottom:8 }}>{s}</div>
                            <div style={{ fontFamily:"'Syne',sans-serif", fontSize:28,
                                fontWeight:800, color: isActive ? sm.c : "#fff",
                                lineHeight:1 }}>{counts[s] ?? 0}</div>
                        </div>
                    );
                })}
            </div>

            {/* Search + sort bar */}
            <div style={{ display:"flex", gap:10, marginBottom:14, flexWrap:"wrap", alignItems:"center" }}>
                <div style={{ position:"relative", flex:1, minWidth:200, maxWidth:360 }}>
                    <div style={{ position:"absolute", left:12, top:"50%", transform:"translateY(-50%)" }}>
                        <Icon d={I.search} size={14} color="#8696A0" />
                    </div>
                    <input className="adm-search" style={{ paddingLeft:36 }}
                        value={search} onChange={e => setSearch(e.target.value)}
                        placeholder="Search customer, car, booking ID…" />
                </div>
                <select className="adm-select" style={{ width:"auto" }}
                    value={sortBy} onChange={e => setSortBy(e.target.value)}>
                    <option value="newest">Newest first</option>
                    <option value="oldest">Oldest first</option>
                    <option value="amount">Highest amount</option>
                </select>
                <span style={{ fontSize:12, color:"#8696A0" }}>
                    {displayed.length} result{displayed.length !== 1 ? "s" : ""}
                </span>
            </div>

            {/* New booking alert banner */}
            {newBookingCount > 0 && filter === "All" && (
                <div style={{ background:"rgba(255,209,102,.07)",
                    border:"1px solid rgba(255,209,102,.2)", borderRadius:12,
                    padding:"12px 16px", marginBottom:14,
                    display:"flex", alignItems:"center", gap:10 }}>
                    <Icon d={I.alert} size={16} color="#FFD166" />
                    <span style={{ fontSize:13, color:"#FFD166", fontWeight:700 }}>
                        {newBookingCount} new booking{newBookingCount > 1 ? "s" : ""} awaiting approval
                    </span>
                    <button className="adm-btn adm-btn-sm"
                        style={{ marginLeft:"auto", background:"rgba(255,209,102,.1)",
                            color:"#FFD166", border:"1px solid rgba(255,209,102,.25)" }}
                        onClick={() => setFilter("Pending")}>
                        Review Now →
                    </button>
                </div>
            )}

            {/* Bookings table */}
            <div className="adm-panel">
                <div className="adm-table-wrap">
                    <table className="adm-table">
                        <thead>
                            <tr>
                                <th>Booking ID</th>
                                <th>Customer</th>
                                <th>Vehicle</th>
                                <th>Dates</th>
                                <th>Amount</th>
                                <th>Payment</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {displayed.map(b => {
                                const sc = STATUS_MAP[b.status] || STATUS_MAP.Pending;
                                const ac = avatarColor(b.user);
                                const initials = b.user.split(" ").map(w => w[0]).join("").slice(0,2).toUpperCase();
                                return (
                                    <tr key={b.id}>
                                        <td>
                                            <span style={{ fontFamily:"monospace", fontSize:11,
                                                color:"#8696A0", background:"rgba(134,150,160,.08)",
                                                padding:"3px 7px", borderRadius:5 }}>
                                                {b.id}
                                            </span>
                                        </td>
                                        <td>
                                            <div style={{ display:"flex", alignItems:"center", gap:10 }}>
                                                <div className="adm-avatar"
                                                    style={{ background:ac, fontSize:12, width:30, height:30 }}>
                                                    {initials}
                                                </div>
                                                <div>
                                                    <div style={{ fontWeight:600, fontSize:13 }}>{b.user}</div>
                                                    <div style={{ fontSize:11, color:"#8696A0" }}>{b.email || "—"}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <div style={{ display:"flex", alignItems:"center", gap:8 }}>
                                                {b.image && (
                                                    <img src={b.image} alt={b.car}
                                                        style={{ width:44, height:30, objectFit:"cover",
                                                            borderRadius:6, border:"1px solid #2A3942" }}
                                                        onError={e => e.target.style.display = "none"} />
                                                )}
                                                <div>
                                                    <div style={{ fontSize:13, fontWeight:600 }}>{b.car}</div>
                                                    <div style={{ fontSize:11, color:"#8696A0",
                                                        textTransform:"capitalize" }}>{b.cat || "—"}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td style={{ whiteSpace:"nowrap" }}>
                                            <div style={{ fontSize:12, color:"#fff" }}>{b.start}</div>
                                            <div style={{ fontSize:11, color:"#8696A0" }}>→ {b.end}</div>
                                            <div style={{ fontSize:11, color:"#8696A0" }}>{b.days}d</div>
                                        </td>
                                        <td>
                                            <div style={{ fontWeight:700, color:"#25D366",
                                                fontFamily:"'Syne',sans-serif", fontSize:14 }}>
                                                {b.amount}
                                            </div>
                                        </td>
                                        <td>
                                            <span style={{ fontSize:12, color:"#8696A0" }}>
                                                {b.payment === "stripe" ? "💳" : "🅿"} {b.payment === "stripe" ? "Stripe" : "PayPal"}
                                            </span>
                                        </td>
                                        <td>
                                            <span className="adm-badge"
                                                style={{ background:sc.bg, color:sc.c, borderColor:sc.border }}>
                                                {b.status}
                                            </span>
                                        </td>
                                        <td>
                                            <div style={{ display:"flex", gap:6, alignItems:"center" }}>
                                                <button className="adm-btn adm-btn-ghost adm-btn-sm adm-btn-icon"
                                                    title="View Details" onClick={() => setDetail(b)}>
                                                    <Icon d={I.eye} size={13} color="#8696A0" />
                                                </button>
                                                {b.status === "Pending" && (
                                                    <>
                                                        <button className="adm-btn adm-btn-primary adm-btn-sm"
                                                            onClick={() => approve(b.id)}>
                                                            <Icon d={I.check} size={12} /> Approve
                                                        </button>
                                                        <button className="adm-btn adm-btn-danger adm-btn-sm"
                                                            onClick={() => reject(b.id)}>
                                                            <Icon d={I.x} size={12} />
                                                        </button>
                                                    </>
                                                )}
                                                {b.status === "Confirmed" && (
                                                    <button className="adm-btn adm-btn-sm"
                                                        style={{ background:"rgba(17,138,178,.1)",
                                                            color:"#118AB2", border:"1px solid rgba(17,138,178,.25)" }}
                                                        onClick={() => complete(b.id)}>
                                                        ✓ Done
                                                    </button>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })}
                            {displayed.length === 0 && (
                                <tr>
                                    <td colSpan={8} style={{ textAlign:"center", padding:"60px 0",
                                        color:"#8696A0" }}>
                                        <div style={{ fontSize:32, marginBottom:8 }}>📭</div>
                                        No bookings match your search.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Detail Modal */}
            {detail && <DetailModal b={detail} />}
        </div>
    );
};
