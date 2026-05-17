import { createContext, useContext, useState, useEffect } from "react";
import apiClient from "../api/axios";

/**
 * AuthContext
 * Provides real authentication using JWTs and Axios.
 */
const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Initial load: Fetch me if token exists
    useEffect(() => {
        const loadUser = async () => {
            const token = localStorage.getItem("crms_token");
            if (token) {
                try {
                    const res = await apiClient.get("/auth/me");
                    if (res.success) {
                        setCurrentUser({
                            ...res.user,
                            avatar: res.user.name.charAt(0).toUpperCase()
                        });
                    }
                } catch (error) {
                    console.error("Session restoration failed:", error);
                    localStorage.removeItem("crms_token");
                }
            }
            setLoading(false);
        };
        loadUser();
    }, []);

    /** Register a new user account */
    async function signup({ name, email, password }) {
        try {
            const res = await apiClient.post("/auth/register", { name, email, password });
            if (res.success) {
                localStorage.setItem("crms_token", res.token);
                setCurrentUser({
                    ...res.user,
                    avatar: res.user.name.charAt(0).toUpperCase()
                });
                return { ok: true };
            }
            return { ok: false, error: "Registration failed." };
        } catch (error) {
            console.error("Signup error:", error);
            const msg = error.message || (typeof error === 'string' ? error : "Registration failed.");
            return { ok: false, error: msg };
        }
    }

    /** Login */
    async function login({ email, password }) {
        try {
            const res = await apiClient.post("/auth/login", { email, password });
            if (res.success) {
                localStorage.setItem("crms_token", res.token);
                setCurrentUser({
                    ...res.user,
                    avatar: res.user.name.charAt(0).toUpperCase()
                });
                return { ok: true, role: res.user.role };
            }
            return { ok: false, error: "Invalid credentials." };
        } catch (error) {
            console.error("Login error:", error);
            const msg = error.message || (typeof error === 'string' ? error : "Invalid credentials.");
            return { ok: false, error: msg };
        }
    }

    /** Logout */
    function logout() {
        setCurrentUser(null);
        localStorage.removeItem("crms_token");
    }

    return (
        <AuthContext.Provider value={{ currentUser, loading, login, logout, signup }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}
