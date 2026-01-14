import { useState, useEffect } from 'react';
import { auth, db } from '../services/firebase';
import { signInWithEmailAndPassword, onAuthStateChanged, signOut } from 'firebase/auth';
import { ref, onValue, off } from 'firebase/database';

export const useAdminConsole = () => {
    const [user, setUser] = useState(null);
    const [sessions, setSessions] = useState({});
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    // Auth Listener
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (u) => {
            setUser(u);
            setLoading(false);
        });
        return () => unsubscribe();
    }, []);

    // Database Listener (Only when authenticated)
    useEffect(() => {
        if (!user) {
            setSessions({});
            return;
        }

        const analyticsRef = ref(db, 'analytics/sessions');
        const listener = onValue(analyticsRef, (snapshot) => {
            setSessions(snapshot.exists() ? snapshot.val() : {});
        });

        return () => off(analyticsRef, 'value', listener);
    }, [user]);

    const login = async (email, password) => {
        try {
            setError(null);
            await signInWithEmailAndPassword(auth, email, password);
        } catch (err) {
            setError("Access Denied: " + err.message);
        }
    };

    const logout = async () => {
        try {
            await signOut(auth);
        } catch (e) {
            console.error(e);
        }
    };

    return {
        user,
        sessions,
        error,
        loading,
        login,
        logout
    };
};
