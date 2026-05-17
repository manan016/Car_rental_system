import { useState } from "react";
import { Colors } from "../../../constants/designTokens";

export const SettingsSection = () => {
    const [company, setCompany] = useState({
        name:"VELOCE Car Rentals", email:"support@veloce.com",
        phone:"+92-300-1234567", address:"Blue Area, Islamabad, Pakistan",
        currency:"USD", timezone:"Asia/Karachi",
    });
    const [notifs, setNotifs] = useState({
        newBooking:true, cancelBooking:true, newUser:false,
        dailyReport:true, weeklyReport:false, lowFleet:true,
    });
    const [prefs, setPrefs] = useState({
        maintenanceMode:false, autoApprove:false, requireLogin:true, guestBooking:false,
    });
    const [saved, setSaved] = useState(false);

    function handleSave() {
        setSaved(true);
        setTimeout(() => setSaved(false), 2500);
    }

    return (
        <div className="adm-section">
            <div className="adm-header">
                <div>
                    <h2 className="adm-section-title">System Settings</h2>
                    <p className="adm-section-sub">Configure your platform, notifications, and business preferences</p>
                </div>
                <div className="adm-header-actions">
                    <button className="adm-btn adm-btn-ghost">Reset Defaults</button>
                    <button className="adm-btn adm-btn-primary" onClick={handleSave}>
                        {saved ? "✓ Saved!" : "💾 Save Changes"}
                    </button>
                </div>
            </div>

            <div style={{ display:"flex", flexDirection:"column", gap:16 }}>
                {/* Company Info */}
                <div className="adm-panel" style={{ marginBottom:0 }}>
                    <div className="adm-panel-head">
                        <span className="adm-panel-title">🏢 Company Information</span>
                    </div>
                    <div className="adm-panel-body">
                        <div className="adm-form-grid">
                            <div className="adm-field">
                                <label className="adm-label">Company Name</label>
                                <input className="adm-input" value={company.name}
                                    onChange={e => setCompany(c=>({...c,name:e.target.value}))} />
                            </div>
                            <div className="adm-field">
                                <label className="adm-label">Support Email</label>
                                <input className="adm-input" type="email" value={company.email}
                                    onChange={e => setCompany(c=>({...c,email:e.target.value}))} />
                            </div>
                            <div className="adm-field">
                                <label className="adm-label">Phone Number</label>
                                <input className="adm-input" value={company.phone}
                                    onChange={e => setCompany(c=>({...c,phone:e.target.value}))} />
                            </div>
                            <div className="adm-field">
                                <label className="adm-label">Currency</label>
                                <select className="adm-select" value={company.currency}
                                    onChange={e => setCompany(c=>({...c,currency:e.target.value}))}>
                                    {["USD","EUR","GBP","PKR","AED"].map(x => <option key={x} value={x}>{x}</option>)}
                                </select>
                            </div>
                            <div className="adm-field">
                                <label className="adm-label">Timezone</label>
                                <select className="adm-select" value={company.timezone}
                                    onChange={e => setCompany(c=>({...c,timezone:e.target.value}))}>
                                    {["Asia/Karachi","Asia/Dubai","Asia/Kolkata","Europe/London","America/New_York"].map(x => (
                                        <option key={x} value={x}>{x}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="adm-field adm-field-full">
                                <label className="adm-label">Business Address</label>
                                <input className="adm-input" value={company.address}
                                    onChange={e => setCompany(c=>({...c,address:e.target.value}))} />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Notification Preferences */}
                <div className="adm-panel" style={{ marginBottom:0 }}>
                    <div className="adm-panel-head">
                        <span className="adm-panel-title">🔔 Notification Preferences</span>
                        <span style={{ fontSize:12, color:Colors.muted }}>Email alerts for admin events</span>
                    </div>
                    <div className="adm-panel-body">
                        {[
                            { key:"newBooking",    label:"New Booking Created",     desc:"Alert when a customer completes a booking" },
                            { key:"cancelBooking", label:"Booking Cancelled",       desc:"Alert when a booking is cancelled or rejected" },
                            { key:"newUser",       label:"New User Registration",   desc:"Alert when a new account is created" },
                            { key:"dailyReport",   label:"Daily Summary Report",    desc:"Receive a daily business summary at 8am" },
                            { key:"weeklyReport",  label:"Weekly Analytics Report", desc:"Receive weekly KPI digest every Monday" },
                            { key:"lowFleet",      label:"Low Fleet Alert",         desc:"Alert when available cars drop below 20%" },
                        ].map(row => (
                            <div className="adm-setting-row" key={row.key}>
                                <div className="adm-setting-info">
                                    <div className="adm-setting-title">{row.label}</div>
                                    <div className="adm-setting-desc">{row.desc}</div>
                                </div>
                                <label className="adm-toggle">
                                    <input type="checkbox" checked={notifs[row.key]}
                                        onChange={e => setNotifs(n=>({...n,[row.key]:e.target.checked}))} />
                                    <span className="adm-toggle-slider" />
                                </label>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Platform Preferences */}
                <div className="adm-panel" style={{ marginBottom:0 }}>
                    <div className="adm-panel-head">
                        <span className="adm-panel-title">⚙️ Platform Preferences</span>
                    </div>
                    <div className="adm-panel-body">
                        {[
                            { key:"maintenanceMode", label:"Maintenance Mode",         desc:"Take the site offline for all non-admin users", danger:true },
                            { key:"autoApprove",     label:"Auto-Approve Bookings",     desc:"Skip manual approval for all new bookings" },
                            { key:"requireLogin",    label:"Require Login to Book",     desc:"Users must be signed in to make a reservation", danger:false },
                            { key:"guestBooking",    label:"Allow Guest Checkout",      desc:"Let unregistered users browse and book" },
                        ].map(row => (
                            <div className="adm-setting-row" key={row.key}>
                                <div className="adm-setting-info">
                                    <div className="adm-setting-title" style={ row.danger && prefs[row.key] ? { color:Colors.danger } : {} }>
                                        {row.danger && prefs[row.key] ? "⚠ " : ""}{row.label}
                                    </div>
                                    <div className="adm-setting-desc">{row.desc}</div>
                                </div>
                                <label className="adm-toggle">
                                    <input type="checkbox" checked={prefs[row.key]}
                                        onChange={e => setPrefs(p=>({...p,[row.key]:e.target.checked}))} />
                                    <span className="adm-toggle-slider" style={
                                        row.danger && prefs[row.key]
                                            ? { background:Colors.danger }
                                            : {}
                                    } />
                                </label>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Danger Zone */}
                <div className="adm-panel" style={{ marginBottom:0, border:"1px solid rgba(239,71,111,.2)" }}>
                    <div className="adm-panel-head" style={{ borderBottomColor:"rgba(239,71,111,.15)" }}>
                        <span className="adm-panel-title" style={{ color:Colors.danger }}>⚠ Danger Zone</span>
                        <span style={{ fontSize:12, color:Colors.muted }}>Irreversible actions</span>
                    </div>
                    <div className="adm-panel-body" style={{ display:"flex", flexDirection:"column", gap:12 }}>
                        {[
                            { label:"Clear All Booking Records",  desc:"Permanently delete all booking history from the system" },
                            { label:"Reset All User Accounts",    desc:"Remove all non-admin user accounts and their data" },
                            { label:"Factory Reset Platform",     desc:"Restore all settings to defaults and wipe all data" },
                        ].map(action => (
                            <div key={action.label} style={{
                                display:"flex", justifyContent:"space-between", alignItems:"center",
                                padding:"14px 16px", borderRadius:10,
                                background:"rgba(239,71,111,.05)", border:"1px solid rgba(239,71,111,.15)",
                                gap:16, flexWrap:"wrap",
                            }}>
                                <div>
                                    <div style={{ fontSize:13, fontWeight:600, color:"#fff", marginBottom:3 }}>{action.label}</div>
                                    <div style={{ fontSize:12, color:Colors.muted }}>{action.desc}</div>
                                </div>
                                <button className="adm-btn adm-btn-danger adm-btn-sm">{action.label.split(" ").slice(0,2).join(" ")}</button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};
