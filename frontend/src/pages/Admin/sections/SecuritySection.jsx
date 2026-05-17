import { useState } from "react";
import { Colors } from "../../../constants/designTokens";

const ACTIVITY_LOG = [
    { id:1, event:"Admin login",          ip:"192.168.1.1",  time:"Today, 16:04",     type:"success", icon:"🔓" },
    { id:2, event:"Vehicle #4 disabled",  ip:"192.168.1.1",  time:"Today, 15:51",     type:"warn",    icon:"⚠️" },
    { id:3, event:"Booking BK-0044 cancelled",ip:"192.168.1.1",time:"Today, 15:30",   type:"danger",  icon:"❌" },
    { id:4, event:"Promo code FIRSTRIDE disabled",ip:"192.168.1.1",time:"Today, 14:12",type:"warn",  icon:"🎟" },
    { id:5, event:"Admin login",          ip:"10.0.0.42",    time:"Yesterday, 09:18", type:"success", icon:"🔓" },
    { id:6, event:"Failed login attempt", ip:"203.0.113.45", time:"Yesterday, 02:34", type:"danger",  icon:"🚨" },
    { id:7, event:"Fleet export CSV",     ip:"192.168.1.1",  time:"May 16, 18:22",    type:"info",    icon:"📋" },
    { id:8, event:"New user suspended",   ip:"192.168.1.1",  time:"May 15, 11:05",    type:"warn",    icon:"🚫" },
];

const SESSIONS = [
    { device:"Chrome · Windows 11",    ip:"192.168.1.1",   location:"Islamabad, PK",  last:"Active now",      current:true  },
    { device:"Safari · iPhone 15 Pro", ip:"202.11.44.89",  location:"Lahore, PK",     last:"2 hours ago",     current:false },
    { device:"Firefox · MacOS",        ip:"198.51.100.22", location:"Karachi, PK",    last:"3 days ago",      current:false },
];

const typeColors = {
    success: "#25D366",
    warn:    "#FFD166",
    danger:  "#EF476F",
    info:    "#118AB2",
};

