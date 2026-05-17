import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { Colors, FontFamily } from "../../constants/designTokens";

/**
 * AuthPage – Professional login & signup portal
 * Features: tab switching, form validation, password strength,
 * animated background grid, role-based redirect on login.
 */
export const AuthPage = ({ setPage }) => {
    const { login, signup } = useAuth();
    const [mode, setMode] = useState("login"); // "login" | "signup"
    const [form, setForm] = useState({ name: "", email: "", password: "", confirm: "" });
    const [errors, setErrors] = useState({});
    const [serverError, setServerError] = useState("");
    const [loading, setLoading] = useState(false);
    const [showPass, setShowPass] = useState(false);
    const [passStrength, setPassStrength] = useState(0);
    const [mounted, setMounted] = useState(false);

    useEffect(() => { setMounted(true); }, []);

    // Inject page-specific CSS
    useEffect(() => {
        const id = "auth-page-css";
        if (document.getElementById(id)) return;
        const s = document.createElement("style");
        s.id = id;
        s.textContent = AUTH_CSS;
        document.head.appendChild(s);
    }, []);

    function onChange(e) {
        const { name, value } = e.target;
        setForm((f) => ({ ...f, [name]: value }));
        if (errors[name]) setErrors((er) => ({ ...er, [name]: "" }));
        setServerError("");
        if (name === "password") setPassStrength(calcStrength(value));
    }

    function calcStrength(p) {
        let s = 0;
        if (p.length >= 8) s++;
        if (/[A-Z]/.test(p)) s++;
        if (/[0-9]/.test(p)) s++;
        if (/[^A-Za-z0-9]/.test(p)) s++;
        return s;
    }

    function validate() {
        const e = {};
        if (mode === "signup" && !form.name.trim()) e.name = "Full name is required.";
        if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
            e.email = "Enter a valid email address.";
        if (form.password.length < 6) e.password = "Password must be at least 6 characters.";
        if (mode === "signup" && form.password !== form.confirm) e.confirm = "Passwords do not match.";
        return e;
    }

    async function handleSubmit(e) {
        e.preventDefault();
        const errs = validate();
        if (Object.keys(errs).length) { setErrors(errs); return; }

        setLoading(true);
        // Simulate async delay for professional feel
        await new Promise((r) => setTimeout(r, 700));

        if (mode === "login") {
            const res = await login({ email: form.email, password: form.password });
            if (!res.ok) { setServerError(res.error); setLoading(false); return; }
            // Redirect based on role
            setPage(res.role === "admin" ? "Admin" : "Home");
        } else {
            const res = await signup({ name: form.name, email: form.email, password: form.password });
            if (!res.ok) { setServerError(res.error); setLoading(false); return; }
            setPage("Home");
        }
        setLoading(false);
    }

    function switchMode(m) {
        setMode(m);
        setForm({ name: "", email: "", password: "", confirm: "" });
        setErrors({});
        setServerError("");
        setPassStrength(0);
    }

    const strengthLabels = ["", "Weak", "Fair", "Strong", "Excellent"];
    const strengthColors = ["", Colors.danger, Colors.warn, "#60D394", Colors.green];

    return (
        <div className="auth-root">
            {/* Animated background */}
            <div className="auth-bg">
                <div className="auth-orb auth-orb-1" />
                <div className="auth-orb auth-orb-2" />
                <div className="auth-grid" />
            </div>

            {/* Card */}
            <div className={`auth-card ${mounted ? "auth-card--in" : ""}`}>
                {/* Brand */}
                <div className="auth-brand" onClick={() => setPage("Home")}>
                    <div className="auth-logo-icon">V</div>
                    <span className="auth-logo-text">VELOCE</span>
                </div>

                {/* Headline */}
                <div className="auth-head">
                    <h1 className="auth-title">
                        {mode === "login" ? "Welcome back" : "Create account"}
                    </h1>
                    <p className="auth-sub">
                        {mode === "login"
                            ? "Sign in to manage your rentals"
                            : "Join 1,284+ customers renting with VELOCE"}
                    </p>
                </div>

                {/* Mode switcher */}
                <div className="auth-tabs">
                    <button
                        className={`auth-tab ${mode === "login" ? "auth-tab--active" : ""}`}
                        onClick={() => switchMode("login")}
                    >
                        Sign In
                    </button>
                    <button
                        className={`auth-tab ${mode === "signup" ? "auth-tab--active" : ""}`}
                        onClick={() => switchMode("signup")}
                    >
                        Register
                    </button>
                    <div className={`auth-tab-indicator ${mode === "signup" ? "auth-tab-indicator--right" : ""}`} />
                </div>

                {/* Server error */}
                {serverError && (
                    <div className="auth-server-error">
                        <span className="auth-error-icon">⚠</span>
                        {serverError}
                    </div>
                )}

                {/* Form */}
                <form className="auth-form" onSubmit={handleSubmit} noValidate>
                    {mode === "signup" && (
                        <div className="auth-field">
                            <label className="auth-label">Full Name</label>
                            <div className="auth-input-wrap">
                                <span className="auth-input-icon">👤</span>
                                <input
                                    type="text"
                                    name="name"
                                    value={form.name}
                                    onChange={onChange}
                                    placeholder="e.g. Ahmed Khan"
                                    className={`auth-input ${errors.name ? "auth-input--err" : ""}`}
                                    autoComplete="name"
                                />
                            </div>
                            {errors.name && <span className="auth-field-err">{errors.name}</span>}
                        </div>
                    )}

                    <div className="auth-field">
                        <label className="auth-label">Email Address</label>
                        <div className="auth-input-wrap">
                            <span className="auth-input-icon">✉</span>
                            <input
                                type="email"
                                name="email"
                                value={form.email}
                                onChange={onChange}
                                placeholder="you@example.com"
                                className={`auth-input ${errors.email ? "auth-input--err" : ""}`}
                                autoComplete="email"
                            />
                        </div>
                        {errors.email && <span className="auth-field-err">{errors.email}</span>}
                    </div>

                    <div className="auth-field">
                        <label className="auth-label">Password</label>
                        <div className="auth-input-wrap">
                            <span className="auth-input-icon">🔒</span>
                            <input
                                type={showPass ? "text" : "password"}
                                name="password"
                                value={form.password}
                                onChange={onChange}
                                placeholder={mode === "login" ? "Enter your password" : "Min. 6 characters"}
                                className={`auth-input auth-input--pass ${errors.password ? "auth-input--err" : ""}`}
                                autoComplete={mode === "login" ? "current-password" : "new-password"}
                            />
                            <button
                                type="button"
                                className="auth-eye"
                                onClick={() => setShowPass((s) => !s)}
                            >
                                {showPass ? "🙈" : "👁"}
                            </button>
                        </div>
                        {errors.password && <span className="auth-field-err">{errors.password}</span>}

                        {/* Password strength bar — only on signup */}
                        {mode === "signup" && form.password.length > 0 && (
                            <div className="auth-strength">
                                <div className="auth-strength-bars">
                                    {[1, 2, 3, 4].map((i) => (
                                        <div
                                            key={i}
                                            className="auth-strength-bar"
                                            style={{
                                                background: passStrength >= i ? strengthColors[passStrength] : "rgba(134,150,160,.2)",
                                                transition: "background .3s",
                                            }}
                                        />
                                    ))}
                                </div>
                                <span
                                    className="auth-strength-label"
                                    style={{ color: strengthColors[passStrength] }}
                                >
                                    {strengthLabels[passStrength]}
                                </span>
                            </div>
                        )}
                    </div>

                    {mode === "signup" && (
                        <div className="auth-field">
                            <label className="auth-label">Confirm Password</label>
                            <div className="auth-input-wrap">
                                <span className="auth-input-icon">🔒</span>
                                <input
                                    type={showPass ? "text" : "password"}
                                    name="confirm"
                                    value={form.confirm}
                                    onChange={onChange}
                                    placeholder="Re-enter your password"
                                    className={`auth-input auth-input--pass ${errors.confirm ? "auth-input--err" : ""}`}
                                    autoComplete="new-password"
                                />
                            </div>
                            {errors.confirm && <span className="auth-field-err">{errors.confirm}</span>}
                        </div>
                    )}

                    {mode === "login" && (
                        <div className="auth-row-meta">
                            <span className="auth-forgot">Forgot password?</span>
                        </div>
                    )}

                    <button
                        type="submit"
                        className="auth-submit"
                        disabled={loading}
                    >
                        {loading ? (
                            <span className="auth-spinner" />
                        ) : (
                            mode === "login" ? "Sign In →" : "Create Account →"
                        )}
                    </button>
                </form>

                {/* Admin hint */}
                {mode === "login" && (
                    <div className="auth-hint">
                        <span className="auth-hint-icon">🔐</span>
                        Admin access requires a privileged account
                    </div>
                )}

                {/* Footer */}
                <p className="auth-footer-text">
                    {mode === "login" ? "Don't have an account? " : "Already have an account? "}
                    <button
                        className="auth-link"
                        onClick={() => switchMode(mode === "login" ? "signup" : "login")}
                    >
                        {mode === "login" ? "Register now" : "Sign in"}
                    </button>
                </p>
            </div>
        </div>
    );
};

