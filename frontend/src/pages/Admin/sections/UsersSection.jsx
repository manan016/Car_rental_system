import { useState } from "react";
import { Colors } from "../../../constants/designTokens";

const USERS_DATA = [
    { id:"USR-001", name:"Ahmed Khan",      email:"ahmed@test.com",     role:"user",  joined:"May 1, 2026",  bookings:3, status:"active"   },
    { id:"USR-002", name:"Sara Malik",      email:"sara@example.com",   role:"user",  joined:"Apr 22, 2026", bookings:7, status:"active"   },
    { id:"USR-003", name:"Omar Farooq",     email:"omar@mail.com",      role:"user",  joined:"Apr 15, 2026", bookings:2, status:"active"   },
    { id:"USR-004", name:"Zainab Noor",     email:"zainab@live.com",    role:"user",  joined:"Apr 10, 2026", bookings:5, status:"suspended"},
    { id:"USR-005", name:"Ali Hassan",      email:"ali@test.com",       role:"user",  joined:"Mar 28, 2026", bookings:9, status:"active"   },
    { id:"USR-006", name:"Hamza Sheikh",    email:"hamza@mail.com",     role:"user",  joined:"Mar 20, 2026", bookings:4, status:"active"   },
    { id:"USR-007", name:"Nadia Ahmed",     email:"nadia@example.com",  role:"user",  joined:"Mar 5, 2026",  bookings:1, status:"inactive" },
    { id:"USR-008", name:"Bilal Chaudhry", email:"bilal@test.com",     role:"user",  joined:"Feb 18, 2026", bookings:6, status:"active"   },
    { id:"USR-009", name:"Super Admin",     email:"admin@veloce.com",   role:"admin", joined:"Jan 1, 2026",  bookings:0, status:"active"   },
];

const statusStyle = {
    active:    { bg:"rgba(37,211,102,.12)",  c:"#25D366" },
    suspended: { bg:"rgba(239,71,111,.12)",  c:"#EF476F" },
    inactive:  { bg:"rgba(134,150,160,.12)", c:"#8696A0" },
};

