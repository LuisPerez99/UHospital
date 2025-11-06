package users

import (
	"fmt"
	"uhospital/backend/src/db"
	"uhospital/backend/src/utilities"
)

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

func RegisterAdmin(admin *Administrador, hashedPassword, username string) error {
	query := "CALL AgregarAdmin(?, ?, ?, ?, ?, ?)"
	_, err := db.Exec(
		query,
		admin.Nombre,
		admin.Apellido,
		admin.Telefono,
		admin.Email,
		hashedPassword,
		username,
	)
	if err != nil {
		fmt.Printf("Error registering admin: %v\n", err)
		return err
	}
	return nil
}

func RegisterPaciente(paciente *Paciente, hashedPassword string, username string) error {
	query := "CALL AgregarPaciente(?, ?, ?, ?, ?, ?, ?, ?, ?)"
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
	)
	if err != nil {
		fmt.Printf("Error registering paciente: %v\n", err)
		return err
	}
	return nil
}

func RegisterDoctor(doctor *Doctor, hashedPassword string, username string) error {
	query := "CALL AgregarDoctor(?, ?, ?, ?, ?, ?, ?)"
	_, err := db.Exec(
		query,
		doctor.Nombre,
		doctor.Apellido,
		doctor.Especialidad,
		doctor.Telefono,
		doctor.Email,
		hashedPassword,
		username,
	)
	if err != nil {
		fmt.Printf("Error registering doctor: %v\n", err)
		return err
	}
	return nil
}
