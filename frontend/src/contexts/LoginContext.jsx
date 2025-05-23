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

    useEffect(() => {
        console.log(isLoggedIn);
    }, [isLoggedIn]);

    const value = {isLoggedIn, setIsLoggedIn, role, setRole};

    return (
        <LoginContext.Provider value={value}>
            {children}
        </LoginContext.Provider>
    );
};