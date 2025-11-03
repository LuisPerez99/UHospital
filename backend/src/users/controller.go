package users

import (
	"net/http"

	"github.com/gin-gonic/gin"

	"uhospital/backend/src/utilities"
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
	var reqData struct {
		User          User          `json:"user"`
		Administrador Administrador `json:"administrador"`
	}

	if err := c.ShouldBindJSON(&reqData); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if reqData.User.Email != reqData.Administrador.Email {
		c.JSON(http.StatusBadRequest, gin.H{"error": "User email and Administrador email must match"})
		return
	}

	hashedPassword, err := utilities.HashPassword(reqData.User.Password)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Error hashing password"})
		return
	}
	reqData.User.Password = hashedPassword

	if err := RegisterUser(&reqData.User); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Error registering user"})
		return
	}

	if err := RegisterAdministrador(&reqData.Administrador); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Error registering administrador"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Registration successful"})
}
