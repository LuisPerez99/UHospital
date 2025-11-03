package users

import (
	"github.com/gin-gonic/gin"
)

func UserRoutes(r *gin.RouterGroup) {
	r.POST("/login", LoginHandler)
	r.POST("/register/admin", RegisterAdminHandler)
	r.POST("/register/paciente", RegisterPacienteHandler)
	r.POST("/register/doctor", RegisterDoctorHandler)
}
