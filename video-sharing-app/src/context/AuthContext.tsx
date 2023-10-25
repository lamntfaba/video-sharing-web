'use client';
import { auth } from "@/utils/firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import { useState, useEffect, useReducer, createContext, ReactNode } from "react";

interface Props {
    children?: ReactNode;
}

interface State {
    user: any;
    loading: boolean;
}

const initialState = {
    user: {},
};
const Context = createContext<State>({
    user: initialState.user,
    loading: false
});

const Provider = ({ children, ...props }: Props) => {
    const [user, setUser] = useState<any>(initialState.user);
    const [loading, setLoading] = useState<boolean>(false);
    useEffect(() => {
        setLoading(true);
        onAuthStateChanged(auth, (user) => {
            setLoading(false);
            if (user) {
                setUser(user);
            } else {
                // User is signed out
            }
        });
    }, []);

    return <Context.Provider value={{ user, loading }}>{children}</Context.Provider>;
};

export { Context, Provider };