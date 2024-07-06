import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom';
import '../style/movie.css'
import { GiDirectorChair } from "react-icons/gi";
import { CiCalendar } from "react-icons/ci";
import { CiTimer } from "react-icons/ci";
import { CiStar } from "react-icons/ci";
import { RiMovie2Line } from "react-icons/ri";


export default function Movie(props) {
  const { id } = useParams();  
    const [movieDetails, setMovieDetails] = useState([]);
    const [loading, setLoading] = useState(true);
    const romanisedTitleRef = useRef(null)
    
    /* 
    {
    id: '86e544fd-79de-4e04-be62-5be67d8dd92e',
    title: 'Nausicaä of the Valley of the Wind',
    original_title: '風の谷のナウシカ',
    original_title_romanised: 'Kaze no Tani no Naushika',
    image: 'https://www.themoviedb.org/t/p/original/tcrkfB8SRPQCgwI88hQScua6nxh.jpg',
    movie_banner: 
      'https://www.themoviedb.org/t/p/original/ulVUa2MvnJAjAeRt7h23FFJVRKH.jpg',
    description: 
      'Warrior and pacifist Princess Nausicaä desperately struggles to prevent two warring nations from destroying themselves and their dying planet.',
    director: 'Hayao Miyazaki',
    producer: 'Isao Takahata',
    release_date: '1984',
    running_time: '117',
    rt_score: '89',
    people: [ 'https://ghibliapi.dev/people/' ],
    species: [ 'https://ghibliapi.dev/species/' ],
    locations: [ 'https://ghibliapi.dev/locations/' ],
    vehicles: [ 'https://ghibliapi.dev/vehicles/' ],
    url: 'https://ghibliapi.dev/films/86e544fd-79de-4e04-be62-5be67d8dd92e'
  }
    */
    
    
    useEffect(() => {
        async function fetchMovie() {
            try {
                const response = await axios.get(import.meta.env.VITE_BASE_URL + `/films/${id}`);
                setMovieDetails(response.data);
                setLoading(false)
                console.log(response.data);
            } catch (error) {
                console.error("Error fetching data: ", error);
            }
        }
        fetchMovie()
    }, [id]);
    
    useEffect(() => {
        if (movieDetails && romanisedTitleRef.current) {
            romanisedTitleRef.current.setAttribute('data-title',
                movieDetails.original_title_romanised
            )
        }
    }, [movieDetails])


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
                    <h1>{movieDetails.title}</h1>
                    <p>{movieDetails.description}</p>
                    <div className="details">
                        <p><GiDirectorChair /> <strong>Director: </strong>{movieDetails.director}.</p>
                        <p><RiMovie2Line /><strong>Producer(s):</strong> {movieDetails.producer}.</p>
                        <p><CiCalendar /><strong>Release Date:</strong> {movieDetails.release_date}.</p>
                        <p><CiTimer /><strong>Running Time:</strong> {movieDetails.running_time} mins.</p>
                        <p><CiStar /><strong>Rotten Tomatoes Score:</strong> {movieDetails.rt_score}%.</p>
                    </div>
                </section>
            
                
            </main>            

        </>
    )
}
