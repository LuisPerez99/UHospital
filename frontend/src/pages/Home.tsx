export function Home() {
    return (
        <div className="p-4">
            <h2 className="text-lg font-bold">Bienvenido/a a UHospital</h2>
            {
                localStorage.getItem("token") ? (
                    <p className="mt-2">Estás logueado como {localStorage.getItem("userEmail")}</p>
                ) : (
                    <p className="mt-2"></p>
                )
            }
        </div>
    )
}