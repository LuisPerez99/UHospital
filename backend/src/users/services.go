package users

import (
	"fmt"
	"uhospital/backend/src/db"
)

func LoginUser(username, password string) bool {
	// Lógica de autenticación (simulada)
	return username == "admin" && password == "password"
}

func RegisterUser(user *User) error {
	query := "INSERT INTO usuario (email, password, username, rol) VALUES (?, ?, ?, ?)"
	_, err := db.Exec(query, user.Email, user.Password, user.Username, user.Role)
	if err != nil {
		fmt.Printf("Error registering user: %v\n", err)
		return err
	}
	return nil
}

func RegisterAdmin(admin *Administrador) error {
	query := "INSERT INTO admin (nombre, apellido, telefono, email) VALUES (?, ?, ?, ?)"
	_, err := db.Exec(query, admin.Nombre, admin.Apellido, admin.Telefono, admin.Email)
	if err != nil {
		fmt.Printf("Error registering administrador: %v\n", err)
		return err
	}
	return nil
}

func RegisterPaciente(paciente *Paciente) error {
	query := "INSERT INTO paciente (nombre, apellido, email, fecha_nacimiento, genero, telefono, direccion) VALUES (?, ?, ?, ?, ?, ?, ?)"
	_, err := db.Exec(query, paciente.Nombre, paciente.Apellido, paciente.Email, paciente.FechaNacimiento, paciente.Genero, paciente.Telefono, paciente.Direccion)
	if err != nil {
		fmt.Printf("Error registering paciente: %v\n", err)
		return err
	}
	return nil
}

func RegisterDoctor(doctor *Doctor) error {
	query := "INSERT INTO doctor (nombre, apellido, especialidad, email, telefono) VALUES (?, ?, ?, ?, ?)"
	_, err := db.Exec(query, doctor.Nombre, doctor.Apellido, doctor.Especialidad, doctor.Email, doctor.Telefono)
	if err != nil {
		fmt.Printf("Error registering doctor: %v\n", err)
		return err
	}
	return nil
}
