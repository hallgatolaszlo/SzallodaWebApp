import {createContext, useState, useContext, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {useLocationContext} from "./LocationContext.jsx";

const LoginContext = createContext(null);

// eslint-disable-next-line react-refresh/only-export-components
export const useLoginContext = () => useContext(LoginContext);

export const LoginContextProvider = ({children}) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [role, setRole] = useState(null);
    const [userAccountId, setUserAccountId] = useState(null);
    const navigate = useNavigate();
    const locationContext = useLocationContext();

    useEffect(() => {
        const accountData = JSON.parse(sessionStorage.getItem("accountData"));
        if (accountData) {
            setIsLoggedIn(true);
            setRole(accountData.role);
            setUserAccountId(accountData.accountId);
        }
    }, [isLoggedIn]);

    const login = (data) => {
        sessionStorage.setItem("accountData", JSON.stringify(data));
        setIsLoggedIn(true);
        setRole(data.role);
        navigate(locationContext || "/");
    };

    const logout = () => {
        sessionStorage.removeItem("accountData");
        setIsLoggedIn(false);
        setRole(null);
    };


    const value = {userAccountId, isLoggedIn, setIsLoggedIn, role, setRole, login, logout};

    return (
        <LoginContext.Provider value={value}>
            {children}
        </LoginContext.Provider>
    );
};