import '@picocss/pico'
import './style/theme.css'
import './App.css'
import loginImg from './assets/loginImg.svg'


const Image = () => {
  return (
    <div className='img-container'>
      <img src={loginImg} alt="login image" srcset="" />
    </div>
  )
}


const LoginInput = () => {
  return (
    <div className='input-container'>
      <label htmlFor="username">Username</label>
      <input type="text" name='username' placeholder='username' />
      <label htmlFor="password">Password</label>
      <input type="password" name='password' placeholder='password' />
      <button>Login </button>
    </div>
  )
}

function App() {
  return (
    <>
      <form action="">
        <div data-theme="dark" className='container container-flex'>

          <LoginInput />

          <Image />

        </div>
      </form>
    </>
  )
}

export default App
