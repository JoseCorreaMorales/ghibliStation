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
      <img src={loginImg} alt="login image" title='Sign-up image' />
    </div>
  )
}

function Login() {
  const navigate = useNavigate();
  async function handleFormSubmit(username, password) {
    
  }
  return (
    <>
      <form action="" onSubmit={(e) => e.preventDefault()}>
        <div data-theme="dark" className='container container-flex'>
          <AuthForm onFormSubmit={handleFormSubmit} buttonText={"Sign-up"} isLogin={ false } ></AuthForm>
          <Image />
        </div>
      </form>
    </>
  )
}

export default Login
