package users

type User struct {
	ID       int    `json:"id"`
	Email    string `json:"email"`
	Username string `json:"username"`
	Password string `json:"password"`
}

type Administrador struct {
	Nombre          string `json:"nombre"`
	FechaNacimiento string `json:"fecha_nacimiento"`
	Email           string `json:"email"`
	Telefono        string `json:"telefono"`
}

type Cliente struct {
	Nombre          string `json:"nombre"`
	FechaNacimiento string `json:"fecha_nacimiento"`
	Email           string `json:"email"`
	Telefono        string `json:"telefono"`
	Direccion       string `json:"direccion"`
}

type Doctor struct {
	Nombre          string `json:"nombre"`
	FechaNacimiento string `json:"fecha_nacimiento"`
	Email           string `json:"email"`
	Telefono        string `json:"telefono"`
	Especialidad    string `json:"especialidad"`
}