export const UsersSection = () => {
    const [users, setUsers] = useState(USERS_DATA);
    const [search, setSearch] = useState("");
    const [filter, setFilter] = useState("all");
    const [selected, setSelected] = useState(null);

    const filters = ["all","active","suspended","inactive"];
    const filtered = users.filter(u => {
        const matchF = filter === "all" || u.status === filter;
        const matchS = !search || u.name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase());
        return matchF && matchS;
    });

    function toggleStatus(id) {
        setUsers(u => u.map(x => x.id === id
            ? { ...x, status: x.status === "active" ? "suspended" : "active" }
            : x
        ));
    }

    const stats = {
        total:     users.length,
        active:    users.filter(u => u.status === "active").length,
        suspended: users.filter(u => u.status === "suspended").length,
        admins:    users.filter(u => u.role === "admin").length,
    };

    const GRAD = [
        "linear-gradient(135deg,#25D366,#128C7E)",
        "linear-gradient(135deg,#118AB2,#075E54)",
        "linear-gradient(135deg,#FFD166,#F4A261)",
        "linear-gradient(135deg,#EF476F,#B5179E)",
        "linear-gradient(135deg,#7B2FBE,#4361EE)",
    ];

    return (
        <div className="adm-section">
            <div className="adm-header">
                <div>
                    <h2 className="adm-section-title">User Management</h2>
                    <p className="adm-section-sub">{stats.total} registered accounts · {stats.active} active</p>
                </div>
                <div className="adm-header-actions">
                    <button className="adm-btn adm-btn-ghost">⬇ Export</button>
                    <button className="adm-btn adm-btn-primary">+ Invite User</button>
                </div>
            </div>

            {/* Stats */}
            <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:12, marginBottom:20 }}>
                {[
                    { label:"Total Users",     val:stats.total,     c:"#fff"    },
                    { label:"Active",          val:stats.active,    c:"#25D366" },
                    { label:"Suspended",       val:stats.suspended, c:"#EF476F" },
                    { label:"Admin Accounts",  val:stats.admins,    c:"#FFD166" },
                ].map(s => (
                    <div className="adm-panel" style={{ marginBottom:0 }} key={s.label}>
                        <div className="adm-panel-body" style={{ padding:"14px 16px" }}>
                            <div style={{ fontSize:11, color:Colors.muted, textTransform:"uppercase", letterSpacing:".6px", marginBottom:6 }}>{s.label}</div>
                            <div style={{ fontFamily:"'Syne',sans-serif", fontSize:26, fontWeight:800, color:s.c }}>{s.val}</div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Bar */}
            <div className="adm-bar">
                <div className="adm-search-wrap">
                    <span className="adm-search-icon">🔍</span>
                    <input className="adm-search" placeholder="Search by name or email..." value={search} onChange={e => setSearch(e.target.value)} />
                </div>
                <div className="adm-pills">
                    {filters.map(f => (
                        <button key={f} className={`adm-pill ${filter === f ? "active" : ""}`} onClick={() => setFilter(f)}>
                            {f.charAt(0).toUpperCase() + f.slice(1)}
                        </button>
                    ))}
                </div>
            </div>

            {/* Table */}
            <div className="adm-panel" style={{ marginBottom:0 }}>
                <div className="adm-table-wrap">
                    <table className="adm-table">
                        <thead>
                            <tr>
                                {["User","Email","Role","Joined","Bookings","Status","Actions"].map(h => <th key={h}>{h}</th>)}
                            </tr>
                        </thead>
                        <tbody>
                            {filtered.map((u, i) => {
                                const ss = statusStyle[u.status];
                                const grad = GRAD[i % GRAD.length];
                                return (
                                    <tr key={u.id}>
                                        <td>
                                            <div style={{ display:"flex", alignItems:"center", gap:10 }}>
                                                <div className="adm-avatar" style={{ background:grad }}>
                                                    {u.name.charAt(0)}
                                                </div>
                                                <div>
                                                    <div style={{ fontWeight:600, color:"#fff" }}>{u.name}</div>
                                                    <div style={{ fontSize:10, color:Colors.muted, fontFamily:"monospace" }}>{u.id}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td style={{ color:Colors.muted }}>{u.email}</td>
                                        <td>
                                            <span className="adm-badge" style={
                                                u.role === "admin"
                                                    ? { background:"rgba(255,209,102,.12)", color:"#FFD166", borderColor:"rgba(255,209,102,.25)" }
                                                    : { background:"rgba(134,150,160,.1)", color:Colors.muted, borderColor:"transparent" }
                                            }>
                                                {u.role === "admin" ? "🛡 Admin" : "👤 User"}
                                            </span>
                                        </td>
                                        <td style={{ color:Colors.muted, fontSize:12 }}>{u.joined}</td>
                                        <td>
                                            <span style={{ fontWeight:700, color:u.bookings > 5 ? Colors.green : "#fff" }}>{u.bookings}</span>
                                        </td>
                                        <td>
                                            <span className="adm-badge" style={{ background:ss.bg, color:ss.c, borderColor:`${ss.c}30` }}>
                                                {u.status.charAt(0).toUpperCase() + u.status.slice(1)}
                                            </span>
                                        </td>
                                        <td>
                                            {u.role !== "admin" && (
                                                <div style={{ display:"flex", gap:6 }}>
                                                    <button
                                                        className={`adm-btn adm-btn-sm ${u.status === "active" ? "adm-btn-danger" : "adm-btn-ghost"}`}
                                                        onClick={() => toggleStatus(u.id)}
                                                    >
                                                        {u.status === "active" ? "Suspend" : "Restore"}
                                                    </button>
                                                </div>
                                            )}
                                            {u.role === "admin" && <span style={{ color:Colors.muted, fontSize:12 }}>Protected</span>}
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};
