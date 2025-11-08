package users

import (
	"fmt"
	"uhospital/backend/src/db"
	"uhospital/backend/src/utilities"
)

var ErrEmailExists = fmt.Errorf("email ya registrado")

func LoginUser(user User) bool {
	query := "SELECT password FROM usuario WHERE email = ?"
	row := db.QueryRow(query, user.Email)

	var hashedPassword string
	err := row.Scan(&hashedPassword)
	if err != nil {
		fmt.Printf("Error retrieving user: %v\n", err)
		return false
	}

	return utilities.CheckPasswordHash(user.Password, hashedPassword)
}

func GetUserByEmail(email string) (*User, error) {
	query := "SELECT id, email, username, rol FROM usuario WHERE email = ?"
	row := db.QueryRow(query, email)

	var user User
	err := row.Scan(&user.ID, &user.Email, &user.Username, &user.Role)
	if err != nil {
		fmt.Printf("Error retrieving user by email: %v\n", err)
		return nil, err
	}

	return &user, nil
}

func GetPacienteByEmail(email string) (*Paciente, error) {
	query := "SELECT id, nombre, apellido, fecha_nacimiento, genero, telefono, direccion, email FROM paciente WHERE email = ?"
	row := db.QueryRow(query, email)

	var paciente Paciente
	err := row.Scan(&paciente.ID, &paciente.Nombre, &paciente.Apellido, &paciente.FechaNacimiento, &paciente.Genero, &paciente.Telefono, &paciente.Direccion, &paciente.Email)
	if err != nil {
		fmt.Printf("Error retrieving paciente by email: %v\n", err)
		return nil, err
	}
	return &paciente, nil
}

func GetAdminByEmail(email string) (*Administrador, error) {
	query := "SELECT id, nombre, apellido, telefono, email FROM administrador WHERE email = ?"
	row := db.QueryRow(query, email)

	var admin Administrador
	err := row.Scan(&admin.ID, &admin.Nombre, &admin.Apellido, &admin.Telefono, &admin.Email)
	if err != nil {
		fmt.Printf("Error retrieving administrador by email: %v\n", err)
		return nil, err
	}
	return &admin, nil
}

func GetDoctorByEmail(email string) (*Doctor, error) {
	query := "SELECT id, nombre, apellido, especialidad, telefono, email FROM doctor WHERE email = ?"
	row := db.QueryRow(query, email)

	var doctor Doctor
	err := row.Scan(&doctor.ID, &doctor.Nombre, &doctor.Apellido, &doctor.Especialidad, &doctor.Telefono, &doctor.Email)
	if err != nil {
		fmt.Printf("Error retrieving doctor by email: %v\n", err)
		return nil, err
	}
	return &doctor, nil
}

func RegisterAdmin(admin *Administrador, hashedPassword, username string, rol string) error {
	query := "CALL AgregarAdmin(?, ?, ?, ?, ?, ?, ?)"
	_, err := db.Exec(
		query,
		admin.Nombre,
		admin.Apellido,
		admin.Telefono,
		admin.Email,
		hashedPassword,
		username,
		rol,
	)
	if err != nil {
		if db.MySQLErrorCode(err) == 1062 {
			return ErrEmailExists
		}
		fmt.Printf("Error al registrar el administrador: %v\n", err)
		return err
	}
	return nil
}

func RegisterPaciente(paciente *Paciente, hashedPassword string, username string, rol string) error {
	fmt.Println("Rol: ", rol)
	query := "CALL AgregarPaciente(?, ?, ?, ?, ?, ?, ?, ?, ?, ?)"
	_, err := db.Exec(
		query,
		paciente.Nombre,
		paciente.Apellido,
		paciente.FechaNacimiento,
		paciente.Genero,
		paciente.Telefono,
		paciente.Direccion,
		paciente.Email,
		hashedPassword,
		username,
		rol,
	)
	if err != nil {
		if db.MySQLErrorCode(err) == 1062 {
			return ErrEmailExists
		}
		fmt.Printf("Error al registrar el paciente: %v\n", err)
		return err
	}
	return nil
}

func RegisterDoctor(doctor *Doctor, hashedPassword string, username string, rol string) error {
	query := "CALL AgregarDoctor(?, ?, ?, ?, ?, ?, ?, ?)"
	_, err := db.Exec(
		query,
		doctor.Nombre,
		doctor.Apellido,
		doctor.Especialidad,
		doctor.Telefono,
		doctor.Email,
		hashedPassword,
		username,
		rol,
	)
	if err != nil {
		if db.MySQLErrorCode(err) == 1062 {
			return ErrEmailExists
		}
		fmt.Printf("Error al registrar el doctor: %v\n", err)
		return err
	}
	return nil
}
