import { useState } from 'react'
import { NavBar } from './components/NavBar'
import { Login } from './pages/Login'
import { Home } from './pages/Home'
import { Route, Routes } from 'react-router'

// import './App.css'

export function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <NavBar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </div>
  )
}
