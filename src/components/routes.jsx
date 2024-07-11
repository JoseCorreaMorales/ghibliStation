import { Routes, Route, Navigate } from "react-router-dom";
import GlobalState from "../context/globalState";
import GhibliContext from "../context/ghibliContext";

import Login from "./Auth/login.jsx";
import Signup from "./Auth/resgister.jsx";
import Logout from "./Auth/logout.jsx";
import GhibliHome from "./Home/ghibliHome.jsx";
import Movie from "./Movie/movie.jsx";
import Profile from "./Profile/profile.jsx";
import Favorites from "./Favorites/favorites.jsx";

export default function Rutas() {
  return (
    <GlobalState>
      <GhibliContext.Consumer>
        {(context) => {
          //console.log("User login status:", context.userLogin);
          return (                        
          <Routes>
          {
              !context.userLogin &&
              <>
                  <Route path="/" element={<Login />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/signup" element={<Signup />} /> 
                  <Route path="/*" element={<Login />} />
              </>}
          {
                context.userLogin &&
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
