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

func registerUserWithRole(c *gin.Context, user *User, registerRole func() error) {
	hashedPassword, err := utilities.HashPassword(user.Password)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Error hashing password"})
		return
	}
	user.Password = hashedPassword

	if err := RegisterUser(user); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Error registering user"})
		return
	}

	if err := registerRole(); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Error registering role-specific data"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Registration successful"})
}

func RegisterAdminHandler(c *gin.Context) {
	var reqData struct {
		User          User          `json:"user"`
		Administrador Administrador `json:"administrador"`
	}

	if err := c.ShouldBindJSON(&reqData); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	registerUserWithRole(c, &reqData.User, func() error {
		return RegisterAdmin(&reqData.Administrador)
	})
}

func RegisterPacienteHandler(c *gin.Context) {
	var reqData struct {
		User     User     `json:"user"`
		Paciente Paciente `json:"paciente"`
	}

	if err := c.ShouldBindJSON(&reqData); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	registerUserWithRole(c, &reqData.User, func() error {
		return RegisterPaciente(&reqData.Paciente)
	})
}

func RegisterDoctorHandler(c *gin.Context) {
	var reqData struct {
		User   User   `json:"user"`
		Doctor Doctor `json:"doctor"`
	}

	if err := c.ShouldBindJSON(&reqData); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	registerUserWithRole(c, &reqData.User, func() error {
		return RegisterDoctor(&reqData.Doctor)
	})
}
