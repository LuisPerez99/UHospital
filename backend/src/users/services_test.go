package users

import (
	"fmt"
	"testing"
)

func TestUserService(t *testing.T) {
	// t.Run("TestCreateUser", func(t *testing.T) {
	// 	// Add test logic for creating a user

	// })

	t.Run("TestGetUserByEmail", func(t *testing.T) {
		email := "admin@uhospital.com"
		user, err := GetUserByEmail(email)
		if err != nil {
			t.Fatalf("GetUserByEmail returned error: %v", err)
		}
		if user == nil {
			t.Fatalf("expected a user for email %q, got nil", email)
		}
		if user.Email != email {
			t.Errorf("expected email %s, got %s", email, user.Email)
		}
		if user.Role != "ADMIN" {
			t.Errorf("expected role ADMIN, got %s", user.Role)
		}
		if user.Username != "admin_user" {
			t.Errorf("expected username admin, got %s", user.Username)
		}
		if user.Password != "" {
			t.Errorf("expected password to be empty, got %s", user.Password)
		}

		// print user data
		fmt.Printf("Retrieved user: %+v\n", user)
	})
	t.Run("TestLoginUser", func(t *testing.T) {
		user := User{
			Email:    "admin@uhospital.com",
			Password: "SecurePass123!",
		}
		if !LoginUser(user) {
			t.Errorf("LoginUser failed for user: %+v", user)
		}
	})
	t.Run("TestGetPacienteByEmail", func(t *testing.T) {
		email := "pdrpm93@live.com"
		paciente, err := GetPacienteByEmail(email)
		if err != nil {
			t.Fatalf("GetPacienteByEmail returned error: %v", err)
		}
		if paciente == nil {
			t.Fatalf("expected a paciente for email %q, got nil", email)
		}
		if paciente.Email != email {
			t.Errorf("expected email %s, got %s", email, paciente.Email)
		}

		// print paciente data
		fmt.Printf("Retrieved paciente: %+v\n", paciente)
	})
}
