import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom';
import '../style/movie.css'
import { GiDirectorChair } from "react-icons/gi";
import { CiCalendar } from "react-icons/ci";
import { CiTimer } from "react-icons/ci";
import { CiStar } from "react-icons/ci";
import { RiMovie2Line } from "react-icons/ri";
import { MdFavoriteBorder, MdFavorite } from "react-icons/md";
import { createFavorite, isOnFavorite } from '../services/favoriteMoviesService'
import { useContext } from 'react';
import GhibliContext from '../context/ghibliContext';
import Modal from "./modal"

export default function Movie(props) {
    const { id } = useParams();
    const [movieDetails, setMovieDetails] = useState([]);
    const [loading, setLoading] = useState(true);
    const romanisedTitleRef = useRef(null)
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [existOnFavorite, setExistOnFavorite] = useState(null);
    const { userCredentials } = useContext(GhibliContext);
    const { uid } = userCredentials;


    useEffect(() => {
        async function fetchMovie() {
            try {
                const response = await axios.get(import.meta.env.VITE_BASE_URL + `/films/${id}`);
                setMovieDetails(response.data);
                const exist = await isOnFavorite(uid, id);
                setExistOnFavorite(exist);
                setLoading(false)

            } catch (error) {
                console.error("Error fetching data: ", error);
            }
        }
        fetchMovie()

    }, [id]);

    useEffect(() => {
        if (movieDetails && romanisedTitleRef.current) {
            romanisedTitleRef.current.setAttribute('data-title', movieDetails.original_title_romanised);
        }
    }, [movieDetails, loading])
    
    
    const handleModalOpen = () => setIsModalOpen(true)

    if (loading) {
        return (
            <div className="loading">
                <span aria-busy={loading} className="">
                    Loading film ✨✨...
                </span>
            </div>
        );
    }

    return (
        <>
            <main className="container-fliud">
                <picture className='movie-banner-container'>
                    <div ref={romanisedTitleRef}></div>
                    <img src={movieDetails.movie_banner} alt="" />
                </picture>

                <section className="movie-details">
                    <div className='movie-details--title' onClick={handleModalOpen}>
                        <h1>{movieDetails.title}</h1>
                        {existOnFavorite ? <MdFavorite /> : <MdFavoriteBorder />}
                        {existOnFavorite}
                    </div>
                    <p>{movieDetails.description}</p>
                    <div className="details">
                        <p><GiDirectorChair /> <strong>Director: </strong>{movieDetails.director}.</p>
                        <p><RiMovie2Line /><strong>Producer(s):</strong> {movieDetails.producer}.</p>
                        <p><CiCalendar /><strong>Release Date:</strong> {movieDetails.release_date}.</p>
                        <p><CiTimer /><strong>Running Time:</strong> {movieDetails.running_time} mins.</p>
                        <p><CiStar /><strong>Rotten Tomatoes Score:</strong> {movieDetails.rt_score}%.</p>
                    </div>
                </section>

                <Modal
                    isOpen={isModalOpen}
                    movieDetails={movieDetails}
                    onClose={() => setIsModalOpen(false)}
                    credentials={userCredentials}
                    existOnFavorite={existOnFavorite}
                    setIsModalOpen={setIsModalOpen}
                    setExistOnFavorite={setExistOnFavorite}
                />
                
            </main>

        </>
    )
}
