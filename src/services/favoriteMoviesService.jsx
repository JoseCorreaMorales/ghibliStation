import { app } from '../firebase/firebase';
import { getFirestore, collection, addDoc, doc, setDoc, getDocs, deleteDoc } from "firebase/firestore";


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


export const getFavorites = async (userId) => {
    try {
        // Obtén una referencia a la subcolección "favorites" del usuario
        const favoritesCollectionRef = collection(db, "users", userId, "favorites");

        // Obtén los documentos de la subcolección "favorites"
        const querySnapshot = await getDocs(favoritesCollectionRef);

        // Mapea los documentos obtenidos a un arreglo de objetos
        const favorites = querySnapshot.docs.map(doc => ({
            docId: doc.id,
            ...doc.data()
        
        }));

        return favorites;
    } catch (error) {
        console.error("Error getting favorites: ", error);
        throw new Error("Error getting favorites");
    }
};

export const removeFavorite = async (userId, movieId) => {
    try {
        // Obtén una referencia al documento del favorito
        const favoriteRef = doc(db, "users", userId, "favorites", movieId);

        // Elimina el documento del favorito
        await deleteDoc(favoriteRef);

        console.log("Favorite removed successfully");
    } catch (error) {
        console.error("Error removing favorite: ", error);
        throw new Error("Error removing favorite");
    }
}



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
