package users

type User struct {
	ID       int    `json:"id"`
	Email    string `json:"email"`
	Password string `json:"password"`
	Username string `json:"username"`
	Role     string `json:"role"`
}

type Administrador struct {
	Nombre   string `json:"nombre"`
	Apellido string `json:"apellido"`
	Telefono string `json:"telefono"`
	Email    string `json:"email"`
}

type Paciente struct {
	Nombre          string `json:"nombre"`
	Apellido        string `json:"apellido"`
	Email           string `json:"email"`
	FechaNacimiento string `json:"fecha_nacimiento"`
	Genero          string `json:"genero"`
	Telefono        string `json:"telefono"`
	Direccion       string `json:"direccion"`
}

type Doctor struct {
	Nombre       string `json:"nombre"`
	Apellido     string `json:"apellido"`
	Especialidad string `json:"especialidad"`
	Email        string `json:"email"`
	Telefono     string `json:"telefono"`
}
