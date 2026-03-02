# API Documentation

## POST /users/register

Registers a new user in the system.

### Description
Creates a new user account with the provided data. All fields are required and must be sent as a JSON payload.

### Request Body
```json
{
  "fullname": {
    "firstname": "string", // First name of the user (required, min 3 characters)
    "lastname": "string"   // Last name of the user (optional, min 3 characters)
  },
  "email": "string",       // Valid email address (required)
  "password": "string"     // Password (required, min 6 characters)
}
```

### Response

- **201 Created** - User successfully registered. Returns the created user object and a token.
  ```json
  {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
      "id": "12345",
      "fullname": {
        "firstname": "John",
        "lastname": "Doe"
      },
      "email": "john.doe@example.com",
      "createdAt": "2026-03-01T12:00:00Z"
    }
  }
  ```
- **400 Bad Request** - Missing or invalid data in the request body.
- **409 Conflict** - An account with the given email already exists.
- **500 Internal Server Error** - Unexpected error occurred on the server.

### Notes
- Ensure `Content-Type: application/json` header is set.
- Passwords should be hashed by the server; do not send pre-hashed values.

## POST /users/login

Authenticates a user and returns a token.

### Request Body
- `email`: Valid email address (required)
- `password`: Password (required, min 6 characters)

#### Example
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

### Response
- **200 OK**: User successfully authenticated. Returns a token and user details.
  ```json
  {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
      "id": "12345",
      "fullname": {
        "firstname": "John",
        "lastname": "Doe"
      },
      "email": "john.doe@example.com",
      "createdAt": "2026-03-01T12:00:00Z"
    }
  }
  ```
- **400 Bad Request**: Missing or invalid data in the request body.
- **401 Unauthorized**: Invalid email or password.
- **500 Internal Server Error**: Unexpected error occurred on the server.

### Notes
- Ensure `Content-Type: application/json` header is set.
- Passwords are securely compared on the server; do not send pre-hashed values.

## GET /users/profile

Retrieves the profile information of the authenticated user.

### Response
- **200 OK**: Successfully retrieved user profile.
  ```json
  {
    "id": "12345",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john.doe@example.com",
    "createdAt": "2026-03-01T12:00:00Z"
  }
  ```
- **401 Unauthorized**: Unauthorized access.

### Notes
- Ensure the user is authenticated by providing a valid token.

## GET /users/logout

Logs out the authenticated user by invalidating their session or token.

### Response
- **200 OK**: Successfully logged out.
  ```json
  {
    "message": "Logged out successfully"
  }
  ```
- **401 Unauthorized**: Unauthorized access.

### Notes
- Ensure the user is authenticated by providing a valid token.