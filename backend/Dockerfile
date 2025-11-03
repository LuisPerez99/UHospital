# Usar imagen de golang:alpine como base
FROM golang:alpine

# Establecer el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copiar go mod y go sum para descargar dependencias
COPY go.mod go.sum ./

# Descargar dependencias
RUN go mod download

# Copiar el código fuente de la aplicación al contenedor
COPY . .

# Compilar la aplicación
RUN go build -o main ./src

# Exponer el puerto en el que la aplicación escuchará
EXPOSE ${PORT}

# Comando para ejecutar la aplicación
CMD ["./main"]
