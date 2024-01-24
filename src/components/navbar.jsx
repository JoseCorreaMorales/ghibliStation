import '@picocss/pico'
import '../style/navbar.css'
import { BrowserRouter as Router, Link } from 'react-router-dom';
import GhibliContext from '../context/ghibliContext'
import { useContext, useEffect, useState } from 'react';
import { GiHamburgerMenu } from "react-icons/gi";
import { IoCloseOutline } from "react-icons/io5";
import totoro from '../assets/icons8-totoro.svg'
import { BsMoonFill } from "react-icons/bs";
import { MdSunny } from "react-icons/md";

const ToggleTheme = () => {
    const [theme, setTheme] = useState(localStorage.getItem('theme'));

    useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);

    }, [theme])

    const changeTheme = (e) => {
        const newTheme = theme === 'light' ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        setTheme(newTheme);
    }
    return (
        // TODO: change readOnly to checked
        <div className='dark-mode-container'>
           { theme === 'light' ?  <MdSunny /> :  <BsMoonFill />}
            <input 
            type="checkbox"
            role="switch"
            id="theme-switch"
            name="switch"
            readOnly={theme === 'dark'}
            onClick={changeTheme} />
        </div>
    )
}

function Navbar() {
    const [toggle, setToggle] = useState(false);

    function handleToggleMenu(e) {
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
                    <img src={ totoro } alt="Navbar totoro icon" />
                    <strong>Ghibli Station</strong>
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
