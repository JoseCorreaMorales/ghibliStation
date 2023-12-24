import { BrowserRouter as Router, Link } from 'react-router-dom';
import { ghibliHome } from './components/ghibliHome';
import { navbar } from './components/navbar';
import { routes } from './components/routes';
import  { globalState } from './context/globalState';
import { GhibliContext } from './context/ghibliContext'

export default function App() {
  return (
    <Router>
        <GhibliContext>
            <navbar />
            <routes />
        </GhibliContext>
    </Router>
    
  )
}