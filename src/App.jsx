import { useState } from 'react'
import '@picocss/pico'
import './style/theme.css'
import './App.css'
import loginImg from './assets/loginImg.svg'
import { app, firestore } from './firebase/firebase'
import { collection, addDoc } from 'firebase/firestore' // for cloud firestore database 
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth' // for authentication

const Image = () => {
  return (
    <div className='img-container'>
      <img src={loginImg} alt="login image" title='Login image' />
    </div>
  )
}


const LoginInput = ({ onFormSubmit }) => {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const validateLogin = () => {
    let isValid = true;

    if (username === '' || password === '') {
      setUsernameError('Please enter all fields');
      setPasswordError('Please enter all fields');
      isValid = false;  
    }else {
      setPasswordError(''); 
    }

    if (!username.includes('@') || !username.includes('.')) {
      setUsernameError('Invalid Email');
      isValid = false;
    } else {
      setUsernameError('');
    }

    if (password.length < 8) {
      setPasswordError('Password must be at least 8 characters');
      isValid = false;
    } else {
      setPasswordError('');
    }
    return isValid;
  };
  /*   const handleEmailChange = ({ target: { value } }) => {
      setUsername(value);
    }
    const handlePasswordChange = ({ target: { value } }) => {
      setPassword(value);
    } */
  const handleFormSubmit =  async (e) => {
    e.preventDefault();
    if (validateLogin()) {
      onFormSubmit(username, password);

      try {
        const auth = getAuth(app);
        const userCredential = await signInWithEmailAndPassword(auth, username, password);
        console.log('Inicio de sesión exitoso. Usuario:', userCredential.user);
      }catch (error) {
        console.error(error);
      }
    }
  }

  return (
    <div className='input-container'>
      <div className='input-item'>
        <label htmlFor="username">Username</label>
        <input type="email" name='username' placeholder='username' onChange={(e) => setUsername(e.target.value)} required />
        {usernameError && <del className='error'>{usernameError}</del>}
      </div>

      <div className='input-item'>
        <label htmlFor="password">Password</label>
        <input type="password" name='password' placeholder='password' onChange={(e) => setPassword(e.target.value)} required />
        {passwordError && <del className='error'>{passwordError}</del>}
      </div>


      <button type='submit' onClick={ handleFormSubmit }>Login </button>
    </div>
  )
}

function App() {
  const handleFormSubmit = (username, password) => {
    console.log("data ", username, password);
  }

  return (
    <>
      <form action="" onSubmit={(e) => e.preventDefault()}>
        <div data-theme="dark" className='container container-flex'>

          <LoginInput onFormSubmit={handleFormSubmit} />

          <Image />

        </div>
      </form>
    </>
  )
}

export default App
