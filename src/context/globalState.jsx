import React from "react";
import GhibliContext from "./ghibliContext";

export default function GlobalState({ children }) {
    const [userLogin, setUserLogin] = React.useState(localStorage.getItem('login'));

    function loginUser() {
        setUserLogin(true);
        localStorage.setItem('login', true);
    }

    function logoutUser() {
        setUserLogin(false);
        localStorage.removeItem('login');
    }

    return (
        <GhibliContext.Provider value={{userLogin, loginUser, logoutUser }}>
            { children }
        </GhibliContext.Provider>
    )
    
}