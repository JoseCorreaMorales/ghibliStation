import axios from "axios";
import { useEffect, useState } from "react";

const GhibliHome = () => {
    const [films, setFilms] = useState()
    useEffect(() => {
        async function fetchFilms() {
            try {
                const response = await axios.get(import.meta.env.VITE_BASE_URL + `/films`);
                console.log(response.data);
                setFilms(response.data) 
            } catch (error) {
                console.error("Error fetching data: ", error);
            }
        }
        fetchFilms();
    }, []);

    return (
        <>
            {films?.map((film) => {
                return (                    
                    <article>{film.title}</article>
                )
            })}
            <div>We are in GhibliHome</div>
        </>
    );

};

export default GhibliHome;
