import React from 'react';
import { createFavorite, isOnFavorite } from '../services/favoriteMoviesService';

export default function Modal({ isOpen, movieDetails, onClose, credentials, existOnFavorite, setIsModalOpen, setExistOnFavorite }) {
    const { uid } = credentials;
    const { id, title, description, director, producer, release_date, running_time, rt_score, movie_banner } = movieDetails;
    const payload = { id, title, description, director, producer, release_date, running_time, rt_score, movie_banner };

    const handleAddOrDeleteFavorite = async () => {
        try {
            if (existOnFavorite) {
                // its already on favorites list then remove it
                await removeFavorite(uid, id);
                setIsModalOpen(false);
                setExistOnFavorite(false);
            } else {
                // its not on favorites list yet then add it
                await createFavorite(uid, payload);
                setIsModalOpen(false);
                setExistOnFavorite(true);
            }
        } catch (error) {
            console.error('Error adding favorite: ', error);
        }
    };

    if (!isOpen) return null;

    return (
        <dialog open>
            <article>
                <h2>Are you sure you want to add <strong>{title}</strong> to your favorites list?</h2>
                <ul>
                    <li><strong>Director:</strong> {director}</li>
                    <li><strong>Producer:</strong> {producer}</li>
                    <li><strong>Release Date:</strong> {release_date}</li>
                    <li><strong>Running Time:</strong> {running_time} mins</li>
                    <li><strong>Rotten Tomatoes Score:</strong> {rt_score}%</li>
                </ul>
                <footer>
                    <button onClick={onClose} className="secondary">
                        Cancel
                    </button>
                    <button onClick={handleAddOrDeleteFavorite}>
                        Confirm
                    </button>
                </footer>
            </article>
        </dialog>
    );
}
