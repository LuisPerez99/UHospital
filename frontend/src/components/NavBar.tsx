import { Link } from "react-router";

export function NavBar() {
    return (
        <nav className="bg-blue-600 p-4 text-white">
            <div className="container mx-auto flex justify-between items-center">
                <Link to="/" className="text-lg font-bold">
                    UHospital
                </Link>
                <div>
                    <Link to="/" className="mr-4 hover:bg-blue-700 px-3 py-2 rounded">
                        Home
                    </Link>
                    <Link to="/login" className="hover:bg-blue-700 px-3 py-2 rounded">
                        Login
                    </Link>
                </div>
            </div>
        </nav>
    )
}
