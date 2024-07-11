import GhibliContext from "../../context/ghibliContext";
import { redirect, useNavigate } from 'react-router-dom';
import { useContext } from "react";

export default  function Logout() {
    const context = useContext(GhibliContext);
    context.logoutUser();
    window.location.reload();
    //useNavigate("/login");
    console.log("from logout componet")
}
