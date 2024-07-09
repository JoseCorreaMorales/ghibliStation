import React, { useContext, useState } from 'react'
import GhibliContext from '../context/ghibliContext';
import { useEffect } from 'react';
import { getCurrentUsername, } from '../services/usersServices'
import avatar from '../assets/avatar.png'
import '../style/profile.css'

export default function Profile(props) {
    const { userCredentials } = useContext(GhibliContext);
    const { uid, email } = userCredentials
    const [username, setusername] = useState("")
    let viewUid = uid.slice(0, 9)

    useEffect(() => {
        const fetchUsername = async () => {
            if (uid) {
                const fetchedUsername = await getCurrentUsername(uid);
                setusername(fetchedUsername);
            }
        };

        fetchUsername();
    }, [uid]);

    return (
        <>
            <main className='container-fluid'>
                <article>
                    <div className='heading-container'>
                        <picture>
                            <img src={avatar} alt="" />
                        </picture>
                        <h1>Welcome back! <strong> {username}</strong></h1>
                        <small>{ viewUid }....</small>
                    </div>                    
                </article>
                <hr />

                <section className='user-info-container'>
                    <p><strong>Your Email</strong>: {email}</p>

                </section>

            </main>
        </>
    )
}
