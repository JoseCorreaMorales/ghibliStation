import { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import  GhibliContext  from '../context/ghibliContext'
import '@picocss/pico'
import '../style/theme.css'
import '../style/login.css'
import loginImg from '../assets/loginImg.svg'
import AuthForm from './AuthForm'
import { app, firestore } from '../firebase/firebase'
import { getAuth, signInWithEmailAndPassword, fetchSignInMethodsForEmail } from 'firebase/auth' // for authentication


const Image = () => {
  return (
    <div className='img-container'>
      <img src={loginImg} alt="login image" title='Login image' />
    </div>
  )
}

function Login() {
  const { loginUser } = useContext(GhibliContext);
  const navigate = useNavigate();
  
const [userNotFound, setUserNotFound] = useState('');
  async function handleFormSubmit(_, username, password) {
    try {
      const auth = getAuth();
      console.log('auth', auth);

      const userCredential = await signInWithEmailAndPassword(auth, username, password);
         console.log('Inicio de sesión exitoso. Usuario:', userCredential.email);  
        loginUser(); 
        navigate('/home');
        window.location.reload();
    } catch (error) {
      if (error.code === 'auth/invalid-credential') {
        console.warn('User not found');
        setUserNotFound('User not found');
      }else {
        setUserNotFound('');
      }      
    }
  }
        /* const signinMethod = await fetchSignInMethodsForEmail(auth, username);

      if (signinMethod.length === 0) {
        console.log('User not found', signinMethod);
        return;
      } else {
        const userCredential = await signInWithEmailAndPassword(auth, username, password);
        console.log('Inicio de sesión exitoso. Usuario:', userCredential.user);
      } */

  return (
    <>
      <form action="" onSubmit={(e) => e.preventDefault()} className='login-form'>
        <div data-theme="dark" className='container container-flex'>

          <AuthForm onFormSubmit={handleFormSubmit} buttonText={"Login"} isLogin={true} >
          </AuthForm>
          {userNotFound && <del className='error'>{userNotFound}</del>}
          <Image />

        </div>
      </form>
    </>
  )
}

export default Login
