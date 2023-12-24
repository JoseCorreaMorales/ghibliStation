import React from "react";
import { ghibliContext } from "./ghibliContext";

export default function GlobalState(props) {
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
        <ghibliContext.Provider value={{ userLogin, loginUser, logoutUser }}>
            { children }
        </ghibliContext.Provider>
    )
    
}