import { BrowserRouter as Router, Link } from 'react-router-dom';
import Navbar from './components/Navbar/navbar.jsx';
import Rutas from './components/routes.jsx';
import GlobalState from './context/globalState'; 
import GhibliContext from './context/ghibliContext'


export default function App() {
  return (
    <Router>
        <GlobalState>
          <GhibliContext.Consumer>
          {
            (context) => (
              <>
              <Navbar />
              <Rutas />
              </>
             )
          }
          </GhibliContext.Consumer>  
        </GlobalState>
    </Router>
    
  )
}