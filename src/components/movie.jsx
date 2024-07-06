import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import '../style/movie.css'

export default function Movie(props) {
  const { id } = useParams();  
    const [movieDetails, setMovieDetails] = useState([]);
    const [loading, setLoading] = useState(true);
    
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
                <picture className='movie-container'>
                    <div>
                    </div>
                        <img src={movieDetails.movie_banner} alt="" />
                    </picture>
                    

            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto tempore recusandae quas neque molestias, repudiandae illo velit nulla debitis, a, modi cupiditate. Quas quae vel qui error nobis eius ducimus.
            Beatae, tempore dolorum numquam, excepturi vel earum cumque, ab suscipit libero asperiores nam harum deleniti aut ipsum ea facilis minus quaerat debitis explicabo maxime! Quisquam minus similique deserunt est officiis?
            Rerum laboriosam cumque corrupti quos aliquam dicta, voluptatum distinctio? Enim repellat cumque a sequi numquam explicabo! Quia, similique? Incidunt voluptas nam sunt perferendis laboriosam inventore debitis atque tenetur consequatur! Vitae.
            Inventore tempore nulla nesciunt consequatur! Fugiat provident quidem et ex doloribus perferendis! Neque odio dignissimos reiciendis? Deleniti, dolore maiores! Dolore libero quia laboriosam cum saepe provident aut doloribus fugiat maiores!</p>
            </main>            

        </>
    )
}
