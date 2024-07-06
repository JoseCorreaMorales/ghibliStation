import React from 'react'
import Image from '../assets/icons8-totoro.svg'
import House from '../assets/house.png'
import { FaFacebook } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FiInstagram } from "react-icons/fi";
import { RiMovie2Line } from "react-icons/ri";
import { FaInfo } from "react-icons/fa";
import { SlEnvolopeLetter } from "react-icons/sl";
import { PiMailbox } from "react-icons/pi";
import { CiPhone } from "react-icons/ci";
import { BiStreetView } from "react-icons/bi";

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
                        <p><RiMovie2Line /> Movies</p>
                        <p><FaInfo /> About</p>
                        <p><SlEnvolopeLetter /> Contact</p>
                    </div>

                    <div className='footer-info'>
                        <h5> Social Media</h5>
                        <p><FaFacebook /> Facebook</p>
                        <p><FaXTwitter /> Twitter</p>
                        <p><FiInstagram />Instagram</p>
                    </div>

                    <div className='footer-info'>
                        <h5> Contact</h5>
                        <p><PiMailbox /> info@ghiblistation.com</p>
                        <p><CiPhone /> +1 123 456 7890</p>
                        <p><BiStreetView /> 1 Totoro Lane, <strong>Fog Forest</strong>, <br /> Valley of the Wind, Fantasy</p>
                    </div>
                <img src={House} className='bottom-totoro' alt="" />
                </div>


            </footer>
        </>
    )
}
