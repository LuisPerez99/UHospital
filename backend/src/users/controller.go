package users

import (
	"net/http"
	"time"

	"github.com/gin-gonic/gin"

	"uhospital/backend/src/utilities"
)

func LoginHandler(c *gin.Context) {
	var user User
	if err := c.ShouldBindJSON(&user); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if user.Email == "" || user.Password == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Email and password are required"})
		return
	}

	if !LoginUser(user) {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid credentials"})
		return
	}

	u, err := GetUserByEmail(user.Email)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Error retrieving user"})
		return
	}

	token, exp, err := utilities.GenerateJWT(u.ID, u.Username, u.Email, u.Role, 24*time.Hour)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Error generating token"})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"token":      token,
		"token_type": "Bearer",
		"expires_at": exp,
		"role":       u.Role,
		"email":      u.Email,
	})
}

func registerUserWithRole(c *gin.Context, user *User, roleData interface{}, registerRole func(hashedPassword, username string) error) {
	hashedPassword, err := utilities.HashPassword(user.Password)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Error hashing password"})
		return
	}

	if err := registerRole(hashedPassword, user.Username); err != nil {
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

	registerUserWithRole(c, &reqData.User, &reqData.Administrador, func(hashedPassword, username string) error {
		return RegisterAdmin(&reqData.Administrador, hashedPassword, username)
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

	registerUserWithRole(c, &reqData.User, &reqData.Paciente, func(hashedPassword, username string) error {
		return RegisterPaciente(&reqData.Paciente, hashedPassword, username)
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

	registerUserWithRole(c, &reqData.User, &reqData.Doctor, func(hashedPassword, username string) error {
		return RegisterDoctor(&reqData.Doctor, hashedPassword, username)
	})
}
