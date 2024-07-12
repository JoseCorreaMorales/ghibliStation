import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getFirestore, collection, addDoc, disableNetwork, doc, getDoc, query, where, getDocs } from "firebase/firestore";

// TODO: CHECK IF USER EXISTS, chek fire rules for login componet 
export async function createuser(name, username, password) {
  try {
    const auth = getAuth();
    const db = getFirestore();
    const responseUser = await createUserWithEmailAndPassword(
      auth,
      username,
      password
    );
    console.log(responseUser);
    const userId = responseUser.user.uid;

    const document = await addDoc(collection(db, 'users'), {
      name: name,
      username: username,
      /* password: password, */
      userId: userId,
    });
    console.log("Entró a firebase", document);
    //return document;
    return responseUser;
  }
  catch (error) { console.log(error, error.message) }
}


// Función para obtener el nombre de usuario actual basado en el uid
export async function getCurrentUsername(uid) {
  try {
    const db = getFirestore();
    const userCollectionRef = collection(db, 'users');
    const q = query(userCollectionRef, where('userId', '==', uid));
    console.log(q);

    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      const userDoc = querySnapshot.docs[0]; // Asumimos que hay solo un documento por uid
      const userData = userDoc.data();
      console.log('User data:', userData);
      return userData.name;
    } else {
      console.error('No such document!');
      return null;
    }
  } catch (error) {
    console.error('Error fetching document:', error.message);
    return null;
  }
}
