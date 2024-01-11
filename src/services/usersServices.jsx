import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getFirestore, collection, addDoc, disableNetwork } from "firebase/firestore";

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
      password: password,
      userId: userId,
    });
    console.log("Entró a firebase", document);
    return document;
  } 
  catch (error) { console.log(error, error.message) }
}
