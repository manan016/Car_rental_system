import { Colors } from "../../constants/designTokens";
import { SectionLabel, RevealBox } from "../../components/Shared";

/**
 * DatabasePage Component
 * Database schema documentation and ER relationships
 */
export const DatabasePage = () => {
    const tables = [
        {
            icon: "👤",
            name: "Users",
            color: Colors.info,
            fields: [
                { name: "id", type: "INT · AUTO_INCREMENT", key: "PK" },
                { name: "name", type: "VARCHAR(100)", key: "" },
                { name: "email", type: "VARCHAR(150) UNIQUE", key: "" },
                { name: "password_hash", type: "VARCHAR(255)", key: "" },
                { name: "phone", type: "VARCHAR(20)", key: "" },
                { name: "created_at", type: "DATETIME DEFAULT NOW", key: "" },
                { name: "status", type: "ENUM(active,blocked)", key: "" },
            ],
        },
        {
            icon: "🚗",
            name: "Cars",
            color: Colors.green,
            fields: [
                { name: "id", type: "INT · AUTO_INCREMENT", key: "PK" },
                { name: "name", type: "VARCHAR(100)", key: "" },
                { name: "brand", type: "VARCHAR(80)", key: "" },
                { name: "model", type: "VARCHAR(80)", key: "" },
                { name: "category", type: "ENUM(economy,sedan,suv,luxury)", key: "" },
                { name: "price_per_day", type: "DECIMAL(8,2)", key: "" },
                { name: "availability", type: "BOOLEAN DEFAULT TRUE", key: "" },
                { name: "image_url", type: "VARCHAR(255)", key: "" },
            ],
        },
        {
            icon: "📅",
            name: "Bookings",
            color: Colors.warn,
            fields: [
                { name: "id", type: "INT · AUTO_INCREMENT", key: "PK" },
                { name: "user_id", type: "INT NOT NULL", key: "FK→Users" },
                { name: "car_id", type: "INT NOT NULL", key: "FK→Cars" },
                { name: "start_date", type: "DATE NOT NULL", key: "" },
                { name: "end_date", type: "DATE NOT NULL", key: "" },
                { name: "total_price", type: "DECIMAL(10,2)", key: "" },
                { name: "status", type: "ENUM(pending,active,completed,cancelled)", key: "" },
                { name: "created_at", type: "DATETIME DEFAULT NOW", key: "" },
            ],
        },
        {
            icon: "💳",
            name: "Payments",
            color: Colors.danger,
            fields: [
                { name: "id", type: "INT · AUTO_INCREMENT", key: "PK" },
                { name: "booking_id", type: "INT NOT NULL", key: "FK→Bookings" },
                { name: "amount", type: "DECIMAL(10,2)", key: "" },
                { name: "method", type: "ENUM(stripe,paypal,cash)", key: "" },
                { name: "transaction_id", type: "VARCHAR(255)", key: "" },
                { name: "status", type: "ENUM(pending,success,failed)", key: "" },
                { name: "paid_at", type: "DATETIME", key: "" },
            ],
        },
        {
            icon: "🛡️",
            name: "Admins",
            color: "#A78BFA",
            fields: [
                { name: "id", type: "INT · AUTO_INCREMENT", key: "PK" },
                { name: "name", type: "VARCHAR(100)", key: "" },
                { name: "email", type: "VARCHAR(150) UNIQUE", key: "" },
                { name: "password_hash", type: "VARCHAR(255)", key: "" },
                { name: "role", type: "ENUM(super,manager,staff)", key: "" },
                { name: "last_login", type: "DATETIME", key: "" },
            ],
        },
        { icon: "🔗", name: "Relationships", color: Colors.green, isER: true },
    ];

    return (
        <div style={{ paddingTop: 70, minHeight: "100vh", background: Colors.black }}>
            <div
                style={{
                    padding: "60px 48px 40px",
                    background: Colors.charcoal,
                    borderBottom: `1px solid ${Colors.mid}`,
                }}
            >
                <SectionLabel>Database Design</SectionLabel>
                <h1
                    style={{
                        fontFamily: "'Syne',sans-serif",
                        fontSize: "clamp(36px,4vw,60px)",
                        fontWeight: 800,
                        letterSpacing: "-2px",
                        marginBottom: 8,
                    }}
                >
                    3NF Normalized Schema.
                </h1>
                <p
                    style={{
                        fontSize: 15,
                        color: Colors.muted,
                        maxWidth: 600,
                        fontWeight: 300,
                        lineHeight: 1.7,
                    }}
                >
                    A rigorously normalized MySQL relational database following Third Normal Form principles — zero redundancy,
                    enforced foreign key constraints, and cascade archive rules.
                </p>
                <div style={{ display: "flex", gap: 16, marginTop: 24, flexWrap: "wrap" }}>
                    {[
                        ["5", "Core Tables"],
                        ["3NF", "Normal Form"],
                        ["4", "FK Relations"],
                        ["MySQL", "Engine"],
                    ].map(([v, l]) => (
                        <div
                            key={l}
                            style={{
                                background: Colors.panel,
                                border: `1px solid ${Colors.mid}`,
                                borderRadius: 12,
                                padding: "12px 20px",
                                display: "flex",
                                alignItems: "center",
                                gap: 12,
                            }}
                        >
                            <span style={{ fontFamily: "'Syne',sans-serif", fontSize: 20, fontWeight: 800, color: Colors.green }}>
                                {v}
                            </span>
                            <span style={{ fontSize: 13, color: Colors.muted }}>{l}</span>
                        </div>
                    ))}
                </div>
            </div>

            <div style={{ padding: "40px 48px", display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 20 }}>
                {tables.map((t, i) => (
                    <RevealBox key={t.name} style={{ transitionDelay: `${i * 0.07}s` }}>
                        {t.isER ? (
                            <div
                                style={{
                                    background: Colors.charcoal,
                                    border: `1px solid rgba(37,211,102,.2)`,
                                    borderRadius: 16,
                                    overflow: "hidden",
                                    height: "100%",
                                }}
                            >
                                <div
                                    style={{
                                        background: "rgba(37,211,102,.06)",
                                        borderBottom: `1px solid ${Colors.mid}`,
                                        padding: "14px 18px",
                                        display: "flex",
                                        alignItems: "center",
                                        gap: 10,
                                    }}
                                >
                                    <span style={{ fontSize: 18 }}>🔗</span>
                                    <span
                                        style={{
                                            fontFamily: "'Syne',sans-serif",
                                            fontSize: 14,
                                            fontWeight: 700,
                                            color: Colors.green,
                                        }}
                                    >
                                        ER Relationships
                                    </span>
                                </div>
                                <div style={{ padding: "16px 18px" }}>
                                    {[
                                        { from: "User", to: "Bookings", type: "One → Many", note: "A user can have multiple bookings" },
                                        { from: "Car", to: "Bookings", type: "One → Many", note: "A car can appear in multiple bookings" },
                                        { from: "Booking", to: "Payment", type: "One → One", note: "Each booking has one payment record" },
                                        { from: "Admin", to: "System", type: "Independent", note: "Separate auth flow from Users" },
                                        { from: "Delete User", to: "Archive", type: "Cascade Rule", note: "Soft delete preserves booking history" },
                                    ].map((r) => (
                                        <div key={r.from} style={{ padding: "12px 0", borderBottom: `1px solid rgba(134,150,160,.08)` }}>
                                            <div style={{ fontSize: 13, fontWeight: 600, color: Colors.green, marginBottom: 3 }}>
                                                {r.from} → {r.to}
                                            </div>
                                            <div style={{ fontSize: 11, color: Colors.muted }}>
                                                {r.type} · {r.note}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ) : (
                            <div
                                style={{
                                    background: Colors.charcoal,
                                    border: `1px solid ${Colors.mid}`,
                                    borderRadius: 16,
                                    overflow: "hidden",
                                    transition: "border-color .3s",
                                }}
                                onMouseEnter={(e) => (e.currentTarget.style.borderColor = t.color + "40")}
                                onMouseLeave={(e) => (e.currentTarget.style.borderColor = Colors.mid)}
                            >
                                <div
                                    style={{
                                        background: `${t.color}0d`,
                                        borderBottom: `1px solid ${Colors.mid}`,
                                        padding: "14px 18px",
                                        display: "flex",
                                        alignItems: "center",
                                        gap: 10,
                                    }}
                                >
                                    <span style={{ fontSize: 18 }}>{t.icon}</span>
                                    <span style={{ fontFamily: "'Syne',sans-serif", fontSize: 14, fontWeight: 700, color: t.color }}>
                                        {t.name}
                                    </span>
                                    <span style={{ marginLeft: "auto", fontSize: 11, color: Colors.muted }}>{t.fields.length} fields</span>
                                </div>
                                <div style={{ padding: "14px 18px" }}>
                                    {t.fields.map((f) => (
                                        <div
                                            key={f.name}
                                            style={{
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "space-between",
                                                padding: "7px 0",
                                                borderBottom: `1px solid rgba(134,150,160,.06)`,
                                                fontSize: 12,
                                            }}
                                        >
                                            <span style={{ fontFamily: "monospace", color: "#fff", fontWeight: 500 }}>{f.name}</span>
                                            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                                                <span style={{ color: Colors.muted, fontSize: 11 }}>{f.type}</span>
                                                {f.key && (
                                                    <span
                                                        style={{
                                                            fontSize: 9,
                                                            fontWeight: 800,
                                                            padding: "2px 6px",
                                                            borderRadius: 4,
                                                            letterSpacing: "0.5px",
                                                            background: f.key.startsWith("FK") ? "rgba(17,138,178,.15)" : "rgba(37,211,102,.15)",
                                                            color: f.key.startsWith("FK") ? Colors.info : Colors.green,
                                                        }}
                                                    >
                                                        {f.key}
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </RevealBox>
                ))}
            </div>

            {/* Security section */}
            <div style={{ padding: "0 48px 80px" }}>
                <div
                    style={{
                        background: Colors.charcoal,
                        border: `1px solid ${Colors.mid}`,
                        borderRadius: 20,
                        padding: "40px",
                        display: "grid",
                        gridTemplateColumns: "1fr 1fr",
                        gap: 40,
                    }}
                >
                    <div>
                        <SectionLabel>Security Architecture</SectionLabel>
                        <h2
                            style={{
                                fontFamily: "'Syne',sans-serif",
                                fontSize: 32,
                                fontWeight: 800,
                                letterSpacing: "-1px",
                                marginBottom: 12,
                            }}
                        >
                            Security First.
                        </h2>
                        <p
                            style={{
                                fontSize: 14,
                                color: Colors.muted,
                                lineHeight: 1.75,
                                fontWeight: 300,
                            }}
                        >
                            Every layer of the stack is hardened. From JWT-secured sessions to parameterized SQL queries — security is
                            not an afterthought.
                        </p>
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                        {[
                            { icon: "🔑", name: "JWT Authentication", val: "HS256 · 24hr expiry" },
                            { icon: "🔒", name: "Password Hashing", val: "bcrypt · 12 salt rounds" },
                            { icon: "🚦", name: "RBAC Middleware", val: "User · Admin separation" },
                            { icon: "💉", name: "SQL Injection Guard", val: "Parameterized queries only" },
                            { icon: "🌐", name: "HTTPS / TLS", val: "All traffic encrypted at transport" },
                        ].map((l) => (
                            <div
                                key={l.name}
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 14,
                                    background: Colors.panel,
                                    border: `1px solid ${Colors.mid}`,
                                    borderRadius: 12,
                                    padding: "12px 16px",
                                }}
                            >
                                <span style={{ fontSize: 20 }}>{l.icon}</span>
                                <span style={{ fontSize: 13, fontWeight: 500 }}>{l.name}</span>
                                <span style={{ marginLeft: "auto", fontSize: 11, color: Colors.muted, fontFamily: "monospace" }}>
                                    {l.val}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};
