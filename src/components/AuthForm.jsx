import { useState, useEffect } from 'react'
import '@picocss/pico'
import '../style/theme.css'
import '../style/login.css'

const AuthForm = ({ onFormSubmit, buttonText, isLogin}) => {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState(''); 
  const [usernameError, setUsernameError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [userNotFound, setUserNotFound] = useState('');
  const [nameError, setNameError] = useState('');



  const validateLogin = () => {
    let isValid = true;

    if (username === '' || password === '') {
      setUsernameError('Please enter all fields');
      setPasswordError('Please enter all fields');
      isValid = false;
    } else {
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


  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (validateLogin()) {
      onFormSubmit(name, username, password);
      //onInputNameChange(name);
      /* setUsername('');
      setPassword(''); */
    }
  }

  return (
    <div className='input-container'>
      {!isLogin ? <h2>Hey, join us!</h2> : <h2>Welcome back!</h2>}

      {
      !isLogin && <div className='input-item'>                
        <label htmlFor="name">Name</label>
        <input type="text" name='name' placeholder='name' onChange={(e) => setName(e.target.value)} required />
        {nameError && <del className='error'>{nameError}</del>}
      </div>
      }
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


      <button type='submit' onClick={handleFormSubmit}> { buttonText } </button>
      {userNotFound && <del className='error'>{userNotFound}</del>}
    </div>
  )
}

export default AuthForm




