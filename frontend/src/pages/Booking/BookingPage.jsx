import { useState } from "react";
import { Colors } from "../../constants/designTokens";
import { PRICING_RATES, CARS } from "../../constants/carData";
import { calculateDays, generateBookingRef } from "../../utils/helpers";
import { useBookings } from "../../context/BookingContext";
import { useAuth } from "../../context/AuthContext";

/* ── Lucide icons via CDN (inline SVG wrappers) ───────────────── */
const Icon = ({ d, size = 16, color = "currentColor", strokeW = 1.8 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
        stroke={color} strokeWidth={strokeW} strokeLinecap="round" strokeLinejoin="round">
        <path d={d} />
    </svg>
);
const ICONS = {
    car:     "M5 17H3a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v5M7 17a2 2 0 1 0 4 0 2 2 0 0 0-4 0m10 0a2 2 0 1 0 4 0 2 2 0 0 0-4 0",
    user:    "M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8",
    mail:    "M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2zM22 6l-10 7L2 6",
    phone:   "M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13.6 19.79 19.79 0 0 1 1.61 5 2 2 0 0 1 3.6 2.84h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 9.91a16 16 0 0 0 6.08 6.08l1.13-1.13a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7a2 2 0 0 1 1.72 2.02z",
    calendar:"M3 9h18M3 4h18a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1zM8 2v4M16 2v4",
    tag:     "M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82zM7 7h.01",
    credit:  "M1 4h22v16H1zM1 10h22",
    lock:    "M19 11H5a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7a2 2 0 0 0-2-2zM7 11V7a5 5 0 0 1 10 0v4",
    check:   "M20 6L9 17l-5-5",
    fuel:    "M3 22V8l9-6 9 6v14M10 22V16h4v6",
    seat:    "M3 11l19-9-9 19-2-8-8-2z",
    settings:"M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z",
    star:    "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z",
    note:    "M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6zM14 2v6h6M16 13H8M16 17H8M10 9H8",
};

const CAT_META = {
    economy: { color: "#118AB2", label: "Economy" },
    sedan:   { color: "#25D366", label: "Sedan"   },
    suv:     { color: "#FFD166", label: "SUV"      },
    luxury:  { color: "#EF476F", label: "Luxury"   },
};

/**
 * BookingPage — Agency-grade reservation form with real-time admin sync.
 */
export const BookingPage = ({ bookingCar, setPage }) => {
    const { addBooking } = useBookings();
    const { currentUser } = useAuth();

    const [form, setForm] = useState({
        name:    currentUser?.name  || "",
        email:   currentUser?.email || "",
        phone:   "",
        cat:     bookingCar?.cat    || "economy",
        start:   "",
        end:     "",
        promo:   "",
        payment: "stripe",
        notes:   "",
    });
    const [errors, setErrors]     = useState({});
    const [submitted, setSubmitted] = useState(false);
    const [bookingRef, setBookingRef] = useState("");
    const [submitting, setSubmitting] = useState(false);

    function up(k, v) { setForm(f => ({ ...f, [k]: v })); }

    const car   = bookingCar || CARS.find(c => c.cat === form.cat) || CARS[0];
    const days  = calculateDays(form.start, form.end);
    const rate  = bookingCar?.price || PRICING_RATES[form.cat] || 45;
    const sub   = rate * days;
    const disc  = form.promo.toUpperCase() === "VELOCE10" ? sub * 0.1 : 0;
    const total = sub - disc;

    function validate() {
        const e = {};
        if (!form.name)  e.name  = "Full name is required";
        if (!form.email) e.email = "Email is required";
        if (!form.start) e.start = "Pickup date is required";
        if (!form.end)   e.end   = "Return date is required";
        if (form.start && form.end && form.end <= form.start) e.end = "Return must be after pickup";
        setErrors(e);
        return Object.keys(e).length === 0;
    }

    function submit() {
        if (!validate()) return;
        setSubmitting(true);
        setTimeout(() => {
            const ref = addBooking({
                user:  form.name,
                email: form.email,
                phone: form.phone,
                car:   `${car.brand} ${car.name}`,
                carId: car.id,
                cat:   form.cat,
                image: car.image,
                dates: `${form.start} – ${form.end}`,
                start: form.start,
                end:   form.end,
                days,
                amount: `$${total.toFixed(0)}`,
                total,
                payment: form.payment,
                notes: form.notes,
            });
            setBookingRef(ref);
            setSubmitted(true);
            setSubmitting(false);
        }, 1200);
    }

    /* ── Success screen ─────────────────────────────────────────── */
    if (submitted) return (
        <div style={{ minHeight:"100vh", background:Colors.black, paddingTop:70,
            display:"flex", alignItems:"center", justifyContent:"center", padding:"70px 24px 40px" }}>
            <div style={{ background:"#1C2B33", border:"1px solid rgba(37,211,102,.25)",
                borderRadius:24, padding:"48px 40px", maxWidth:520, width:"100%",
                textAlign:"center", boxShadow:"0 0 80px rgba(37,211,102,.08)" }}>

                <div style={{ width:72, height:72, borderRadius:"50%", margin:"0 auto 24px",
                    background:"rgba(37,211,102,.1)", border:"2px solid rgba(37,211,102,.3)",
                    display:"flex", alignItems:"center", justifyContent:"center" }}>
                    <Icon d={ICONS.check} size={32} color="#25D366" strokeW={2.5} />
                </div>

                <h2 style={{ fontFamily:"'Syne',sans-serif", fontSize:28, fontWeight:800,
                    letterSpacing:"-1px", marginBottom:10, color:"#fff" }}>
                    Booking Confirmed!
                </h2>
                <p style={{ color:"#8696A0", fontSize:14, lineHeight:1.7, marginBottom:24 }}>
                    Your reservation is now <strong style={{ color:"#25D366" }}>pending admin approval</strong>. You'll receive an email at <strong style={{ color:"#fff" }}>{form.email}</strong>.
                </p>

                {/* Booking receipt */}
                <div style={{ background:"#111B21", border:"1px solid #2A3942",
                    borderRadius:14, padding:"20px 24px", marginBottom:24, textAlign:"left" }}>
                    {[
                        ["Booking Ref",  bookingRef],
                        ["Vehicle",      `${car.brand} ${car.name}`],
                        ["Duration",     `${days} day${days !== 1 ? "s" : ""} (${form.start} → ${form.end})`],
                        ["Total",        `$${total.toFixed(0)}${disc > 0 ? " (10% off)" : ""}`, "#25D366"],
                        ["Payment",      form.payment === "stripe" ? "💳 Stripe" : "🅿 PayPal"],
                        ["Status",       "Pending Approval", "#FFD166"],
                    ].map(([k, v, vc]) => (
                        <div key={k} style={{ display:"flex", justifyContent:"space-between",
                            padding:"9px 0", borderBottom:"1px solid #2A3942", fontSize:13 }}>
                            <span style={{ color:"#8696A0" }}>{k}</span>
                            <span style={{ color: vc || "#fff", fontWeight: vc ? 700 : 500 }}>{v}</span>
                        </div>
                    ))}
                </div>

                <div style={{ display:"flex", gap:10, justifyContent:"center" }}>
                    <button onClick={() => setPage("Fleet")} style={{
                        background:"linear-gradient(135deg,#25D366,#128C7E)", color:"#111B21",
                        border:"none", borderRadius:12, padding:"12px 28px",
                        fontSize:14, fontWeight:800, cursor:"pointer",
                        fontFamily:"'Syne',sans-serif",
                        boxShadow:"0 6px 20px rgba(37,211,102,.3)",
                    }}>
                        Browse More Cars →
                    </button>
                </div>
            </div>
        </div>
    );

    /* ── Field component ─────────────────────────────────────────── */
    const Field = ({ label, icon, error, children }) => (
        <div style={{ display:"flex", flexDirection:"column", gap:6 }}>
            <label style={{ fontSize:11, fontWeight:700, color:"#8696A0",
                textTransform:"uppercase", letterSpacing:".6px",
                display:"flex", alignItems:"center", gap:6 }}>
                {icon && <Icon d={icon} size={13} color="#8696A0" />}
                {label}
            </label>
            {children}
            {error && <span style={{ fontSize:11, color:"#EF476F", marginTop:-2 }}>{error}</span>}
        </div>
    );

    const inputStyle = {
        background:"#111B21", border:"1px solid",
        borderRadius:10, padding:"11px 14px",
        fontSize:13, color:"#fff",
        fontFamily:"'DM Sans',sans-serif", outline:"none",
        transition:"border-color .2s",
        width:"100%", boxSizing:"border-box",
    };

    /* ── Main booking form ───────────────────────────────────────── */
    return (
        <div style={{ paddingTop:70, minHeight:"100vh", background:Colors.black }}>
            {/* Hero */}
            <div style={{ padding:"50px 48px 36px", background:"#1C2B33",
                borderBottom:"1px solid #2A3942" }}>
                <div style={{ fontSize:11, color:"#25D366", fontWeight:700,
                    textTransform:"uppercase", letterSpacing:"2px", marginBottom:10 }}>
                    New Reservation
                </div>
                <h1 style={{ fontFamily:"'Syne',sans-serif",
                    fontSize:"clamp(30px,4vw,52px)", fontWeight:800,
                    letterSpacing:"-2px", marginBottom:6, color:"#fff" }}>
                    Book Your Ride.
                </h1>
                <p style={{ color:"#8696A0", fontSize:14 }}>
                    Fill in the details below — your booking goes live instantly.
                </p>
            </div>

            <div style={{ padding:"36px 48px", display:"grid",
                gridTemplateColumns:"1fr 380px", gap:28, alignItems:"start",
                maxWidth:1300, margin:"0 auto" }}>

                {/* ── Form panel ───────────────────────────────── */}
                <div style={{ background:"#1C2B33", border:"1px solid #2A3942",
                    borderRadius:20, overflow:"hidden" }}>

                    {/* Car preview header */}
                    <div style={{ position:"relative", height:200, overflow:"hidden" }}>
                        <img src={car.image} alt={car.name}
                            style={{ width:"100%", height:"100%", objectFit:"cover" }}
                            onError={e => { e.target.style.background="#111B21"; }} />
                        <div style={{ position:"absolute", inset:0,
                            background:"linear-gradient(to top, rgba(17,27,33,.95) 0%, rgba(17,27,33,.3) 100%)" }} />
                        <div style={{ position:"absolute", bottom:0, left:0, right:0, padding:"16px 24px",
                            display:"flex", justifyContent:"space-between", alignItems:"flex-end" }}>
                            <div>
                                <div style={{ fontFamily:"'Syne',sans-serif", fontSize:20,
                                    fontWeight:800, color:"#fff", lineHeight:1 }}>{car.name}</div>
                                <div style={{ fontSize:12, color:"#8696A0", marginTop:3 }}>{car.brand}</div>
                            </div>
                            <div style={{ display:"flex", alignItems:"center", gap:8 }}>
                                <span style={{ background:"rgba(37,211,102,.15)", color:"#25D366",
                                    border:"1px solid rgba(37,211,102,.3)",
                                    fontSize:11, fontWeight:700, padding:"4px 12px", borderRadius:100 }}>
                                    {CAT_META[car.cat]?.label || car.cat}
                                </span>
                                <span style={{ fontFamily:"'Syne',sans-serif", fontSize:22,
                                    fontWeight:800, color:"#25D366" }}>
                                    ${rate}<span style={{ fontSize:12, color:"#8696A0" }}>/day</span>
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Form body */}
                    <div style={{ padding:28, display:"flex", flexDirection:"column", gap:18 }}>
                        {/* Row 1 */}
                        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:16 }}>
                            <Field label="Full Name" icon={ICONS.user} error={errors.name}>
                                <input style={{ ...inputStyle, borderColor: errors.name ? "#EF476F" : "#2A3942" }}
                                    value={form.name} onChange={e => up("name", e.target.value)}
                                    placeholder="Ahmed Khan" />
                            </Field>
                            <Field label="Email Address" icon={ICONS.mail} error={errors.email}>
                                <input style={{ ...inputStyle, borderColor: errors.email ? "#EF476F" : "#2A3942" }}
                                    type="email" value={form.email} onChange={e => up("email", e.target.value)}
                                    placeholder="ahmed@email.com" />
                            </Field>
                        </div>

                        {/* Row 2 */}
                        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:16 }}>
                            <Field label="Phone Number" icon={ICONS.phone}>
                                <input style={{ ...inputStyle, borderColor:"#2A3942" }}
                                    value={form.phone} onChange={e => up("phone", e.target.value)}
                                    placeholder="+92 300 0000000" />
                            </Field>
                            <Field label="Vehicle Category" icon={ICONS.car}>
                                <select style={{ ...inputStyle, borderColor:"#2A3942",
                                    appearance:"none", cursor:"pointer" }}
                                    value={form.cat} onChange={e => up("cat", e.target.value)}>
                                    <option value="economy">Economy — $28/day</option>
                                    <option value="sedan">Sedan — $55/day</option>
                                    <option value="suv">SUV — $85/day</option>
                                    <option value="luxury">Luxury — $180/day</option>
                                </select>
                            </Field>
                        </div>

                        {/* Row 3 */}
                        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:16 }}>
                            <Field label="Pickup Date" icon={ICONS.calendar} error={errors.start}>
                                <input style={{ ...inputStyle, borderColor: errors.start ? "#EF476F" : "#2A3942" }}
                                    type="date" value={form.start}
                                    onChange={e => up("start", e.target.value)}
                                    min={new Date().toISOString().split("T")[0]} />
                            </Field>
                            <Field label="Return Date" icon={ICONS.calendar} error={errors.end}>
                                <input style={{ ...inputStyle, borderColor: errors.end ? "#EF476F" : "#2A3942" }}
                                    type="date" value={form.end}
                                    onChange={e => up("end", e.target.value)}
                                    min={form.start || new Date().toISOString().split("T")[0]} />
                            </Field>
                        </div>

                        {/* Row 4 */}
                        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:16 }}>
                            <Field label="Promo Code" icon={ICONS.tag}>
                                <input style={{ ...inputStyle, borderColor:"#2A3942",
                                    ...(form.promo.toUpperCase() === "VELOCE10" ? { borderColor:"#25D366" } : {}) }}
                                    value={form.promo} onChange={e => up("promo", e.target.value)}
                                    placeholder="Try: VELOCE10" />
                                {form.promo.toUpperCase() === "VELOCE10" && (
                                    <span style={{ fontSize:11, color:"#25D366", marginTop:-2 }}>
                                        ✓ 10% discount applied!
                                    </span>
                                )}
                            </Field>
                            <Field label="Payment Method" icon={ICONS.credit}>
                                <select style={{ ...inputStyle, borderColor:"#2A3942",
                                    appearance:"none", cursor:"pointer" }}
                                    value={form.payment} onChange={e => up("payment", e.target.value)}>
                                    <option value="stripe">💳 Stripe</option>
                                    <option value="paypal">🅿 PayPal</option>
                                </select>
                            </Field>
                        </div>

                        {/* Notes */}
                        <Field label="Special Notes" icon={ICONS.note}>
                            <textarea style={{ ...inputStyle, borderColor:"#2A3942",
                                resize:"vertical", minHeight:70 }}
                                value={form.notes} onChange={e => up("notes", e.target.value)}
                                placeholder="Child seat, GPS, etc…" />
                        </Field>
                    </div>
                </div>

                {/* ── Sidebar ──────────────────────────────────── */}
                <div style={{ display:"flex", flexDirection:"column", gap:14,
                    position:"sticky", top:90 }}>

                    {/* Car image card */}
                    <div style={{ background:"#1C2B33", border:"1px solid #2A3942",
                        borderRadius:16, overflow:"hidden" }}>
                        <img src={car.image} alt={car.name}
                            style={{ width:"100%", height:160, objectFit:"cover" }}
                            onError={e => { e.target.style.background="#111B21"; }} />
                        <div style={{ padding:"14px 18px" }}>
                            <div style={{ fontFamily:"'Syne',sans-serif", fontSize:16,
                                fontWeight:800, color:"#fff", marginBottom:6 }}>{car.name}</div>
                            <div style={{ display:"flex", gap:14, fontSize:12, color:"#8696A0" }}>
                                <span style={{ display:"flex", alignItems:"center", gap:4 }}>
                                    <Icon d={ICONS.seat} size={12} color="#8696A0" /> {car.seats} seats
                                </span>
                                <span style={{ display:"flex", alignItems:"center", gap:4 }}>
                                    <Icon d={ICONS.settings} size={12} color="#8696A0" /> {car.trans}
                                </span>
                                <span style={{ display:"flex", alignItems:"center", gap:4 }}>
                                    <Icon d={ICONS.fuel} size={12} color="#8696A0" /> {car.fuel || "Petrol"}
                                </span>
                            </div>
                            <div style={{ display:"flex", alignItems:"center", gap:4, marginTop:6 }}>
                                <Icon d={ICONS.star} size={12} color="#FFD166" />
                                <span style={{ fontSize:12, color:"#FFD166", fontWeight:700 }}>{car.rating}</span>
                                <span style={{ fontSize:12, color:"#8696A0" }}> rating</span>
                            </div>
                        </div>
                    </div>

                    {/* Price summary */}
                    <div style={{ background:"#1C2B33", border:"1px solid rgba(37,211,102,.2)",
                        borderRadius:16, padding:20 }}>
                        <div style={{ fontSize:11, color:"#25D366", fontWeight:700,
                            textTransform:"uppercase", letterSpacing:".8px", marginBottom:14 }}>
                            Price Summary
                        </div>
                        {[
                            ["Base rate",    `$${rate}/day`],
                            ["Duration",     days > 0 ? `${days} day${days !== 1 ? "s" : ""}` : "— Pick dates"],
                            ["Subtotal",     days > 0 ? `$${sub.toFixed(0)}` : "—"],
                            disc > 0 && ["Promo (VELOCE10)", `-$${disc.toFixed(0)}`],
                        ].filter(Boolean).map(([k, v]) => (
                            <div key={k} style={{ display:"flex", justifyContent:"space-between",
                                fontSize:13, color:"#8696A0", marginBottom:10 }}>
                                <span>{k}</span>
                                <span style={{ color: k.includes("Promo") ? "#25D366" : "#fff",
                                    fontWeight: k.includes("Promo") ? 700 : 400 }}>{v}</span>
                            </div>
                        ))}
                        <div style={{ height:1, background:"#2A3942", margin:"14px 0" }} />
                        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                            <span style={{ fontFamily:"'Syne',sans-serif", fontSize:16, fontWeight:700, color:"#fff" }}>Total</span>
                            <span style={{ fontFamily:"'Syne',sans-serif", fontSize:28,
                                fontWeight:800, color:"#25D366" }}>
                                {days > 0 ? `$${total.toFixed(0)}` : "$—"}
                            </span>
                        </div>
                    </div>

                    {/* CTA */}
                    <button onClick={submit} disabled={submitting} style={{
                        background:"linear-gradient(135deg,#25D366,#128C7E)",
                        color:"#111B21", border:"none", borderRadius:14, padding:"16px",
                        fontSize:15, fontWeight:800, cursor: submitting ? "wait" : "pointer",
                        fontFamily:"'Syne',sans-serif",
                        boxShadow:"0 8px 28px rgba(37,211,102,.35)",
                        transition:"all .22s", width:"100%",
                        opacity: submitting ? 0.8 : 1,
                        display:"flex", alignItems:"center", justifyContent:"center", gap:8,
                    }}>
                        {submitting
                            ? <><span style={{ animation:"spin .8s linear infinite", display:"inline-block" }}>⟳</span> Processing…</>
                            : <>Confirm Booking →</>
                        }
                    </button>

                    {/* Trust badges */}
                    <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
                        {[
                            { icon:ICONS.lock,  text:"SSL Encrypted & Secure" },
                            { icon:ICONS.check, text:"Instant Confirmation" },
                            { icon:ICONS.car,   text:"Free Cancellation · 48h" },
                        ].map(({ icon, text }) => (
                            <div key={text} style={{ display:"flex", alignItems:"center",
                                gap:10, fontSize:12, color:"#8696A0" }}>
                                <Icon d={icon} size={14} color="#25D366" />
                                {text}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
        </div>
    );
};
