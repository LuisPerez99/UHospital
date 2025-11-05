import { useState } from 'react'
import { NavBar } from './components/NavBar'
import { Login } from './pages/Login'
import { Home } from './pages/Home'
import { Register } from './pages/Register'
import { Route, Routes } from 'react-router'
import { ConfigProvider } from './contexts/ConfigContext'

// import './App.css'

export function App() {
  const [count, setCount] = useState(0)

  return (
    <ConfigProvider>
      <div className="App">
        <NavBar />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path='/reset-password' element={<div className="p-4">Página de restablecimiento de contraseña (en construcción)</div>} />
        </Routes>
      </div>
    </ConfigProvider>
  )
}
