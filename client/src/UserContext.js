import React, {createContext, useContext, useState} from "react";
import Cookies from "js-cookie";
import {jwtDecode }from "jwt-decode";

export const UserContext = createContext();

export const UserProvider = ({children}) => {
    const [jwt, setJwt] = useState(Cookies.get("jwt"));
    async function Login(token) {
        Cookies.set("jwt", token);
        setJwt(token)
    }

    async function Logout() {
        Cookies.remove('jwt')
        setJwt(null)
    }

    const getRoles = () => {
        if (jwt) {
            const decodedJwt = jwtDecode(jwt);
            return decodedJwt["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/authentication"]
        } else {
            return [];
        }
    }
    const getEmail = () => {
        if (jwt) {
            const decodedJwt = jwtDecode(jwt);
            return decodedJwt["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"]
        } else {
            return "";
        }
    }
    const value = {jwt, setJwt, Login, Logout, getRoles,getEmail};

    return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}

export function useUser() {
    const context = useContext(UserContext);
    if (context === undefined) {
        throw new Error('useUser must be used within a UserProvider');
    }
    return context;
}