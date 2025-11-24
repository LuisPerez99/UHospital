import { LoginForm } from "../components/LoginForm"
import type { User } from "../models/models";

interface LoginProps {
    users: User[];
}

export function Login({ users }: LoginProps) {
    return (
        <div className="p-4">
            <LoginForm users={users} />
        </div>
    )
}

