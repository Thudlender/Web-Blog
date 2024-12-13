import { useState, useContext, createContext, useEffect, Children } from "react";
import AuthService from "../../service/auth.service";
import { Cookies } from "react-cookies";

const cookies = new Cookies();

const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(getUser);

    const login = (user) => setUser(user);

    const logout = () => {
        AuthService.logout();
        setUser(null);
    };

    function getUser() {
        const savedUser = cookies.get("user") || null;
        return savedUser;
    }

    useEffect(() => {
        cookies.set("user", user, {
            path: "/",
            expires: new Date(Date.now() + 86400),
        });
    }, [user]);

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuthContext = () => useContext(AuthContext);
