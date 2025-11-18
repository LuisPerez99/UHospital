import React from "react";
import { NavBar } from "./components/NavBar";
import { Login } from "./pages/Login";
import { Home } from "./pages/Home";
import { Register } from "./pages/Register";
import { Route, Routes } from "react-router";
import { ConfigProvider } from "./contexts/ConfigContext";
import { UserManagement } from "./components/admin-dashboard/UserManagement";

const AdminDashboard = React.lazy(() =>
  import("./pages/AdminDashboard").then((m) => ({ default: m.AdminDashboard }))
);
const SPPaciente = React.lazy(() =>
  import("./components/SPPaciente").then((m) => ({ default: m.SPPaciente }))
);
const SPDoctor = React.lazy(() =>
  import("./components/SPDoctor").then((m) => ({ default: m.SPDoctor }))
);

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
          <Route
            path="/reset-password"
            element={
              <div className="p-4">
                Página de restablecimiento de contraseña (en construcción)
              </div>
            }
          />
          <Route path="/dashboard">
            <Route
              path="admin"
              element={
                <React.Suspense
                  fallback={<div>Cargando panel de administrador...</div>}
                >
                  <AdminDashboard />
                </React.Suspense>
              }
            >
              <Route path="user-management" element={<UserManagement />} />
              <Route path="system-settings" element={
                <div className="p-4">Configuración del sistema (en construcción)</div>
              } />
              <Route path="reports" element={
                <div className="p-4">Reportes (en construcción)</div>
              } />
              <Route
                index
                element={
                  <div className="p-4">
                    Bienvenido al panel de administrador
                  </div>
                }
              />
            </Route>
            <Route
              path="doctor/*"
              element={
                <React.Suspense
                  fallback={<div>Cargando panel de doctor...</div>}
                >
                  <SPDoctor />
                </React.Suspense>
              }
            >
              <Route
                index
                element={
                  <div className="p-4">Bienvenido al panel de doctor</div>
                }
              />
            </Route>
            <Route
              path="paciente/*"
              element={
                <React.Suspense
                  fallback={<div>Cargando panel de paciente...</div>}
                >
                  <SPPaciente />
                </React.Suspense>
              }
            >
              <Route
                index
                element={
                  <div className="p-4">Bienvenido al panel de paciente</div>
                }
              />
            </Route>
            <Route
              index
              element={
                <div className="p-4">
                  Seleccione un panel en el menú lateral
                </div>
              }
            />
          </Route>
        </Routes>
      </div>
    </ConfigProvider>
  );
}
