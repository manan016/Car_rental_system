import { useState, useEffect } from "react";
import { Nav } from "./components/Nav";
import { Footer } from "./components/Footer";
import { HomePage } from "./pages/Home";
import { FleetPage } from "./pages/Fleet";
import { BookingPage } from "./pages/Booking";
import { AdminPage } from "./pages/Admin";
import { DatabasePage } from "./pages/Database";
import { AboutPage } from "./pages/About";
import { AuthPage } from "./pages/Auth";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { BookingProvider } from "./context/BookingContext";
import { globalStylesCSS } from "./constants/globalStyles";
import { Colors } from "./constants/designTokens";
import { injectGlobalStyles, scrollToTop } from "./utils/helpers";

/**
 * Root App Component
 * Main routing and state management with role-based auth guards
 */
function AppInner() {
    const { currentUser, loading } = useAuth();
    const [page, setPage] = useState("Home");
    const [bookingCar, setBookingCar] = useState(null);

    useEffect(() => {
        injectGlobalStyles(globalStylesCSS);
        scrollToTop();
    }, [page]);

    // Guard: redirect to Auth if not logged in and trying protected pages
    function navigateTo(target) {
        // Admin is strictly role-gated
        if (target === "Admin") {
            if (!currentUser) { setPage("Auth"); return; }
            if (currentUser.role !== "admin") return; // silently block non-admins
        }
        setPage(target);
    }

    const showFooter = !["Admin", "Auth"].includes(page);

    // Show loading shimmer while restoring session
    if (loading) {
        return (
            <div
                style={{
                    minHeight: "100vh", background: Colors.black,
                    display: "flex", alignItems: "center", justifyContent: "center",
                }}
            >
                <div
                    style={{
                        width: 40, height: 40, borderRadius: "50%",
                        border: "3px solid rgba(37,211,102,.2)",
                        borderTopColor: Colors.green,
                        animation: "authSpin .8s linear infinite",
                    }}
                />
                <style>{`@keyframes authSpin { to { transform: rotate(360deg); } }`}</style>
            </div>
        );
    }

    return (
        <div style={{ minHeight: "100vh", background: Colors.black }}>
            {/* Hide nav on auth page */}
            {page !== "Auth" && <Nav active={page} setPage={navigateTo} />}

            {page === "Home"     && <HomePage setPage={navigateTo} />}
            {page === "Fleet"    && <FleetPage setPage={navigateTo} setBookingCar={setBookingCar} />}
            {page === "Booking"  && <BookingPage bookingCar={bookingCar} setPage={navigateTo} />}
            {page === "Database" && <DatabasePage />}
            {page === "About"    && <AboutPage />}
            {page === "Auth"     && <AuthPage setPage={navigateTo} />}

            {/* Admin — strictly admin-only */}
            {page === "Admin" && currentUser?.role === "admin" && <AdminPage setPage={navigateTo} />}

            {/* Attempted admin access without privileges */}
            {page === "Admin" && currentUser?.role !== "admin" && (
                <AccessDenied setPage={navigateTo} />
            )}

            {showFooter && <Footer setPage={navigateTo} />}
        </div>
    );
}

/** Shown when a logged-in non-admin tries to reach /Admin directly */
function AccessDenied({ setPage }) {
    return (
        <div
            style={{
                minHeight: "100vh", background: Colors.black,
                display: "flex", flexDirection: "column",
                alignItems: "center", justifyContent: "center",
                textAlign: "center", padding: 24,
            }}
        >
            <div style={{ fontSize: 64, marginBottom: 20 }}>🛡</div>
            <h2
                style={{
                    fontFamily: "'Syne',sans-serif", fontSize: 28,
                    fontWeight: 800, color: "#fff", marginBottom: 12,
                }}
            >
                Access Restricted
            </h2>
            <p style={{ color: Colors.muted, fontSize: 15, maxWidth: 360, marginBottom: 28 }}>
                You don't have permission to access the Admin Panel.
                This area is reserved for administrators only.
            </p>
            <button
                onClick={() => setPage("Home")}
                style={{
                    background: Colors.green, color: Colors.black,
                    border: "none", borderRadius: 12,
                    padding: "12px 28px", fontSize: 14, fontWeight: 700,
                    fontFamily: "'DM Sans',sans-serif",
                    cursor: "pointer",
                    boxShadow: "0 8px 24px rgba(37,211,102,.3)",
                }}
            >
                Return to Home
            </button>
        </div>
    );
}

export default function App() {
    return (
        <AuthProvider>
            <BookingProvider>
                <AppInner />
            </BookingProvider>
        </AuthProvider>
    );
}
