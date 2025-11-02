package main

import (
	"fmt"
	"net/http"
	"strconv"

	"uhospital/backend/src/db"
	"uhospital/backend/src/users"

	"github.com/gin-gonic/gin"

	"github.com/gin-contrib/cors"

	"github.com/joho/godotenv"

	"os"
)

func homeHandler(c *gin.Context) {
	c.JSON(http.StatusOK, gin.H{
		"message": "Welcome to the Home Page!",
	})
}

func pingHandler(c *gin.Context) {
	c.JSON(http.StatusOK, gin.H{
		"message": "pong",
	})
}

func postHandler(c *gin.Context) {
	var json struct {
		Name string `json:"name" binding:"required"`
	}

	if err := c.ShouldBindJSON(&json); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	fmt.Printf("JSON recibido: %+v\n", json)

	c.JSON(http.StatusOK, gin.H{
		"message": fmt.Sprintf("Hola, %s!", json.Name),
	})
}

func main() {
	err := godotenv.Load()
	if err != nil {
		fmt.Println("Error loading .env file:", err)
	}

	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}

	origin_port := os.Getenv("ORIGIN_PORT")
	if origin_port == "" {
		origin_port = "5173"
	}

	hostname := os.Getenv("HOSTNAME")
	if hostname == "" {
		hostname = "localhost"
	}
	// Inicializar la base de datos
	dbPortStr := os.Getenv("DB_PORT")
	if dbPortStr == "" {
		fmt.Println("DB_PORT is not set")
		return
	}
	dbPort, err := strconv.Atoi(dbPortStr)
	if err != nil {
		fmt.Printf("Invalid DB_PORT value: %v\n", err)
		return
	}

	err = db.Connect(os.Getenv("DB_USER"), os.Getenv("DB_PASSWORD"), os.Getenv("DB_HOST"), os.Getenv("DB_NAME"), dbPort)
	if err != nil {
		fmt.Println("Error connecting to the database:", err)
		return
	}
	defer db.Close()

	fmt.Printf("Conectado a la base de datos %s en %s:%d\n", os.Getenv("DB_NAME"), os.Getenv("DB_HOST"), dbPort)

	r := gin.Default()

	r.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"http://" + hostname + ":" + origin_port},
		AllowMethods:     []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowHeaders:     []string{"Origin", "Content-Type", "Accept", "Authorization"},
		ExposeHeaders:    []string{"Content-Length"},
		AllowCredentials: true,
	}))

	r.GET("/ping", pingHandler)

	r.GET("/", homeHandler)

	r.POST("/post", postHandler)

	usersGroup := r.Group("/api/users")
	users.UserRoutes(usersGroup)

	err = r.Run(":" + port)
	if err != nil {
		fmt.Println("Error starting server:", err)
	}
}
