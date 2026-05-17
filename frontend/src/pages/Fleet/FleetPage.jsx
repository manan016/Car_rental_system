import { useState, useEffect } from "react";
import { Colors } from "../../constants/designTokens";
import { CAR_CATEGORIES } from "../../constants/carData";
import { useAuth } from "../../context/AuthContext";
import apiClient from "../../api/axios";

/* ── Lucide inline SVG ────────────────────────────────────────── */
const Icon = ({ d, size = 15, color = "currentColor", strokeW = 1.8 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
        stroke={color} strokeWidth={strokeW} strokeLinecap="round" strokeLinejoin="round">
        <path d={d} />
    </svg>
);
const I = {
    search:   "M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16zM21 21l-4.35-4.35",
    filter:   "M22 3H2l8 9.46V19l4 2v-8.54L22 3z",
    users:    "M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75",
    gauge:    "M12 2a10 10 0 0 1 7.38 16.83M12 2a10 10 0 0 0-7.38 16.83M12 8v4l2 2",
    fuel:     "M3 22V8l9-6 9 6v14M10 22V16h4v6",
    gear:     "M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z",
    star:     "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z",
    calendar: "M3 9h18M3 4h18a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1zM8 2v4M16 2v4",
    check:    "M20 6L9 17l-5-5",
    lock:     "M19 11H5a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7a2 2 0 0 0-2-2zM7 11V7a5 5 0 0 1 10 0v4",
    sort:     "M3 6h18M6 12h12M9 18h6",
};

const CAT_COLOR = {
    all:     { c:"#8696A0" },
    economy: { c:"#118AB2" },
    sedan:   { c:"#25D366" },
    suv:     { c:"#FFD166" },
    luxury:  { c:"#EF476F" },
};

/**
 * FleetPage — Professional vehicle catalogue connected to MySQL
 */
export const FleetPage = ({ setPage }) => {
    const { currentUser } = useAuth();
    const [search, setSearch] = useState("");
    const [cat, setCat] = useState("all");
    const [sort, setSort] = useState("recommended");
    const [fleet, setFleet] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState("all");

    useEffect(() => {
        const fetchCars = async () => {
            try {
                setLoading(true);
                const query = filter === "all" ? "/cars" : `/cars?category=${filter}`;
                const res = await apiClient.get(query);
                if (res.success) {
                    setFleet(res.data);
                }
            } catch (error) {
                console.error("Failed to fetch fleet:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchCars();
    }, [filter]);

    const filtered = fleet
        .filter(c =>
            c.name.toLowerCase().includes(search.toLowerCase()) ||
            c.brand.toLowerCase().includes(search.toLowerCase())
        )
        .sort((a, b) => {
            if (sort === "price-asc")  return parseFloat(a.price_per_day) - parseFloat(b.price_per_day);
            if (sort === "price-desc") return parseFloat(b.price_per_day) - parseFloat(a.price_per_day);
            if (sort === "name")       return a.name.localeCompare(b.name);
            return 0;
        });

    return (
        <div style={{ paddingTop:70, minHeight:"100vh", background:"#111B21" }}>
            {/* ── Hero Header ─────────────────────────────────── */}
            <div style={{ padding:"56px 48px 36px",
                background:"linear-gradient(180deg,#1C2B33 0%,#111B21 100%)",
                borderBottom:"1px solid #2A3942" }}>
                <div style={{ fontSize:11, color:"#25D366", fontWeight:700,
                    textTransform:"uppercase", letterSpacing:"2px", marginBottom:10 }}>
                    Vehicle Catalogue
                </div>
                <h1 style={{ fontFamily:"'Syne',sans-serif",
                    fontSize:"clamp(36px,4vw,60px)", fontWeight:800,
                    letterSpacing:"-2px", marginBottom:8, color:"#fff" }}>
                    Our Fleet.
                </h1>
                <p style={{ fontSize:14, color:"#8696A0", maxWidth:480, marginBottom:36 }}>
                    Every vehicle inspected, insured, and ready to roll.
                    Choose from economy to exotic.
                </p>

                {/* Controls */}
                <div style={{ display:"flex", gap:12, flexWrap:"wrap", alignItems:"center" }}>
                    {/* Search */}
                    <div style={{ position:"relative", flex:1, maxWidth:320 }}>
                        <div style={{ position:"absolute", left:12, top:"50%",
                            transform:"translateY(-50%)" }}>
                            <Icon d={I.search} size={15} color="#8696A0" />
                        </div>
                        <input value={search} onChange={e => setSearch(e.target.value)}
                            placeholder="Search by name or brand…"
                            style={{ paddingLeft:38, background:"#1C2B33",
                                border:"1px solid #2A3942", borderRadius:10,
                                padding:"10px 12px 10px 38px",
                                fontSize:13, color:"#fff", outline:"none",
                                fontFamily:"'DM Sans',sans-serif", width:"100%",
                                transition:"border-color .2s" }} />
                    </div>

                    {/* Category pills */}
                    <div style={{ display:"flex", gap:6, flexWrap:"wrap" }}>
                        {CAR_CATEGORIES.map(c => {
                            const meta = CAT_COLOR[c] || { c:"#8696A0" };
                            const active = filter === c;
                            return (
                                <button key={c} onClick={() => setFilter(c)} style={{
                                    background: active ? `${meta.c}18` : "transparent",
                                    color: active ? meta.c : "#8696A0",
                                    border: `1px solid ${active ? `${meta.c}50` : "#2A3942"}`,
                                    borderRadius:100, padding:"8px 18px",
                                    fontSize:13, fontWeight: active ? 700 : 500,
                                    cursor:"pointer",
                                    fontFamily:"'DM Sans',sans-serif",
                                    transition:"all .2s", textTransform:"capitalize",
                                }}>
                                    {c}
                                </button>
                            );
                        })}
                    </div>

                    {/* Sort */}
                    <div style={{ display:"flex", alignItems:"center", gap:8 }}>
                        <Icon d={I.sort} size={14} color="#8696A0" />
                        <select value={sort} onChange={e => setSort(e.target.value)}
                            style={{ background:"#1C2B33", border:"1px solid #2A3942",
                                borderRadius:10, padding:"9px 14px",
                                fontSize:13, color:"#fff", outline:"none",
                                fontFamily:"'DM Sans',sans-serif", cursor:"pointer" }}>
                            <option value="price-asc">Price: Low → High</option>
                            <option value="price-desc">Price: High → Low</option>
                            <option value="name">Name A–Z</option>
                            <option value="rating">Top Rated</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* ── Cars Grid ────────────────────────────────────── */}
            <div style={{ padding:"36px 48px",
                display:"grid", gridTemplateColumns:"repeat(3,1fr)",
                gap:22, maxWidth:1400, margin:"0 auto" }}>
                {filtered.map(car => {
                    const catC = CAT_COLOR[car.cat]?.c || "#8696A0";
                    const isHov = hovered === car.id;
                    return (
                        <div key={car.id}
                            onMouseEnter={() => setHovered(car.id)}
                            onMouseLeave={() => setHovered(null)}
                            style={{
                                background:"#1C2B33", border:`1px solid ${isHov ? catC+"40" : "#2A3942"}`,
                                borderRadius:18, overflow:"hidden",
                                transition:"all .25s cubic-bezier(.4,0,.2,1)",
                                transform: isHov ? "translateY(-5px)" : "none",
                                boxShadow: isHov ? `0 16px 40px rgba(0,0,0,.35)` : "none",
                            }}>
                            {/* Image */}
                            <div style={{ position:"relative", height:200, overflow:"hidden" }}>
                                <img src={car.image} alt={car.name}
                                    style={{ width:"100%", height:"100%", objectFit:"cover",
                                        transition:"transform .4s ease",
                                        transform: isHov ? "scale(1.05)" : "scale(1)" }}
                                    onError={e => { e.target.style.display="none"; }} />
                                <div style={{ position:"absolute", inset:0,
                                    background:"linear-gradient(to top, rgba(17,27,33,.85) 0%, rgba(17,27,33,0) 50%)" }} />

                                {/* Unavailable overlay */}
                                {!car.avail && (
                                    <div style={{ position:"absolute", inset:0,
                                        background:"rgba(0,0,0,.65)",
                                        display:"flex", alignItems:"center", justifyContent:"center" }}>
                                        <div style={{ display:"flex", alignItems:"center", gap:8,
                                            background:"rgba(239,71,111,.15)",
                                            border:"1px solid rgba(239,71,111,.35)",
                                            borderRadius:100, padding:"8px 16px" }}>
                                            <Icon d={I.lock} size={13} color="#EF476F" />
                                            <span style={{ fontSize:12, fontWeight:700, color:"#EF476F" }}>
                                                Currently Unavailable
                                            </span>
                                        </div>
                                    </div>
                                )}

                                {/* Category badge */}
                                <div style={{ position:"absolute", top:12, left:12 }}>
                                    <span style={{ background:`${catC}18`,
                                        color:catC, border:`1px solid ${catC}40`,
                                        fontSize:10, fontWeight:700, padding:"3px 10px",
                                        borderRadius:100, textTransform:"capitalize" }}>
                                        {car.cat}
                                    </span>
                                </div>

                                {/* Rating badge */}
                                <div style={{ position:"absolute", top:12, right:12,
                                    display:"flex", alignItems:"center", gap:4,
                                    background:"rgba(0,0,0,.55)", backdropFilter:"blur(4px)",
                                    borderRadius:100, padding:"4px 10px" }}>
                                    <Icon d={I.star} size={11} color="#FFD166" />
                                    <span style={{ fontSize:11, fontWeight:700, color:"#FFD166" }}>
                                        {car.rating}
                                    </span>
                                </div>

                                {/* Price at bottom */}
                                <div style={{ position:"absolute", bottom:12, right:12 }}>
                                    <span style={{ fontFamily:"'Syne',sans-serif",
                                        fontSize:20, fontWeight:800, color:"#25D366" }}>
                                        ${car.price}
                                    </span>
                                    <span style={{ fontSize:11, color:"rgba(255,255,255,.5)" }}>/day</span>
                                </div>
                            </div>

                            {/* Card body */}
                            <div style={{ padding:"16px 20px" }}>
                                <div style={{ marginBottom:12 }}>
                                    <div style={{ fontFamily:"'Syne',sans-serif", fontSize:17,
                                        fontWeight:800, color:"#fff", marginBottom:3 }}>
                                        {car.name}
                                    </div>
                                    <div style={{ fontSize:12, color:"#8696A0" }}>{car.brand}</div>
                                </div>

                                {/* Specs row */}
                                <div style={{ display:"flex", gap:16, marginBottom:14 }}>
                                    {[
                                        { icon:I.users,   val:`${car.seats} seats` },
                                        { icon:I.gear,    val:car.trans           },
                                        { icon:I.fuel,    val:car.fuel || "Petrol" },
                                    ].map(s => (
                                        <div key={s.val} style={{ display:"flex", alignItems:"center",
                                            gap:5, fontSize:12, color:"#8696A0" }}>
                                            <Icon d={s.icon} size={12} color="#8696A0" />
                                            {s.val}
                                        </div>
                                    ))}
                                </div>

                                {/* Engine */}
                                <div style={{ display:"flex", alignItems:"center", gap:6,
                                    fontSize:12, color:"#8696A0", marginBottom:14 }}>
                                    <Icon d={I.gauge} size={12} color="#8696A0" />
                                    {car.engine}
                                </div>

                                {/* Features chips */}
                                {car.features && (
                                    <div style={{ display:"flex", gap:5, flexWrap:"wrap", marginBottom:16 }}>
                                        {car.features.slice(0, 3).map(f => (
                                            <span key={f} style={{ fontSize:10, fontWeight:600,
                                                color:"#8696A0", background:"rgba(134,150,160,.08)",
                                                border:"1px solid #2A3942",
                                                borderRadius:6, padding:"3px 8px" }}>
                                                {f}
                                            </span>
                                        ))}
                                    </div>
                                )}

                                {/* CTA */}
                                <button
                                    disabled={!car.avail}
                                    onClick={() => {
                                        if (!car.avail) return;
                                        if (!currentUser) { setPage("Auth"); return; }
                                        setBookingCar(car);
                                        setPage("Booking");
                                    }}
                                    style={{
                                        width:"100%", padding:"11px",
                                        background: car.avail
                                            ? isHov
                                                ? "linear-gradient(135deg,#25D366,#128C7E)"
                                                : "rgba(37,211,102,.08)"
                                            : "rgba(134,150,160,.06)",
                                        color: car.avail ? (isHov ? "#111B21" : "#25D366") : "#8696A0",
                                        border: `1px solid ${car.avail ? "rgba(37,211,102,.3)" : "#2A3942"}`,
                                        borderRadius:10, fontSize:13, fontWeight:700,
                                        cursor: car.avail ? "pointer" : "not-allowed",
                                        fontFamily:"'DM Sans',sans-serif",
                                        transition:"all .25s",
                                        display:"flex", alignItems:"center",
                                        justifyContent:"center", gap:7,
                                        boxShadow: car.avail && isHov ? "0 4px 14px rgba(37,211,102,.3)" : "none",
                                    }}>
                                    {car.avail ? (
                                        <><Icon d={I.calendar} size={13}
                                            color={isHov ? "#111B21" : "#25D366"} />
                                            Reserve Now
                                        </>
                                    ) : (
                                        <><Icon d={I.lock} size={13} color="#8696A0" />
                                            Unavailable
                                        </>
                                    )}
                                </button>
                            </div>
                        </div>
                    );
                })}

                {filtered.length === 0 && (
                    <div style={{ gridColumn:"span 3", textAlign:"center",
                        padding:"80px 0", color:"#8696A0" }}>
                        <div style={{ fontSize:48, marginBottom:12 }}>🔍</div>
                        <div style={{ fontFamily:"'Syne',sans-serif", fontSize:20, fontWeight:700,
                            color:"#fff", marginBottom:6 }}>No vehicles found</div>
                        <div style={{ fontSize:13 }}>Try adjusting your search or filters</div>
                    </div>
                )}
            </div>
        </div>
    );
};
