import '@picocss/pico'
import '../style/navbar.css'
import { BrowserRouter as Router, Link } from 'react-router-dom';
import GhibliContext from '../context/ghibliContext'
import { useContext, useState } from 'react';
import { GiHamburgerMenu } from "react-icons/gi";
import { IoCloseOutline } from "react-icons/io5";

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
    const [toggle, setToggle] = useState(false);

    function handleToggleMenu(e) {
        console.log(e)
        const menu = document.querySelector('.navbar');
        const toggleMenu = document.querySelector('.toggle-menu');
        menu.classList.toggle('active'); 
        toggleMenu.classList.toggle('active'); 
        setToggle(!toggle);
        
    }


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
                            <Link to="/login">Login  </Link>
                        </li>
                        <li>
                            <Link to="/signup">Sign up  </Link>
                        </li>
                    </>
                )
                }

                <li>
                    <ToggleTheme />
                </li>

                
            </ul>
          
           {toggle ? <IoCloseOutline className='toggle-menu' onClick={ handleToggleMenu }/> :
            <GiHamburgerMenu  className='toggle-menu' onClick={ handleToggleMenu }/> }
        </nav>

    )
}

export default Navbar 
