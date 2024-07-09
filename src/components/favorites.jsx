import React, { useContext, useState } from 'react'
import { getFavorites } from '../services/favoriteMoviesService'
import GhibliContext from '../context/ghibliContext';
import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import '../style/favorites.css'

export default function Favorites(props) {
    const { userCredentials } = useContext(GhibliContext);
    const { uid, email } = userCredentials
    const [favorites, setFavorites] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchFavorites = async () => {
            if (uid) {
                const fechedFavs = await getFavorites(uid)
                setFavorites(fechedFavs)
                setLoading(false)
                console.log(favorites)
            }
        }
        fetchFavorites();
    }, [uid])

    if (loading) {
        return (
            <div className="loading">
                <span aria-busy={loading} className="">
                    Loading favorites 🐈🐈...
                </span>
            </div>
        );
    }
    return (
        <>
            <main className='container-fluid'>
                <h1 className='title'><b>List</b> of your favorites <span>Ghibli</span> movies</h1>
                <div className="films">
                    {favorites && favorites.map((film) => {
                        return (
                            <article className="film" key={film.id} style={{borderRadius : "10%"}}>
                                <Link to={`/movie/${film.id}`}>
                                    <header>
                                        <img src={film.movie_banner} alt="" />
                                    </header>
                                    <hgroup>
                                        <h3 title={film.title}>{film.title}</h3>
                                        <p>{film.original_title}</p>
                                        <p><strong>{film.producer}</strong></p>
                                        <p>{film.release_date }</p>
                                    </hgroup>
                                </Link>
                            </article>
                        );
                    })}
                </div>

            </main>


        </>
    )
}
