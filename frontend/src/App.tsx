import React from 'react'
import { useState } from 'react'
import { NavBar } from './components/NavBar'
import { Login } from './pages/Login'
import { Home } from './pages/Home'
import { Register } from './pages/Register'
import { Route, Routes } from 'react-router'
import { ConfigProvider } from './contexts/ConfigContext'
import { Dashboard } from './pages/Dashboard'
// Lazy-load dashboard panels to reduce initial bundle size
const SPAdmin = React.lazy(() => import('./components/SPAdmin').then(m => ({ default: m.SPAdmin })))
const SPPaciente = React.lazy(() => import('./components/SPPaciente').then(m => ({ default: m.SPPaciente })))
const SPDoctor = React.lazy(() => import('./components/SPDoctor').then(m => ({ default: m.SPDoctor })))

// import './App.css'

export function App() {
  return (
    <ConfigProvider>
      <div className="App">
        <NavBar />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path='/reset-password' element={<div className="p-4">Página de restablecimiento de contraseña (en construcción)</div>} />
          <Route path='/dashboard/*' element={<Dashboard />}>
            <Route index element={<div className="p-4">Seleccione una opción del panel lateral.</div>} />
            <Route
              path="admin/*"
              element={
                <React.Suspense fallback={<div className="p-4">Cargando panel de admin…</div>}>
                  <SPAdmin />
                </React.Suspense>
              }
            />
            <Route
              path="paciente/*"
              element={
                <React.Suspense fallback={<div className="p-4">Cargando panel de pacientes…</div>}>
                  <SPPaciente />
                </React.Suspense>
              }
            />
            <Route
              path="doctor/*"
              element={
                <React.Suspense fallback={<div className="p-4">Cargando panel de doctor…</div>}>
                  <SPDoctor />
                </React.Suspense>
              }
            />
          </Route>
        </Routes>
      </div>
    </ConfigProvider>
  )
}
