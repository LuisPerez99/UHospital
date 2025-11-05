# UHospital API Documentation

## Users API

These endpoints live under the users router group. If you mount `UserRoutes` under `/users`, the full paths are shown below (adjust to your router prefix if different).

### POST /users/login

- Description: Authenticate a user and receive a JWT.
- Request JSON:

```json
{
  "email": "user@example.com",
  "password": "YourPassword123"
}
```

- Successful response (HTTP 200):

```json
{
  "token": "<jwt-token>",
  "token_type": "Bearer",
  "expires_at": "2025-11-05T15:04:05Z",
  "role": "administrador"
}
```

Note: the handler returns the user's role in the response and issues a JWT using the user's id, username, email and role.

### POST /users/register/admin

- Description: Register a user with role `administrador` and the corresponding administrador record.
- Request JSON:

```json
{
  "user": {
    "email": "admin@uhospital.com",
    "password": "SecurePass123!",
    "username": "admin_user",
    "rol": "administrador"
  },
  "administrador": {
    "nombre": "Juan",
    "apellido": "Pérez",
    "telefono": "+34612345678",
    "email": "admin@uhospital.com"
  }
}
```

- Successful response (HTTP 200):

```json
{ "message": "Registration successful" }
```

### POST /users/register/paciente

- Description: Register a user with role `paciente` and create a paciente record.
- Request JSON:

```json
{
  "user": {
    "email": "maria.garcia@example.com",
    "password": "SecurePass123!",
    "username": "maria.garcia",
    "rol": "paciente"
  },
  "paciente": {
    "nombre": "María",
    "apellido": "García",
    "email": "maria.garcia@example.com",
    "fecha_nacimiento": "1992-08-15",
    "genero": "F",
    "telefono": "+34911222333",
    "direccion": "Calle Mayor 123, Madrid"
  }
}
```

- Successful response (HTTP 200):

```json
{ "message": "Registration successful" }
```

### POST /users/register/doctor

- Description: Register a user with role `doctor` and create a doctor record.
- Request JSON:

```json
{
  "user": {
    "email": "dr.sanchez@example.com",
    "password": "StrongPass456!",
    "username": "dr.sanchez",
    "rol": "doctor"
  },
  "doctor": {
    "nombre": "Carlos",
    "apellido": "Sánchez",
    "especialidad": "Cardiología",
    "email": "dr.sanchez@example.com",
    "telefono": "+34910000000"
  }
}
```

- Successful response (HTTP 200):

```json
{ "message": "Registration successful" }
```

## Authentication and protected routes

- The backend issues a JWT on successful login. Include it on protected requests using the `Authorization` header:

```
Authorization: Bearer <token>
```

- The project includes middleware helpers (`middleware.Auth()` and `middleware.RoleRequired(...)`) that:
	- validate the token,
	- populate context values such as `userID`, `username`, `email`, and `role`, and
	- enforce role-based access (for example, `RoleRequired("administrador")`).

## Notes and validation suggestions

- Ensure `user.email` matches the role-specific record `email` when you require linking between the two records (current registration handlers expect a corresponding object in the JSON).
- Passwords are hashed server-side by the `registerUserWithRole` helper before saving.
- In production, set a strong `JWT_SECRET` environment variable and use HTTPS for all requests.

