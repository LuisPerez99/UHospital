package users

import (
	"net/http"

	"github.com/gin-gonic/gin"

	. "uhospital/backend/src/utilities"
)

func LoginHandler(c *gin.Context) {
	var user User
	if err := c.ShouldBindJSON(&user); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if LoginUser(user.Username, user.Password) {
		c.JSON(http.StatusOK, gin.H{"message": "Login successful"})
	} else {
		c.JSON(http.StatusUnauthorized, gin.H{"message": "Invalid credentials"})
	}
}

func RegisterHandler(c *gin.Context) {
	var user User
	if err := c.ShouldBindJSON(&user); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	hashed, err := HashPassword(user.Password)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to hash password"})
		return
	}
	user.Password = hashed

	if err := RegisterUser(&user); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to register user"})
		return
	}

	if user.Role == "administrador" {
		admin := Administrador{
			Nombre:   user.Username, // Assuming username as nombre for simplicity
			Apellido: "Apellido",    // Placeholder
			Telefono: "0000000000",  // Placeholder
			Email:    user.Email,
		}
		if err := RegisterAdministrador(&admin); err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to register administrador"})
			return
		}
	}

	c.JSON(http.StatusOK, gin.H{"message": "Registration successful"})
}
