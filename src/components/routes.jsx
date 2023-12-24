import { Routes, Route } from 'react-router-dom';
import GlobalState from '../context/globalState';
import GhibliContext from '../context/ghibliContext';

import Login from '../components/login';
import GhibliHome from '../components/ghibliHome';


export default function Rutas() {
  return (
    <GlobalState>
    <GhibliContext.Consumer>
      {
        (context) => (
          <Routes>
            {
              !context.userLogin &&
              <>
                <Route path="/" element={<Login />} />
                <Route path="/*" element={<Login />} />
                {/* <Route path="/signup" element={<SignUp />} /> */}
              </>
            }

            {
              context.userLogin &&
              <>
                <Route path="/home" element={<GhibliHome />} />

              </>
            }

          </Routes>
        )
      }
    </GhibliContext.Consumer>
    </GlobalState>

  );
}

