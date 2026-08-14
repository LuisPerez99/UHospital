import React, { useState } from "react";
import { NavBar } from "./components/NavBar";
import { Footer } from "./components/Footer";
import { Login } from "./pages/Login";
import { Home } from "./pages/Home";
import { Register } from "./pages/Register";
import { Route, Routes } from "react-router";
import { ConfigProvider } from "./contexts/ConfigContext";
import { AuthProvider } from "./contexts/AuthContext";
import { UserManagement } from "./components/UserManagement";
import {
  users as initialUsers,
  pacientes as initialPacientes,
  doctors as initialDoctors,
  admins as initialAdmins,
} from "./data/users";
import { citas as initialCitas } from "./data/citas";
import type { User, Paciente, Doctor, Admin } from "./models/models";
import { Profile } from "./components/Profile";
import { Citas } from "./components/Citas";
import { HistorialMedico } from "./components/HistorialMedico";
import { ResetPassword } from "./pages/ResetPassword";
import { Spinner } from "./components/Spinner";

const AdminDashboard = React.lazy(() =>
  import("./pages/AdminDashboard").then((m) => ({ default: m.AdminDashboard }))
);
const PacienteDashboard = React.lazy(() =>
  import("./pages/PacienteDashboard").then((m) => ({
    default: m.PacienteDashboard,
  }))
);
const DoctorDashboard = React.lazy(() =>
  import("./pages/DoctorDashboard").then((m) => ({
    default: m.DoctorDashboard,
  }))
);

// import './App.css'

export function App() {
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [pacientes, setPacientes] = useState<Paciente[]>(initialPacientes);
  const [doctors, setDoctors] = useState<Doctor[]>(initialDoctors);
  const [admins, setAdmins] = useState<Admin[]>(initialAdmins);
  return (
    <AuthProvider>
      <ConfigProvider>
        <div className="App min-h-screen flex flex-col">
          <NavBar />
          <Routes>
            <Route
              path="/login"
              element={
                <Login
                  users={users}
                  pacientes={pacientes}
                  doctors={doctors}
                  admins={admins}
                />
              }
            />
            <Route path="/" element={<Home />} />
            <Route path="/registro" element={<Register />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/dashboard">
              <Route
                path="admin"
                element={
                  <React.Suspense fallback={<Spinner />}>
                    <AdminDashboard
                      users={users}
                      setUsers={setUsers}
                      pacientes={pacientes}
                      setPacientes={setPacientes}
                      doctors={doctors}
                      setDoctors={setDoctors}
                      admins={admins}
                      setAdmins={setAdmins}
                    />
                  </React.Suspense>
                }
              >
                <Route path="gestion-usuarios" element={<UserManagement />} />
                <Route path="registro" element={<Register />} />
                <Route
                  path="reportes"
                  element={
                    <div className="p-4">Reportes</div>
                  }
                />
              </Route>
              <Route
                path="doctor"
                element={
                  <React.Suspense fallback={<Spinner />}>
                    <DoctorDashboard />
                  </React.Suspense>
                }
              >
                <Route
                  path="citas"
                  element={
                    <Citas
                      citas={initialCitas}
                      pacientes={pacientes}
                      doctors={doctors}
                    />
                  }
                />
                <Route
                  path="perfil"
                  element={
                    <Profile
                      users={users}
                      setUsers={setUsers}
                      pacientes={pacientes}
                      setPacientes={setPacientes}
                      doctors={doctors}
                      setDoctors={setDoctors}
                      admins={admins}
                      setAdmins={setAdmins}
                    />
                  }
                />
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
                  <React.Suspense fallback={<Spinner />}>
                    <PacienteDashboard />
                  </React.Suspense>
                }
              >
                <Route
                  path="citas"
                  element={
                    <Citas
                      citas={initialCitas}
                      pacientes={pacientes}
                      doctors={doctors}
                    />
                  }
                />
                <Route path="historial-medico" element={<HistorialMedico />} />
                <Route
                  path="perfil"
                  element={
                    <Profile
                      users={users}
                      setUsers={setUsers}
                      pacientes={pacientes}
                      setPacientes={setPacientes}
                      doctors={doctors}
                      setDoctors={setDoctors}
                      admins={admins}
                      setAdmins={setAdmins}
                    />
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
        <div className="mt-8">
          <Footer />
        </div>
      </ConfigProvider>
    </AuthProvider>
  );
}
