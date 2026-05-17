import { useState } from "react";
import { Colors } from "../../../constants/designTokens";
import { CARS } from "../../../constants/carData";

const CAT_COLORS = {
    economy: { bg:"rgba(17,138,178,.12)", c:"#118AB2" },
    sedan:   { bg:"rgba(37,211,102,.12)", c:"#25D366" },
    suv:     { bg:"rgba(255,209,102,.12)",c:"#FFD166" },
    luxury:  { bg:"rgba(239,71,111,.12)", c:"#EF476F" },
};

const EMPTY_FORM = { brand:"", name:"", cat:"economy", engine:"", seats:5, trans:"Auto", price:"", avail:true };

export const FleetSection = () => {
    const [cars, setCars] = useState(CARS);
    const [filter, setFilter] = useState("all");
    const [search, setSearch] = useState("");
    const [modal, setModal] = useState(false);
    const [form, setForm] = useState(EMPTY_FORM);
    const [editId, setEditId] = useState(null);

    const cats = ["all","economy","sedan","suv","luxury"];

    const filtered = cars.filter(c => {
        const matchCat  = filter === "all" || c.cat === filter;
        const matchSearch = !search || `${c.brand} ${c.name}`.toLowerCase().includes(search.toLowerCase());
        return matchCat && matchSearch;
    });

    function openAdd() { setForm(EMPTY_FORM); setEditId(null); setModal(true); }
    function openEdit(car) {
        setForm({ brand:car.brand, name:car.name, cat:car.cat, engine:car.engine,
            seats:car.seats, trans:car.trans, price:car.price, avail:car.avail });
        setEditId(car.id); setModal(true);
    }
    function deleteCar(id) { setCars(c => c.filter(x => x.id !== id)); }
    function toggleAvail(id) { setCars(c => c.map(x => x.id === id ? { ...x, avail: !x.avail } : x)); }

    function handleSave() {
        if (!form.brand || !form.name || !form.price) return;
        if (editId) {
            setCars(c => c.map(x => x.id === editId ? { ...x, ...form, price: Number(form.price) } : x));
        } else {
            setCars(c => [...c, { ...form, id: Date.now(), icon: form.cat === "luxury" ? "🏎️" : form.cat === "suv" ? "🚙" : "🚗", price: Number(form.price) }]);
        }
        setModal(false);
    }

    const totalCars = cars.length;
    const availCars = cars.filter(c => c.avail).length;

    return (
        <div className="adm-section">
            <div className="adm-header">
                <div>
                    <h2 className="adm-section-title">Fleet Management</h2>
                    <p className="adm-section-sub">{availCars} available · {totalCars - availCars} unavailable · {totalCars} total vehicles</p>
                </div>
                <div className="adm-header-actions">
                    <button className="adm-btn adm-btn-ghost">⬇ Export</button>
                    <button className="adm-btn adm-btn-primary" onClick={openAdd}>+ Add Vehicle</button>
                </div>
            </div>

            {/* Bar */}
            <div className="adm-bar">
                <div className="adm-search-wrap">
                    <span className="adm-search-icon">🔍</span>
                    <input className="adm-search" placeholder="Search by brand or model..." value={search} onChange={e => setSearch(e.target.value)} />
                </div>
                <div className="adm-pills">
                    {cats.map(c => (
                        <button key={c} className={`adm-pill ${filter === c ? "active" : ""}`} onClick={() => setFilter(c)}>
                            {c.charAt(0).toUpperCase() + c.slice(1)}
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
                                {["Vehicle","Category","Engine","Seats","Transmission","Rate/Day","Status","Actions"].map(h => <th key={h}>{h}</th>)}
                            </tr>
                        </thead>
                        <tbody>
                            {filtered.map(car => {
                                const cc = CAT_COLORS[car.cat];
                                return (
                                    <tr key={car.id}>
                                        <td>
                                            <div style={{ display:"flex", alignItems:"center", gap:10 }}>
                                                <span style={{ fontSize:22 }}>{car.icon}</span>
                                                <div>
                                                    <div style={{ fontWeight:700, color:"#fff" }}>{car.name}</div>
                                                    <div style={{ fontSize:11, color:Colors.muted }}>{car.brand}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <span className="adm-badge" style={{ background:cc.bg, color:cc.c, borderColor:`${cc.c}30` }}>
                                                {car.cat.charAt(0).toUpperCase() + car.cat.slice(1)}
                                            </span>
                                        </td>
                                        <td style={{ color:Colors.muted }}>{car.engine}</td>
                                        <td style={{ color:Colors.muted }}>{car.seats} seats</td>
                                        <td style={{ color:Colors.muted }}>{car.trans}</td>
                                        <td style={{ fontWeight:700, color:Colors.green }}>${car.price}/day</td>
                                        <td>
                                            <label className="adm-toggle">
                                                <input type="checkbox" checked={car.avail} onChange={() => toggleAvail(car.id)} />
                                                <span className="adm-toggle-slider" />
                                            </label>
                                        </td>
                                        <td>
                                            <div style={{ display:"flex", gap:6 }}>
                                                <button className="adm-btn adm-btn-ghost adm-btn-sm adm-btn-icon" onClick={() => openEdit(car)} title="Edit">✏️</button>
                                                <button className="adm-btn adm-btn-danger adm-btn-sm adm-btn-icon" onClick={() => deleteCar(car.id)} title="Delete">🗑</button>
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })}
                            {filtered.length === 0 && (
                                <tr><td colSpan={8} style={{ textAlign:"center", padding:40, color:Colors.muted }}>No vehicles match your filter.</td></tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Add / Edit Modal */}
            {modal && (
                <div className="adm-modal-overlay" onClick={e => { if(e.target === e.currentTarget) setModal(false); }}>
                    <div className="adm-modal">
                        <div className="adm-modal-head">
                            <span className="adm-modal-title">{editId ? "Edit Vehicle" : "Add New Vehicle"}</span>
                            <button className="adm-modal-close" onClick={() => setModal(false)}>✕</button>
                        </div>
                        <div className="adm-modal-body">
                            <div className="adm-form-grid">
                                <div className="adm-field">
                                    <label className="adm-label">Brand</label>
                                    <input className="adm-input" value={form.brand} onChange={e => setForm(f=>({...f,brand:e.target.value}))} placeholder="e.g. Toyota" />
                                </div>
                                <div className="adm-field">
                                    <label className="adm-label">Model Name</label>
                                    <input className="adm-input" value={form.name} onChange={e => setForm(f=>({...f,name:e.target.value}))} placeholder="e.g. Corolla 2024" />
                                </div>
                                <div className="adm-field">
                                    <label className="adm-label">Category</label>
                                    <select className="adm-select" value={form.cat} onChange={e => setForm(f=>({...f,cat:e.target.value}))}>
                                        {["economy","sedan","suv","luxury"].map(c => <option key={c} value={c}>{c.charAt(0).toUpperCase()+c.slice(1)}</option>)}
                                    </select>
                                </div>
                                <div className="adm-field">
                                    <label className="adm-label">Engine</label>
                                    <input className="adm-input" value={form.engine} onChange={e => setForm(f=>({...f,engine:e.target.value}))} placeholder="e.g. 1.8L 4-cyl" />
                                </div>
                                <div className="adm-field">
                                    <label className="adm-label">Seats</label>
                                    <select className="adm-select" value={form.seats} onChange={e => setForm(f=>({...f,seats:Number(e.target.value)}))}>
                                        {[2,4,5,7,8].map(s => <option key={s} value={s}>{s} seats</option>)}
                                    </select>
                                </div>
                                <div className="adm-field">
                                    <label className="adm-label">Transmission</label>
                                    <select className="adm-select" value={form.trans} onChange={e => setForm(f=>({...f,trans:e.target.value}))}>
                                        {["Auto","Manual","DCT","S-Tronic","8-DCT"].map(t => <option key={t} value={t}>{t}</option>)}
                                    </select>
                                </div>
                                <div className="adm-field">
                                    <label className="adm-label">Rate / Day ($)</label>
                                    <input className="adm-input" type="number" value={form.price} onChange={e => setForm(f=>({...f,price:e.target.value}))} placeholder="e.g. 85" />
                                </div>
                                <div className="adm-field" style={{ justifyContent:"flex-end", paddingBottom:4 }}>
                                    <label className="adm-label">Available</label>
                                    <div style={{ marginTop:8 }}>
                                        <label className="adm-toggle">
                                            <input type="checkbox" checked={form.avail} onChange={e => setForm(f=>({...f,avail:e.target.checked}))} />
                                            <span className="adm-toggle-slider" />
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="adm-modal-footer">
                            <button className="adm-btn adm-btn-ghost" onClick={() => setModal(false)}>Cancel</button>
                            <button className="adm-btn adm-btn-primary" onClick={handleSave}>{editId ? "Save Changes" : "Add Vehicle"}</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