export const SecuritySection = () => {
    const [sessions, setSessions] = useState(SESSIONS);
    const [twoFA, setTwoFA] = useState(true);
    const [alertMail, setAlertMail] = useState(true);
    const [failLock, setFailLock] = useState(true);
    const [log, setLog] = useState(ACTIVITY_LOG);

    function revokeSession(idx) {
        setSessions(s => s.filter((_,i) => i !== idx));
    }

    return (
        <div className="adm-section">
            <div className="adm-header">
                <div>
                    <h2 className="adm-section-title">Security Center</h2>
                    <p className="adm-section-sub">Monitor access, sessions, and configure security policies</p>
                </div>
                <div className="adm-header-actions">
                    <button className="adm-btn adm-btn-danger">🚨 Revoke All Sessions</button>
                </div>
            </div>

            {/* Security overview */}
            <div className="adm-grid-3" style={{ marginBottom:20 }}>
                {[
                    { label:"Security Score", val:"92/100", sub:"Strong protection enabled", c:Colors.green },
                    { label:"Failed Logins",  val:"1",      sub:"Past 7 days",               c:Colors.warn  },
                    { label:"Active Sessions",val:sessions.length, sub:"Across all devices", c:Colors.info  },
                ].map(s => (
                    <div className="adm-panel" style={{ marginBottom:0 }} key={s.label}>
                        <div className="adm-panel-body">
                            <div style={{ fontSize:11, color:Colors.muted, textTransform:"uppercase", letterSpacing:".6px", marginBottom:8 }}>{s.label}</div>
                            <div style={{ fontFamily:"'Syne',sans-serif", fontSize:28, fontWeight:800, color:s.c, marginBottom:4 }}>{s.val}</div>
                            <div style={{ fontSize:12, color:Colors.muted }}>{s.sub}</div>
                        </div>
                    </div>
                ))}
            </div>

            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:16, marginBottom:16 }}>
                {/* Security Settings */}
                <div className="adm-panel" style={{ marginBottom:0 }}>
                    <div className="adm-panel-head">
                        <span className="adm-panel-title">🔐 Security Policies</span>
                    </div>
                    <div className="adm-panel-body">
                        {[
                            { label:"Two-Factor Authentication", desc:"Require OTP on every admin login", val:twoFA, set:setTwoFA },
                            { label:"Login Alert Emails",        desc:"Email on new device login",        val:alertMail, set:setAlertMail },
                            { label:"Fail-Lock (5 attempts)",    desc:"Auto-lock after failed logins",    val:failLock, set:setFailLock },
                        ].map(row => (
                            <div className="adm-setting-row" key={row.label}>
                                <div className="adm-setting-info">
                                    <div className="adm-setting-title">{row.label}</div>
                                    <div className="adm-setting-desc">{row.desc}</div>
                                </div>
                                <label className="adm-toggle">
                                    <input type="checkbox" checked={row.val} onChange={e => row.set(e.target.checked)} />
                                    <span className="adm-toggle-slider" />
                                </label>
                            </div>
                        ))}

                        {/* Change password */}
                        <div style={{ marginTop:20, padding:"16px", background:"rgba(17,27,33,.6)", borderRadius:12, border:"1px solid #2A3942" }}>
                            <div style={{ fontSize:13, fontWeight:700, color:"#fff", marginBottom:12 }}>Change Admin Password</div>
                            <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
                                <input className="adm-input" type="password" placeholder="Current password" />
                                <input className="adm-input" type="password" placeholder="New password" />
                                <input className="adm-input" type="password" placeholder="Confirm new password" />
                                <button className="adm-btn adm-btn-primary" style={{ alignSelf:"flex-start" }}>Update Password</button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Active Sessions */}
                <div className="adm-panel" style={{ marginBottom:0 }}>
                    <div className="adm-panel-head">
                        <span className="adm-panel-title">📱 Active Sessions</span>
                        <span style={{ fontSize:12, color:Colors.muted }}>{sessions.length} device{sessions.length !== 1 ? "s" : ""}</span>
                    </div>
                    <div className="adm-panel-body" style={{ display:"flex", flexDirection:"column", gap:12 }}>
                        {sessions.map((s,i) => (
                            <div key={i} style={{
                                padding:"14px 16px", borderRadius:12,
                                background: s.current ? "rgba(37,211,102,.06)" : "rgba(17,27,33,.6)",
                                border: `1px solid ${s.current ? "rgba(37,211,102,.2)" : "#2A3942"}`,
                            }}>
                                <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start" }}>
                                    <div>
                                        <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:4 }}>
                                            <span style={{ fontSize:16 }}>{s.device.includes("iPhone") ? "📱" : s.device.includes("Safari") && s.device.includes("Mac") ? "🖥" : "💻"}</span>
                                            <span style={{ fontSize:13, fontWeight:600, color:"#fff" }}>{s.device}</span>
                                            {s.current && <span className="adm-badge" style={{ background:"rgba(37,211,102,.12)", color:Colors.green, borderColor:"rgba(37,211,102,.25)", fontSize:10 }}>Current</span>}
                                        </div>
                                        <div style={{ fontSize:11, color:Colors.muted }}>
                                            📍 {s.location} · {s.ip}
                                        </div>
                                        <div style={{ fontSize:11, color:Colors.muted, marginTop:2 }}>🕐 {s.last}</div>
                                    </div>
                                    {!s.current && (
                                        <button className="adm-btn adm-btn-danger adm-btn-sm" onClick={() => revokeSession(i)}>
                                            Revoke
                                        </button>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Activity Log */}
            <div className="adm-panel" style={{ marginBottom:0 }}>
                <div className="adm-panel-head">
                    <span className="adm-panel-title">📋 Activity Log</span>
                    <button className="adm-btn adm-btn-ghost adm-btn-sm">⬇ Export Log</button>
                </div>
                <div className="adm-panel-body">
                    {log.map(item => (
                        <div className="adm-activity-item" key={item.id}>
                            <div style={{
                                width:32, height:32, borderRadius:9, flexShrink:0,
                                background:`${typeColors[item.type]}15`,
                                border:`1px solid ${typeColors[item.type]}25`,
                                display:"flex", alignItems:"center", justifyContent:"center",
                                fontSize:15,
                            }}>
                                {item.icon}
                            </div>
                            <div style={{ flex:1 }}>
                                <div style={{ fontSize:13, fontWeight:600, color:"#fff", marginBottom:2 }}>{item.event}</div>
                                <div style={{ fontSize:11, color:Colors.muted }}>IP: {item.ip}</div>
                            </div>
                            <div style={{ fontSize:11, color:Colors.muted, whiteSpace:"nowrap" }}>{item.time}</div>
                            <div style={{ width:8, height:8, borderRadius:"50%", background:typeColors[item.type], flexShrink:0 }} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
