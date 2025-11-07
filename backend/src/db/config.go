package db

import (
	"context"
	"database/sql"
	"fmt"
	"time"

	mysql "github.com/go-sql-driver/mysql"
)

var DB *sql.DB

func Connect(user, password, host, dbname string, port int) error {
	dsn := fmt.Sprintf("%s:%s@tcp(%s:%d)/%s", user, password, host, port, dbname)
	var err error
	DB, err = sql.Open("mysql", dsn)
	if err != nil {
		return err
	}

	// probar conexion
	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()
	if err := DB.PingContext(ctx); err != nil {
		_ = DB.Close()
		return err
	}
	return nil
}

func Close() error {
	if DB != nil {
		return DB.Close()
	}
	return nil
}

func Exec(query string, args ...interface{}) (sql.Result, error) {
	return DB.Exec(query, args...)
}

func Query(query string, args ...interface{}) (*sql.Rows, error) {
	return DB.Query(query, args...)
}

func QueryRow(query string, args ...interface{}) *sql.Row {
	return DB.QueryRow(query, args...)
}

func MySQLErrorCode(err error) uint16 {
	if mysqlErr, ok := err.(*mysql.MySQLError); ok {
		return mysqlErr.Number
	}
	return 0
}
