import {createContext, useContext, useEffect, useRef} from "react";
import {useLocation} from "react-router-dom";

const LocationContext = createContext(null);

export const useLocationContext = () => useContext(LocationContext);

export const LocationContextProvider = ({children}) => {
    const location = useLocation();
    const previousPathRef = useRef(null);

    useEffect(() => {
        const currentPath = location.pathname;
        if (!'/login'.includes(currentPath) && previousPathRef.current !== currentPath && !'/register'.includes(currentPath)) {
            previousPathRef.current = currentPath;
        }
    }, [location]);


    return (
        <LocationContext.Provider value={previousPathRef.current}>
            {children}
        </LocationContext.Provider>);
};