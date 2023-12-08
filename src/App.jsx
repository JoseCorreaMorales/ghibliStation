import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import '@picocss/pico'
import './style/theme.css'
import './App.css'


function App() {
  return (
    <>
      <div data-theme="dark" className='container'>
        <label htmlFor="username">Username</label>
        <input type="text" name='username' />

        <label htmlFor="username">Username</label>
        <input type="text" name='username' />
      </div>
    </>
  )
}

export default App
