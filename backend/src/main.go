package main

import (
	"fmt"
	"net/http"

	"uhospital/backend/src/users"

	"github.com/gin-gonic/gin"

	"github.com/gin-contrib/cors"
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
	r := gin.Default()

	r.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"http://localhost:5173"},
		AllowMethods:     []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowHeaders:     []string{"Origin", "Content-Type", "Accept", "Authorization"},
		ExposeHeaders:    []string{"Content-Length"},
		AllowCredentials: true,
	}))

	r.GET("/ping", pingHandler)

	r.GET("/", homeHandler)

	r.POST("/post", postHandler)

	r.POST("/login", func(c *gin.Context) {
		var json struct {
			Username string `json:"username" binding:"required"`
			Password string `json:"password" binding:"required"`
		}

		if err := c.ShouldBindJSON(&json); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}

		if users.LoginUser(json.Username, json.Password) {
			c.JSON(http.StatusOK, gin.H{"message": "Login successful"})
		} else {
			c.JSON(http.StatusUnauthorized, gin.H{"message": "Invalid credentials"})
		}
	})

	err := r.Run(":8080")
	if err != nil {
		fmt.Println("Failed to start server:", err)
	}
}
