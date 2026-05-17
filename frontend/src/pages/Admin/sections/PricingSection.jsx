import { useState } from "react";
import { Colors } from "../../../constants/designTokens";
import { PRICING_RATES } from "../../../constants/carData";

const PROMO_CODES = [
    { code:"VELOCE10", discount:"10%", uses:142, expires:"Jun 30, 2026", active:true  },
    { code:"SUMMER25", discount:"25%", uses:38,  expires:"Aug 31, 2026", active:true  },
    { code:"FIRSTRIDE",discount:"15%", uses:307, expires:"May 31, 2026", active:false },
];

const CAT_META = {
    economy: { icon:"🚗", color:"#118AB2", desc:"Budget-friendly everyday cars" },
    sedan:   { icon:"🚙", color:"#25D366", desc:"Comfortable mid-range sedans" },
    suv:     { icon:"🚙", color:"#FFD166", desc:"Spacious family & adventure SUVs" },
    luxury:  { icon:"🏎️", color:"#EF476F", desc:"Premium & exotic vehicles" },
};

export const PricingSection = () => {
    const [rates, setRates] = useState({ ...PRICING_RATES });
    const [editing, setEditing] = useState(null);
    const [draft, setDraft] = useState("");
    const [promos, setPromos] = useState(PROMO_CODES);
    const [promoModal, setPromoModal] = useState(false);
    const [newPromo, setNewPromo] = useState({ code:"", discount:"", expires:"" });

    function startEdit(cat) { setEditing(cat); setDraft(String(rates[cat])); }
    function saveEdit(cat) {
        const val = Number(draft);
        if (val > 0) setRates(r => ({ ...r, [cat]: val }));
        setEditing(null);
    }
    function togglePromo(code) {
        setPromos(p => p.map(x => x.code === code ? { ...x, active: !x.active } : x));
    }
    function addPromo() {
        if (!newPromo.code || !newPromo.discount) return;
        setPromos(p => [...p, { ...newPromo, uses:0, active:true }]);
        setNewPromo({ code:"", discount:"", expires:"" });
        setPromoModal(false);
    }

    return (
        <div className="adm-section">
            <div className="adm-header">
                <div>
                    <h2 className="adm-section-title">Pricing Management</h2>
                    <p className="adm-section-sub">Set daily rental rates per category and manage promotional codes</p>
                </div>
                <div className="adm-header-actions">
                    <button className="adm-btn adm-btn-ghost">⬇ Rate History</button>
                    <button className="adm-btn adm-btn-primary" onClick={() => setPromoModal(true)}>+ Add Promo</button>
                </div>
            </div>

            {/* Rate Cards */}
            <div className="adm-grid-2" style={{ marginBottom:24 }}>
                {Object.entries(rates).map(([cat, rate]) => {
                    const meta = CAT_META[cat];
                    const isEditing = editing === cat;
                    return (
                        <div className="adm-price-card" key={cat}>
                            {/* Header */}
                            <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:16 }}>
                                <div style={{ display:"flex", alignItems:"center", gap:10 }}>
                                    <div style={{
                                        width:42, height:42, borderRadius:12,
                                        background:`${meta.color}18`,
                                        border:`1px solid ${meta.color}30`,
                                        display:"flex", alignItems:"center", justifyContent:"center",
                                        fontSize:20,
                                    }}>
                                        {meta.icon}
                                    </div>
                                    <div>
                                        <div style={{ fontWeight:700, color:"#fff", fontSize:14, textTransform:"capitalize" }}>{cat}</div>
                                        <div style={{ fontSize:11, color:Colors.muted }}>{meta.desc}</div>
                                    </div>
                                </div>
                                <button className="adm-btn adm-btn-ghost adm-btn-sm" onClick={() => isEditing ? saveEdit(cat) : startEdit(cat)}>
                                    {isEditing ? "✓ Save" : "✏ Edit"}
                                </button>
                            </div>

                            {/* Rate display / edit */}
                            <div style={{ display:"flex", alignItems:"center", gap:12 }}>
                                <div style={{ fontSize:11, color:Colors.muted, textTransform:"uppercase", letterSpacing:".6px" }}>Rate / Day</div>
                                {isEditing ? (
                                    <div style={{ display:"flex", gap:8, alignItems:"center" }}>
                                        <span style={{ color:Colors.muted, fontSize:18, fontWeight:700 }}>$</span>
                                        <input
                                            className="adm-input"
                                            type="number"
                                            value={draft}
                                            onChange={e => setDraft(e.target.value)}
                                            style={{ width:80, padding:"6px 10px", fontSize:16, fontWeight:700 }}
                                            autoFocus
                                        />
                                        <button className="adm-btn adm-btn-ghost adm-btn-sm" onClick={() => setEditing(null)}>✕</button>
                                    </div>
                                ) : (
                                    <div style={{ fontFamily:"'Syne',sans-serif", fontSize:32, fontWeight:800, color:meta.color }}>
                                        ${rate}
                                    </div>
                                )}
                            </div>

                            {/* Progress vs max */}
                            <div style={{ marginTop:14 }}>
                                <div className="adm-bar-track">
                                    <div className="adm-bar-fill" style={{
                                        width:`${(rate / 650) * 100}%`,
                                        background:`linear-gradient(90deg,${meta.color},${meta.color}88)`,
                                    }} />
                                </div>
                                <div style={{ fontSize:11, color:Colors.muted, marginTop:5 }}>
                                    {Math.round((rate / 650) * 100)}% of max fleet rate ($650/day)
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Promo Codes */}
            <div className="adm-panel" style={{ marginBottom:0 }}>
                <div className="adm-panel-head">
                    <span className="adm-panel-title">🎟 Promotional Codes</span>
                    <span style={{ fontSize:12, color:Colors.muted }}>{promos.filter(p=>p.active).length} active codes</span>
                </div>
                <div className="adm-table-wrap">
                    <table className="adm-table">
                        <thead>
                            <tr>
                                {["Code","Discount","Total Uses","Expires","Status","Actions"].map(h => <th key={h}>{h}</th>)}
                            </tr>
                        </thead>
                        <tbody>
                            {promos.map(p => (
                                <tr key={p.code}>
                                    <td>
                                        <span style={{
                                            fontFamily:"monospace", fontSize:13, fontWeight:700,
                                            background:"rgba(37,211,102,.1)", color:Colors.green,
                                            padding:"3px 10px", borderRadius:6, letterSpacing:1,
                                        }}>
                                            {p.code}
                                        </span>
                                    </td>
                                    <td style={{ fontWeight:700, color:Colors.warn }}>{p.discount}</td>
                                    <td style={{ color:Colors.muted }}>{p.uses.toLocaleString()} times</td>
                                    <td style={{ color:Colors.muted, fontSize:12 }}>{p.expires}</td>
                                    <td>
                                        <span className="adm-badge" style={
                                            p.active
                                                ? { background:"rgba(37,211,102,.12)", color:Colors.green, borderColor:"rgba(37,211,102,.25)" }
                                                : { background:"rgba(134,150,160,.1)", color:Colors.muted, borderColor:"transparent" }
                                        }>
                                            {p.active ? "Active" : "Inactive"}
                                        </span>
                                    </td>
                                    <td>
                                        <label className="adm-toggle">
                                            <input type="checkbox" checked={p.active} onChange={() => togglePromo(p.code)} />
                                            <span className="adm-toggle-slider" />
                                        </label>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Add Promo Modal */}
            {promoModal && (
                <div className="adm-modal-overlay" onClick={e => { if(e.target === e.currentTarget) setPromoModal(false); }}>
                    <div className="adm-modal">
                        <div className="adm-modal-head">
                            <span className="adm-modal-title">New Promotional Code</span>
                            <button className="adm-modal-close" onClick={() => setPromoModal(false)}>✕</button>
                        </div>
                        <div className="adm-modal-body">
                            <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
                                <div className="adm-field">
                                    <label className="adm-label">Promo Code</label>
                                    <input className="adm-input" placeholder="e.g. SUMMER20" value={newPromo.code}
                                        onChange={e => setNewPromo(p=>({...p,code:e.target.value.toUpperCase()}))} />
                                </div>
                                <div className="adm-field">
                                    <label className="adm-label">Discount</label>
                                    <input className="adm-input" placeholder="e.g. 20%" value={newPromo.discount}
                                        onChange={e => setNewPromo(p=>({...p,discount:e.target.value}))} />
                                </div>
                                <div className="adm-field">
                                    <label className="adm-label">Expiry Date</label>
                                    <input className="adm-input" type="date" value={newPromo.expires}
                                        onChange={e => setNewPromo(p=>({...p,expires:e.target.value}))} />
                                </div>
                            </div>
                        </div>
                        <div className="adm-modal-footer">
                            <button className="adm-btn adm-btn-ghost" onClick={() => setPromoModal(false)}>Cancel</button>
                            <button className="adm-btn adm-btn-primary" onClick={addPromo}>Create Code</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
