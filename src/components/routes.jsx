import { Routes, Route, Navigate } from "react-router-dom";
import GlobalState from "../context/globalState";
import GhibliContext from "../context/ghibliContext";

import Login from "../components/login";
import GhibliHome from "../components/ghibliHome";

export default function Rutas() {
  return (
    <GlobalState>
      <GhibliContext.Consumer>
        {(context) => {
          console.log("User login status:", context.userLogin);

          return (
            <Routes>
              <Route path="/" element={<Navigate to="/login" />} />
              <Route path="/login" element={<Login />} />
              <Route
                path="/home"
                element={context.userLogin ? <GhibliHome /> : <Navigate to="/login" />}
              />
            </Routes>
          );
        }}
      </GhibliContext.Consumer>
    </GlobalState>
  );
}
