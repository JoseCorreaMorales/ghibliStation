import { useState } from "react";
import GhibliContext from "./ghibliContext";

export default function GlobalState({ children }) {
    const [userLogin, setUserLogin] = useState(sessionStorage.getItem('login'));
    //const [userLogin, setUserLogin] = useState(JSON.parse(sessionStorage.getItem('user')) || null);
    //const [isLogin, setIsLogin] = useState(sessionStorage.getItem('login'));
    const [userCredentials, setUserCredentials] = useState(JSON.parse(sessionStorage.getItem('credentials')));

    function loginUser(credentials) {
        setUserLogin(true);
        sessionStorage.setItem('login', true);
        //setIsLogin(true);
        //sessionStorage.setItem('user', JSON.stringify(user));
       // sessionStorage.setItem('login', true);
        setUserCredentials(credentials);
        sessionStorage.setItem('credentials', JSON.stringify(credentials));
    }

    function logoutUser() {
        setUserLogin(false);
        sessionStorage.removeItem('login');
        //sessionStorage.removeItem('user');
        //sessionStorage.removeItem('login');
        //setIsLogin(false);
        sessionStorage.removeItem('credentials');
    }

    return (
        <GhibliContext.Provider value={{ userLogin, userCredentials, loginUser, logoutUser }}>
            { children }
        </GhibliContext.Provider>
    )
    
}