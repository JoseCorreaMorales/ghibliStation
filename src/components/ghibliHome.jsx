import axios from "axios";
import { useEffect, useState } from "react";
import "../style/home.css";
import "../style/footer.css";
import { FaStar } from 'react-icons/fa'
import { FaClock } from "react-icons/fa";
import { BiSolidTrain } from "react-icons/bi";
import { IoFilter } from "react-icons/io5";
import Footer from "./footer"

const GhibliHome = () => {
    const [films, setFilms] = useState();
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        async function fetchFilms() {
            try {
                const response = await axios.get(
                    import.meta.env.VITE_BASE_URL + `/films`
                );
                console.log(response.data);
                setFilms(response.data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching data: ", error);
            }
        }
        fetchFilms();
    }, []);

    if (loading) {
        return (
            <div className="loading">
                <span aria-busy={loading} className="">
                    Loading films ✨✨...
                </span>
            </div>
        );
    }
    return (
        <>
            <div className="title-container" role="group">
                <BiSolidTrain />
                <h1>Ghibi Station</h1>
            </div>

            <div className="search-container">
                <form role="search">
                    <input name="search" type="search" placeholder="Search" />
                    <input type="submit" value="Search"  role="button" />
                </form> 
                <details className="outline contrast">
                    <summary><IoFilter/></summary>
                    <p>...</p>
                </details>
            </div>

            <main className="container-fluid">
                <div className="films">
                    {films?.map((film) => {
                        return (
                            <article className="film" key={film.id}>
                                <header>
                                    <img src={film.image} alt=""  />
                                </header>
                                <hgroup>
                                    <h3 title={film.title}>{film.title}</h3>
                                    <p>{film.original_title}</p>
                                    <blockquote title={film.description}>
                                        {film.description}                                        
                                    </blockquote> 
                                </hgroup>
                                <footer>
                                    <div className="footer-container">
                                        <div className="footer-item">
                                            < FaStar className="start" />
                                            {film.rt_score}</div>
                                        <div className="footer-item">
                                            < FaClock className="clock" />
                                            {film.running_time } m
                                        </div>
                                    </div>
                                </footer>
                            </article>
                        );
                    })}
                </div>
            </main>

        <Footer/>

        </>
    );
};

export default GhibliHome;
