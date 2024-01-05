import { useState } from "react";
import GhibliContext from "./ghibliContext";

export default function GlobalState({ children }) {
    const [userLogin, setUserLogin] = useState(sessionStorage.getItem('login'));

    function loginUser() {
        setUserLogin(true);
        sessionStorage.setItem('login', true);
    }

    function logoutUser() {
        setUserLogin(false);
        sessionStorage.removeItem('login');
    }

    return (
        <GhibliContext.Provider value={{userLogin, loginUser, logoutUser }}>
            { children }
        </GhibliContext.Provider>
    )
    
}