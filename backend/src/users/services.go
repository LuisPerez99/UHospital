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

func RegisterAdministrador(admin *Administrador) error {
	query := "INSERT INTO admin (nombre, apellido, telefono, email) VALUES (?, ?, ?, ?)"
	_, err := db.Exec(query, admin.Nombre, admin.Apellido, admin.Telefono, admin.Email)
	if err != nil {
		fmt.Printf("Error registering administrador: %v\n", err)
		return err
	}
	return nil
}
