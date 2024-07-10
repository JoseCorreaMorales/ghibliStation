import { useContext, useState, Suspense } from 'react'
import { useNavigate } from 'react-router-dom'
import  GhibliContext  from '../context/ghibliContext'
import '@picocss/pico'
import '../style/theme.css'
import '../style/login.css'
import loginImg from '../assets/loginImg.svg'
import AuthForm from './AuthForm'
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import  Model  from './Model-optimized.jsx';
import { getAuth, signInWithEmailAndPassword, fetchSignInMethodsForEmail } from 'firebase/auth' // for authentication


const Image = () => {
  return (
    <div className='img-container'>
      <img src={loginImg} alt="login image" title='Login image' />
    </div>
  )
}
export const ThreeDModel = () => {
  return (
    <div className='model-container'>
      <Canvas >
        <Suspense fallback={null}>
          <ambientLight intensity={0.5} />
          <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
          <pointLight position={[-10, -10, -10]} />
          <Model scale={4} />
        </Suspense>
        <OrbitControls
          enableZoom={true}
          maxDistance={10}   // Distancia máxima a la que puede alejarse la cámara
          minDistance={1}    // Distancia mínima a la que puede acercarse la cámara
          enableDamping={true} // Habilitar amortiguación
          dampingFactor={0.25} // Factor de amortiguación
          rotateSpeed={3}    // Velocidad de rotación
          zoomSpeed={.5}      // Velocidad de zoom
          panSpeed={0.5}      // Velocidad de paneo
          autoRotate={true}   // Rotación automática
          autoRotateSpeed={0.3} // Velocidad de rotación automática
          enablePan={true}    // Habilitar paneo
          enableRotate={true} // Habilitar rotación
        />
      </Canvas>
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

      const userCredential = await signInWithEmailAndPassword(auth, username, password);
        //console.log('Inicio de sesión exitoso. Usuario:', userCredential.email);  
        const user = userCredential.user         
      loginUser({ email: user.email, uid: user.uid }); 
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
        <div className='not-found'>{userNotFound && <del className='error'>{userNotFound}</del>}</div>
          {/* <Image /> */}
          <ThreeDModel />

        </div>
      </form>
    </>
  )
}

export default Login
