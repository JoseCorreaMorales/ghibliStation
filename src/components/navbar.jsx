import '@picocss/pico'
import '../style/navbar.css'

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
    return (
        <nav>
            <ul className='navbar'>
                <li>
                    <strong>Brand</strong>
                </li>
                <li>
                    <ToggleTheme />
                </li>
            </ul>
        </nav>

    )
}

export default Navbar 
