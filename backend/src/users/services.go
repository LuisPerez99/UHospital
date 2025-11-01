package users

func LoginUser(username, password string) bool {
	// Lógica de autenticación (simulada)
	return username == "admin" && password == "password"
}
