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