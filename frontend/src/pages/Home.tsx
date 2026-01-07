export function Home() {
    return (
        <div className="p-4">
            <h2 className="text-lg font-bold">Bienvenido/a a UHospital</h2>
            {
                localStorage.getItem("loggedInUser") ? (
                    <p className="mt-2">Estás logueado como {JSON.parse(localStorage.getItem("loggedInUser") || "{}").username}</p>
                ) : (
                    <p className="mt-2"></p>
                )
            }
        </div>
    )
}