package users

import (
	"log"
	"os"
	"strconv"
	"testing"

	"uhospital/backend/src/db"

	"github.com/joho/godotenv"
)

func TestMain(m *testing.M) {
	// load env (adjust path if needed)
	_ = godotenv.Load("../../.env")

	dbPort, err := strconv.Atoi(os.Getenv("DB_PORT"))
	if err != nil {
		log.Fatalf("Invalid DB_PORT: %v", err)
	}

	if err := db.Connect(
		os.Getenv("DB_USER"),
		os.Getenv("DB_PASSWORD"),
		os.Getenv("DB_HOST"),
		os.Getenv("DB_NAME"),
		dbPort,
	); err != nil {
		log.Fatalf("Failed to connect to database: %v", err)
	}
	defer db.Close()

	os.Exit(m.Run())
}
