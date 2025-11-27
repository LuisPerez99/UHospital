import { LoginForm } from "../components/LoginForm";
import type { User, Paciente, Doctor, Admin } from "../models/models";

interface LoginProps {
    users: User[];
    pacientes: Paciente[];
    doctors: Doctor[];
    admins: Admin[];
}

export function Login({ users, pacientes, doctors, admins }: LoginProps) {
    return (
        <div className="p-4">
            <LoginForm users={users} pacientes={pacientes} doctors={doctors} admins={admins} />
        </div>
    );
}

