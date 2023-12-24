import '@picocss/pico'
import '../style/navbar.css'
import { BrowserRouter as Router, Link } from 'react-router-dom';
import GhibliContext from '../context/ghibliContext'
import { useContext } from 'react';

const ToggleTheme = () => {
    const changeTheme = (e) => {
        if (e.target.checked) {
            document.documentElement.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
        }
        else {
            document.documentElement.setAttribute('data-theme', 'light');
            localStorage.setItem('theme', 'light');
        }
    }
    return (
        <div className='dark-mode-container'>
            <label htmlFor="dark-mode">Switch Theme</label>
            <input type="checkbox" role="switch" id="terms" name="switch" onClick={changeTheme} />
        </div>
    )
}

function Navbar() {
    const context = useContext(GhibliContext);

    return (
        <nav>
            <ul className='navbar'>
                <li>
                    <strong>Brand</strong>
                </li>

                {context.loginUser && (
                    <>
                        <li>
                            <Link to="/home">Home  </Link>
                        </li>
                    </>
                )
                }

                {!context.loginUser && (
                    <>
                        <li>
                            <Link to="/">Login  </Link>
                        </li>
                        <li>
                            <Link to="signup">Sign up  </Link>
                        </li>
                    </>
                )
                }

                <li>
                    <ToggleTheme />
                </li>
            </ul>
        </nav>

    )
}

export default Navbar 
