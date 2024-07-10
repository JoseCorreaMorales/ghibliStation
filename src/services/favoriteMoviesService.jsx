import { app } from '../firebase/firebase';
import { getFirestore, collection, addDoc, doc, setDoc, getDocs, deleteDoc, query, where, getDoc } from "firebase/firestore";

const db = getFirestore();

export const createFavorite = async (userId, movie) => {
    try {
        const docRef = doc(collection(db, "users", userId, "favorites"));
        //console.log(docRef);
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


export const isOnFavorite = async (userId, movieId) => {
    try {
        // Obtén una referencia a la subcolección "favorites" del usuario
        const favoritesCollectionRef = collection(db, "users", userId, "favorites");
        // console.log(favoritesCollectionRef.path)

        // Crea una consulta para verificar si existe un documento con el campo `id` igual a `movieId`
        const q = query(favoritesCollectionRef, where('id', '==', movieId));
        const querySnapshot = await getDocs(q);

        return !querySnapshot.empty; // Retorna true si se encontró al menos un documento
    } catch (error) {
        console.error("Error checking favorite: ", error);
        throw new Error("Error checking favorite");
    }
};



export const removeFavoriteById = async (userId, movieId) => {
    try {
        // Referencia a la colección de favoritos del usuario
        const favoritesRef = collection(db, "users", userId, "favorites");

        // Crea una consulta para encontrar el documento por el campo 'id'
        const q = query(favoritesRef, where("id", "==", movieId));

        // Ejecuta la consulta
        const querySnapshot = await getDocs(q);

        // Verifica si se encontró algún documento
        if (!querySnapshot.empty) {
            // Itera sobre los documentos encontrados (en teoría debería ser solo uno)
            querySnapshot.forEach(async (doc) => {
                // Elimina el documento del favorito
                await deleteDoc(doc.ref);
                console.log("Favorite removed successfully");
            });
        } else {
            console.log("No matching favorites found to remove");
        }
    } catch (error) {
        console.error("Error removing favorite: ", error);
        throw new Error("Error removing favorite");
    }
}

