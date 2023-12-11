import { useState } from 'react'
import '@picocss/pico'
import './style/theme.css'
import './App.css'
import loginImg from './assets/loginImg.svg'


const Image = () => {
  return (
    <div className='img-container'>
      <img src={loginImg} alt="login image" />
    </div>
  )
}


const LoginInput = ({ onFormSubmit }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailChange = ({ target: { value } }) => {
    setUsername(value);
  }
  const handlePasswordChange = ({ target: { value } }) => {
    setPassword(value);
  }

  const handleFormSubmit = (e) => { 
      //e.preventDefault();
      onFormSubmit(username, password);
      
   }

  return (
    <div className='input-container'>
      <label htmlFor="username">Username</label>
      <input type="email" name='username' placeholder='username' onChange={ handleEmailChange } required />
      <label htmlFor="password">Password</label>
      <input type="password" name='password' placeholder='password' onChange={ handlePasswordChange } required />
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
      <form action="" onSubmit={ (e) => e.preventDefault() }>
        <div data-theme="dark" className='container container-flex'>

          <LoginInput onFormSubmit = { handleFormSubmit } />

          <Image />

        </div>
      </form>
    </>
  )
}

export default App
