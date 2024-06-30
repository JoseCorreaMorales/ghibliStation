import React from 'react'
import Image from '../assets/icons8-totoro.svg'
import House from '../assets/house.png'

export default function Footer(props) {


    return (
        <>
            <footer >

                <div className='footer'>
                    <div className='totoro'>
                        <img src={Image} alt="" />
                        <h3>&#174; Ghibli Station</h3>
                        <span>The content of this website is for educational purposes.</span>
                    </div>

                    <div className='footer-info'>
                        <h5>Pages</h5>
                        <p>Movies</p>
                        <p>About</p>
                        <p>Contact</p>
                    </div>

                    <div className='footer-info'>
                        <h5>Social Media</h5>
                        <p>Facebook</p>
                        <p>Twitter</p>
                        <p>Instagram</p>
                    </div>

                    <div className='footer-info'>
                        <h5>Contacto</h5>
                        <p>info@ghiblistation.com</p>
                        <p>+1 123 456 7890</p>
                        <p>1 Totoro Lane, <strong>Bosque de Niebla</strong>, <br /> Valle del Viento, Fantasía</p>
                    </div>
                <img src={House} className='bottom-totoro' alt="" />
                </div>


            </footer>
        </>
    )
}
