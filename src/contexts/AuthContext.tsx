import React, { useContext, useState, useEffect, ReactNode } from "react";
import { auth, GoogleProvider } from "../config/firebase";
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    sendPasswordResetEmail,
    signInWithPopup
} from "firebase/auth";

type Email = string;
type Password = string;

interface AuthContextType {
    currentUser: any;
    login: (email: Email, password: Password) => Promise<any>;
    signup: (email: Email, password: Password) => Promise<any>;
    signInWithGoogle: () => Promise<any>;
    logout: () => Promise<any>;
    resetPassword: (email: Email) => Promise<any>;
    updateEmail: (email: Email) => Promise<any>;
    updatePassword: (password: Password) => Promise<any>;
}

const AuthContext = React.createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}

interface AuthProviderProps {
    children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {

    const [currentUser, setCurrentUser] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    function signup(email: Email, password: Password): Promise<any> {
        return createUserWithEmailAndPassword(auth, email, password);
    }

    function login(email: Email, password: Password): Promise<any> {
        return signInWithEmailAndPassword(auth, email, password);
    }

    function signInWithGoogle(): Promise<any>{
        return signInWithPopup(auth, GoogleProvider)
    }

    function logout(): Promise<any> {
        return auth.signOut();
    }

    function resetPassword(email: Email): Promise<any> {
        return sendPasswordResetEmail(auth, email);
    }

    function updateEmail(email: Email): Promise<any> {
        if (currentUser) {
            return currentUser.updateEmail(email);
        }
        return Promise.reject(new Error("No user is logged in."));
    }
    async function updatePassword(password: Password): Promise<any> {
        if (currentUser) {
            try {
                await updatePassword(password);
            } catch (error) {
                console.error(error);
                throw new Error((error as Error).message);
            }
        }
        return Promise.reject(new Error("No user is logged in."));
    }

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            setCurrentUser(user);
            setLoading(false);
        });

        return unsubscribe;
    }, []);

    const value: AuthContextType = {
        currentUser,
        login,
        signup,
        signInWithGoogle,
        logout,
        resetPassword,
        updateEmail,
        updatePassword,
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading ? children : null}
        </AuthContext.Provider>
    );
}
