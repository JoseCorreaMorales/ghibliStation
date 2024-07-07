import { Routes, Route, Navigate } from "react-router-dom";
import GlobalState from "../context/globalState";
import GhibliContext from "../context/ghibliContext";

import Login from "../components/login";
import Signup from "../components/resgister";
import Logout from "./logout";
import GhibliHome from "../components/ghibliHome";
import Movie from "../components/movie";
import Profile from "../components/profile";
import Favorites from "../components/favorites";

export default function Rutas() {
  return (
    <GlobalState>
      <GhibliContext.Consumer>
        {(context) => {
          console.log("User login status:", context.userLogin);
          //console.log("User login status:", context.isLogin);

          return (
            
            
          <Routes>
          {
              !context.userLogin &&
              //!context.isLogin &&
              <>
                  <Route path="/" element={<Login />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/signup" element={<Signup />} /> 
                  <Route path="/*" element={<Login />} />
              </>}
          {
                context.userLogin &&
                //context.isLogin &&
                
              <>
              <Route path="/" element={<Navigate to="/login" />} />
              <Route path="/home" element={<GhibliHome />} />              
              <Route path="/movie/:id" element={<Movie />} />              
              <Route path="/profile" element={<Profile />} />              
              <Route path="/favorites" element={<Favorites />} />              
              <Route path="/logout" element={<Logout />} />    
              <Route path="/*" element={<GhibliHome />} />          
              </>}
      </Routes>  




          );
        }}
      </GhibliContext.Consumer>
    </GlobalState>
  );
}
