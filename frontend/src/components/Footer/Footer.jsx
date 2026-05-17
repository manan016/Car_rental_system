import { Colors } from "../../constants/designTokens";

/**
 * Footer Component
 * Site footer with navigation links and copyright
 */
export const Footer = ({ setPage }) => {
    return (
        <footer
            style={{
                background: Colors.black,
                borderTop: `1px solid rgba(134,150,160,.1)`,
                padding: "60px 48px 32px",
            }}
        >
            <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: 48, marginBottom: 48 }}>
                {/* Brand section */}
                <div>
                    <div style={{ fontFamily: "'Syne',sans-serif", fontSize: 22, fontWeight: 800, marginBottom: 12 }}>
                        VELOCE
                    </div>
                    <p
                        style={{
                            fontSize: 13,
                            color: Colors.muted,
                            lineHeight: 1.75,
                            fontWeight: 300,
                            maxWidth: 280,
                            marginBottom: 20,
                        }}
                    >
                        Car Rental Management System — a full-stack DBMS project demonstrating real-world application of normalized
                        relational databases and modern web architecture.
                    </p>
                    <div style={{ display: "flex", gap: 10 }}>
                        {["🐙", "💼", "📧"].map((s, i) => (
                            <div
                                key={i}
                                style={{
                                    width: 36,
                                    height: 36,
                                    border: `1px solid ${Colors.mid}`,
                                    borderRadius: 9,
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    fontSize: 16,
                                    cursor: "pointer",
                                    background: Colors.charcoal,
                                    transition: "all .2s",
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.borderColor = Colors.green;
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.borderColor = Colors.mid;
                                }}
                            >
                                {s}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Links columns */}
                {[
                    { title: "Platform", links: ["Fleet", "Booking", "Admin", "Home"] },
                    { title: "Technical", links: ["Database", "About"] },
                    { title: "Project", links: ["About"] },
                ].map((col) => (
                    <div key={col.title}>
                        <h4
                            style={{
                                fontFamily: "'Syne',sans-serif",
                                fontSize: 13,
                                fontWeight: 700,
                                marginBottom: 18,
                                letterSpacing: "0.5px",
                            }}
                        >
                            {col.title}
                        </h4>
                        <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 10 }}>
                            {col.links.map((l) => (
                                <li key={l}>
                                    <button
                                        onClick={() => setPage(l)}
                                        style={{
                                            background: "none",
                                            border: "none",
                                            cursor: "pointer",
                                            fontSize: 13,
                                            color: Colors.muted,
                                            fontFamily: "'DM Sans',sans-serif",
                                            fontWeight: 300,
                                            transition: "color .2s",
                                            padding: 0,
                                        }}
                                        onMouseEnter={(e) => (e.target.style.color = "#fff")}
                                        onMouseLeave={(e) => (e.target.style.color = Colors.muted)}
                                    >
                                        {l}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>

            {/* Copyright */}
            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    paddingTop: 28,
                    borderTop: `1px solid rgba(134,150,160,.1)`,
                    fontSize: 12,
                }}
            >
                <span style={{ color: Colors.muted }}>© 2026 VELOCE CRMS. All rights reserved.</span>
                <span style={{ color: Colors.muted }}>
                    Submitted to <strong style={{ color: Colors.green }}>Dr. Amanullah</strong> · DBMS · Bahria University,
                    Islamabad
                </span>
            </div>
        </footer>
    );
};
