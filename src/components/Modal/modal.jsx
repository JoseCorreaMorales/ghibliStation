import React from 'react';
import { createFavorite, removeFavorite, removeFavoriteById } from '../../services/favoriteMoviesService.jsx';
import { MdFileDownloadDone } from "react-icons/md";
import { CiCircleRemove } from "react-icons/ci";

export default function Modal({ isOpen, movieDetails, onClose, credentials, existOnFavorite, setIsModalOpen, setExistOnFavorite }) {
    const { uid } = credentials;

    const handleAddOrDeleteFavorite = async () => {
        try {
            if (existOnFavorite) {
                setIsModalOpen(false);
                setExistOnFavorite(false);
                if (!movieDetails.docId) {
                    // When gettin info from Rest API server
                    await removeFavoriteById(uid, movieDetails.id);
                } else {
                    // When getting info from Firebase server
                    await removeFavorite(uid, movieDetails.docId);
                }
                window.location.reload();
            } else {
                const payload = {
                    id: movieDetails.id,
                    title: movieDetails.title,
                    description: movieDetails.description,
                    director: movieDetails.director,
                    producer: movieDetails.producer,
                    release_date: movieDetails.release_date,
                    running_time: movieDetails.running_time,
                    rt_score: movieDetails.rt_score,
                    movie_banner: movieDetails.movie_banner
                };
                await createFavorite(uid, payload);
                setIsModalOpen(false);
                setExistOnFavorite(true);
            }
        } catch (error) {
            console.error('Error adding favorite: ', error);
        }
    };

    if (!isOpen || !movieDetails) return null; // Asegúrarse de que movieDetails no sea null

    return (
        <dialog open>
            <article>
                <h2>Are you sure you want to 
                    <strong className='modal-action'>
                        {existOnFavorite ? ' remove ' : ' add '}
                    </strong>
                    <strong className='modal-title'>
                        {movieDetails.title}
                        {/* ... */}
                    </strong>?
                </h2>
                <ul>
                    <li><strong>Director:</strong> {movieDetails.director}</li>
                    <li><strong>Producer:</strong> {movieDetails.producer}</li>
                    <li><strong>Release Date:</strong> {movieDetails.release_date}</li>
                    <li><strong>Running Time:</strong> {movieDetails.running_time} mins</li>
                    <li><strong>Rotten Tomatoes Score:</strong> {movieDetails.rt_score}%</li>
                </ul>
                <footer>
                    <button onClick={onClose} className="secondary">
                        Cancel
                    </button>
                    <button onClick={handleAddOrDeleteFavorite}>
                        {existOnFavorite ?
                            <CiCircleRemove /> :
                            <MdFileDownloadDone />
                        }
                        Confirm
                    </button>
                </footer>
            </article>
        </dialog>
    );
}
