import axios from "axios";
import { useEffect, useState } from "react";
import "../style/home.css";
import "../style/footer.css";
import { FaStar } from 'react-icons/fa'
import { FaClock } from "react-icons/fa";
import { BiSolidTrain } from "react-icons/bi";
import Search from "./search";
import Footer from "./footer"
import { IoFilter } from "react-icons/io5";
import { CgLayoutGrid } from "react-icons/cg";

const GhibliHome = () => {
    const [films, setFilms] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchText, setSearchText] = useState("")
    const [searchResults, setSearchResults] = useState([])

    useEffect(() => {
        async function fetchFilms() {
            try {
                const response = await axios.get(
                    import.meta.env.VITE_BASE_URL + `/films`
                );
                setFilms(response.data);
                setSearchResults([...response.data]);   
                setLoading(false);
            } catch (error) {
                console.error("Error fetching data: ", error);
            }
        }
        fetchFilms();
    }, []);

    const handleSearchMovieChange = (e) => {
        e.preventDefault();
        const text = e.target.value.toLowerCase();
        setSearchText(text);
        if (text === "") {
            setFilms([...searchResults]);
        } else {
            setFilms(searchResults.filter((film) => 
                film.title.toLowerCase().includes(text)
            ));
        }
    }

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
                <h1>Ghibli Station</h1>
            </div>

            <div className="search-container">
                <form role="search">
                    <input onChange={handleSearchMovieChange} name="search" type="search" placeholder="Search" />
                    <input value="Search" role="button" type="button" />
                </form>
                <details className="outline contrast">
                    <summary><IoFilter /></summary>
                    <p>...</p>
                </details>
            </div>

            <main className="container-fluid">
                <div className="films">
                    {films && films.map((film) => {
                        return (
                            <article className="film" key={film.id}>
                                <header>
                                    <img src={film.image} alt="" />
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
                                            {film.running_time} m
                                        </div>
                                    </div>
                                </footer>
                            </article>
                        );
                    })}
                </div>
            </main>

            <Footer />

        </>
    );
};

export default GhibliHome;