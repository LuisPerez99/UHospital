package main

import (
	"fmt"
	"net/http"

	"github.com/gin-gonic/gin"
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

	r.GET("/ping", pingHandler)

	r.GET("/", homeHandler)

	r.POST("/post", postHandler)

	err := r.Run(":8080")
	if err != nil {
		fmt.Println("Failed to start server:", err)
	}
}