/* ─── Scoped CSS ─────────────────────────────────────────────────────────── */
const AUTH_CSS = `
.auth-root {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #111B21;
    position: relative;
    overflow: hidden;
    padding: 24px 16px;
}

/* Animated background */
.auth-bg { position: fixed; inset: 0; pointer-events: none; z-index: 0; }

.auth-orb {
    position: absolute;
    border-radius: 50%;
    filter: blur(80px);
    opacity: .18;
    animation: authOrbFloat 8s ease-in-out infinite;
}
.auth-orb-1 {
    width: 500px; height: 500px;
    background: radial-gradient(circle, #25D366, #128C7E);
    top: -150px; left: -150px;
    animation-delay: 0s;
}
.auth-orb-2 {
    width: 400px; height: 400px;
    background: radial-gradient(circle, #118AB2, #075E54);
    bottom: -120px; right: -100px;
    animation-delay: -4s;
}
.auth-grid {
    position: absolute; inset: 0;
    background-image:
        linear-gradient(rgba(37,211,102,.04) 1px, transparent 1px),
        linear-gradient(90deg, rgba(37,211,102,.04) 1px, transparent 1px);
    background-size: 48px 48px;
}

@keyframes authOrbFloat {
    0%, 100% { transform: translate(0, 0) scale(1); }
    33% { transform: translate(30px, -20px) scale(1.05); }
    66% { transform: translate(-20px, 15px) scale(.97); }
}

/* Card */
.auth-card {
    position: relative; z-index: 10;
    width: 100%; max-width: 480px;
    background: rgba(28, 43, 51, 0.85);
    border: 1px solid rgba(37, 211, 102, 0.1);
    border-radius: 24px;
    padding: 40px 44px;
    backdrop-filter: blur(24px);
    box-shadow:
        0 40px 80px rgba(0,0,0,.5),
        0 0 0 1px rgba(37,211,102,.06),
        inset 0 1px 0 rgba(255,255,255,.04);
    opacity: 0;
    transform: translateY(28px);
    transition: opacity .55s ease, transform .55s ease;
}
.auth-card--in { opacity: 1; transform: translateY(0); }

@media (max-width: 520px) {
    .auth-card { padding: 32px 24px; border-radius: 20px; }
}

/* Brand */
.auth-brand {
    display: flex; align-items: center; gap: 10px;
    cursor: pointer; margin-bottom: 28px;
    width: fit-content;
}
.auth-logo-icon {
    width: 38px; height: 38px; border-radius: 11px;
    background: linear-gradient(135deg, #25D366, #128C7E);
    display: flex; align-items: center; justify-content: center;
    font-family: 'Syne', sans-serif;
    font-size: 19px; font-weight: 800; color: #111B21;
    box-shadow: 0 4px 16px rgba(37,211,102,.35);
}
.auth-logo-text {
    font-family: 'Syne', sans-serif;
    font-size: 22px; font-weight: 800;
    color: #fff; letter-spacing: -0.5px;
}

/* Headline */
.auth-head { margin-bottom: 26px; }
.auth-title {
    font-family: 'Syne', sans-serif;
    font-size: 26px; font-weight: 800;
    color: #fff; letter-spacing: -0.5px;
    margin-bottom: 6px;
}
.auth-sub { font-size: 14px; color: #8696A0; }

/* Tabs */
.auth-tabs {
    display: grid; grid-template-columns: 1fr 1fr;
    background: rgba(17,27,33,.7);
    border: 1px solid rgba(42,57,66,.8);
    border-radius: 12px; padding: 4px;
    margin-bottom: 26px; position: relative;
}
.auth-tab {
    position: relative; z-index: 2;
    padding: 9px; border: none; background: transparent;
    font-family: 'DM Sans', sans-serif;
    font-size: 14px; font-weight: 600;
    color: #8696A0; cursor: pointer;
    border-radius: 9px;
    transition: color .25s;
}
.auth-tab--active { color: #fff; }
.auth-tab-indicator {
    position: absolute;
    top: 4px; bottom: 4px; left: 4px;
    width: calc(50% - 4px);
    background: linear-gradient(135deg, rgba(37,211,102,.15), rgba(18,140,126,.1));
    border: 1px solid rgba(37,211,102,.2);
    border-radius: 9px;
    transition: transform .3s cubic-bezier(.4,0,.2,1);
    z-index: 1;
}
.auth-tab-indicator--right { transform: translateX(calc(100% + 4px)); }

/* Server error */
.auth-server-error {
    display: flex; align-items: center; gap: 8px;
    background: rgba(239,71,111,.1);
    border: 1px solid rgba(239,71,111,.25);
    border-radius: 10px;
    padding: 11px 14px;
    margin-bottom: 18px;
    font-size: 13px; color: #EF476F;
    animation: authShake .4s ease;
}
.auth-error-icon { font-size: 16px; }
@keyframes authShake {
    0%,100%{transform:translateX(0)}
    20%{transform:translateX(-6px)}
    40%{transform:translateX(6px)}
    60%{transform:translateX(-4px)}
    80%{transform:translateX(4px)}
}

/* Form */
.auth-form { display: flex; flex-direction: column; gap: 18px; }

.auth-field { display: flex; flex-direction: column; gap: 7px; }

.auth-label {
    font-size: 12px; font-weight: 700;
    color: #8696A0; text-transform: uppercase;
    letter-spacing: .6px;
}

.auth-input-wrap { position: relative; }

.auth-input-icon {
    position: absolute; left: 13px; top: 50%;
    transform: translateY(-50%);
    font-size: 16px; pointer-events: none;
    z-index: 1;
}

.auth-input {
    width: 100%; padding: 13px 14px 13px 40px;
    background: rgba(17,27,33,.8);
    border: 1px solid rgba(42,57,66,.9);
    border-radius: 12px;
    font-size: 14px; color: #fff;
    font-family: 'DM Sans', sans-serif;
    outline: none;
    transition: border-color .25s, box-shadow .25s;
}
.auth-input--pass { padding-right: 44px; }
.auth-input:focus {
    border-color: rgba(37,211,102,.5);
    box-shadow: 0 0 0 3px rgba(37,211,102,.08);
}
.auth-input--err { border-color: rgba(239,71,111,.5) !important; }
.auth-input::placeholder { color: rgba(134,150,160,.6); }

.auth-eye {
    position: absolute; right: 12px; top: 50%;
    transform: translateY(-50%);
    background: none; border: none; cursor: pointer;
    font-size: 17px; padding: 2px;
    opacity: .6; transition: opacity .2s;
}
.auth-eye:hover { opacity: 1; }

.auth-field-err { font-size: 12px; color: #EF476F; padding-left: 2px; }

/* Password strength */
.auth-strength {
    display: flex; align-items: center; gap: 8px; margin-top: 4px;
}
.auth-strength-bars { display: flex; gap: 5px; flex: 1; }
.auth-strength-bar { flex: 1; height: 3px; border-radius: 2px; }
.auth-strength-label { font-size: 11px; font-weight: 700; white-space: nowrap; }

/* Row meta */
.auth-row-meta { display: flex; justify-content: flex-end; margin-top: -6px; }
.auth-forgot {
    font-size: 13px; color: #25D366;
    cursor: pointer; transition: opacity .2s;
}
.auth-forgot:hover { opacity: .75; }

/* Submit button */
.auth-submit {
    width: 100%; padding: 15px;
    background: linear-gradient(135deg, #25D366, #128C7E);
    border: none; border-radius: 12px;
    color: #111B21; font-family: 'Syne', sans-serif;
    font-size: 15px; font-weight: 800;
    cursor: pointer; margin-top: 4px;
    box-shadow: 0 8px 24px rgba(37,211,102,.3);
    display: flex; align-items: center; justify-content: center;
    gap: 8px; min-height: 52px;
    transition: transform .2s, box-shadow .2s, opacity .2s;
}
.auth-submit:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 12px 32px rgba(37,211,102,.4);
}
.auth-submit:active:not(:disabled) { transform: translateY(0); }
.auth-submit:disabled { opacity: .7; cursor: not-allowed; }

/* Spinner */
.auth-spinner {
    width: 20px; height: 20px;
    border: 3px solid rgba(17,27,33,.3);
    border-top-color: #111B21;
    border-radius: 50%;
    animation: authSpin .7s linear infinite;
}
@keyframes authSpin { to { transform: rotate(360deg); } }

/* Admin hint */
.auth-hint {
    display: flex; align-items: center; justify-content: center; gap: 7px;
    margin-top: 18px; padding: 10px 14px;
    background: rgba(17,138,178,.08);
    border: 1px solid rgba(17,138,178,.18);
    border-radius: 10px;
    font-size: 12px; color: #118AB2;
}
.auth-hint-icon { font-size: 14px; }

/* Footer text */
.auth-footer-text {
    text-align: center; margin-top: 20px;
    font-size: 13px; color: #8696A0;
}
.auth-link {
    background: none; border: none; cursor: pointer;
    color: #25D366; font-size: 13px; font-weight: 600;
    text-decoration: underline; text-underline-offset: 3px;
    transition: opacity .2s;
}
.auth-link:hover { opacity: .8; }
`;
