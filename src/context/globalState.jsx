import React from "react";
import GhibliContext from "./ghibliContext";

export default function GlobalState({ children }) {
    const [userLogin, setUserLogin] = React.useState(localStorage.getItem('userLogin'));

    function loginUser() {
        setUserLogin(true);
        localStorage.setItem('userLogin', true);
    }

    function logoutUser() {
        setUserLogin(false);
        localStorage.removeItem('userLogin');
    }

    return (
        <GhibliContext.Provider value={{ userLogin, loginUser, logoutUser }}>
            { children }
        </GhibliContext.Provider>
    )
    
}