import { useState } from 'react'
import '@picocss/pico'
import './navbar.css'


function Navbar() {
    return (
        <nav>
            <ul>
                <li><a href="#" class="secondary"></a></li>
            </ul>
            <ul>
                <li><strong>Login</strong></li>
            </ul>
            <ul>
                <li><a href="#" class="secondary"></a></li>
            </ul>
        </nav> 

    )
}

export default Navbar 
