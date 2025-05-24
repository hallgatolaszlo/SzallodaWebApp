import {createContext, useState, useContext, useEffect} from "react";

const LoginContext = createContext(null);

// eslint-disable-next-line react-refresh/only-export-components
export const useLoginContext = () => useContext(LoginContext);

export const LoginContextProvider = ({children}) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [role, setRole] = useState(null);

    useEffect(() => {
        const accountData = sessionStorage.getItem("accountData");
        if (accountData) {
            setIsLoggedIn(true);
            setRole(accountData.role);
        }
    }, []);

    const login = (data) => {
        sessionStorage.setItem("accountData", JSON.stringify(data));
        setIsLoggedIn(true);
        setRole(data.role);
    };

    const logout = () => {
        sessionStorage.removeItem("accountData");
        setIsLoggedIn(false);
        setRole(null);
    };


    const value = {isLoggedIn, setIsLoggedIn, role, setRole, login, logout};

    return (
        <LoginContext.Provider value={value}>
            {children}
        </LoginContext.Provider>
    );
};