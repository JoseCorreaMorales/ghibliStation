import { app } from '../firebase/firebase';
import { getFirestore, collection, addDoc, doc, setDoc } from "firebase/firestore";


export async function create(payload) {
    return await app.firestore().collection("favorites")
        .add(payload)
}


const db = getFirestore();

/* users -> userId -> favorites -> movieId -> movieDetails */
export const createFavorite = async (userId, movie) => {
    try {
        const docRef = doc(collection(db, "users", userId, "favorites"));
        console.log(docRef);
        await setDoc(docRef, movie);
        console.log("Favorite added successfully");
    } catch (error) {
        console.error("Error adding favorite: ", error);
    }
};

/* 
export async function createFavorite(data) {
    try {
        const db = getFirestore();


        const document = await addDoc(collection(db, 'favorites'), {
            data
        });
        console.log("Entró a firebase", document);
        return document;
    }
    catch (error) { console.log(error, error.message) }
} */
