import { createContext, useEffect, useState } from "react";
import api from "../api/axios.js";

export const AuthContext = createContext(null);

const STORAGE_KEY = "citracker_user";


export function AuthProvider({ children }) {
    
    const [user, setUser] = useState(() => {
        const stored = localStorage.getItem(STORAGE_KEY);
        return stored ? JSON.parse(stored) : null;
    });

    // Whenever `user` changes (login, register, logout), mirror it into
    // localStorage so the NEXT page load can restore it the same way.
    useEffect(() => {
        if (user) localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
        else localStorage.removeItem(STORAGE_KEY);
    }, [user]);

    async function login(username, password) {
        try {
            const res = await api.post("/auth/login", { username, password });
            setUser(res.data); // { id, username, role } — never a password, hashed or not
            return { success: true };
        } catch (err) {
            return { success: false, message: err.response?.data?.message || "Something went wrong. Please try again." };
        }
    }

    async function register(formData) {
        try {
            const res = await api.post("/auth/register", formData);
            setUser(res.data);
            return { success: true };
        } catch (err) {
            return { success: false, message: err.response?.data?.message || "Something went wrong. Please try again." };
        }
    }

    function logout() {
        setUser(null); // the effect above clears localStorage as a side effect of this
    }

    return (
        <AuthContext.Provider value={{ user, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );


}