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

## POST /captains/register

Registers a new captain in the system.

### Description
Creates a new captain account with the provided data. All fields are required and must be sent as a JSON payload.

### Request Body
```json
{
  "fullname": {
    "firstname": "string", // First name of the captain (required, min 3 characters)
    "lastname": "string"   // Last name of the captain (optional, min 3 characters)
  },
  "email": "string",       // Valid email address (required)
  "password": "string",    // Password (required, min 6 characters)
  "vehicle": {
    "color": "string",     // Vehicle color (required, min 3 characters)
    "plate": "string",     // Vehicle plate number (required, min 3 characters)
    "capacity": "integer", // Vehicle capacity (required, min 1)
    "vehicleType": "string" // Vehicle type (required, must be one of "car", "motorcycle", "auto")
  }
}
```

### Response

- **201 Created** - Captain successfully registered. Returns the created captain object and a token.
  ```json
  {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "captain": {
      "id": "12345",
      "fullname": {
        "firstname": "John",
        "lastname": "Doe"
      },
      "email": "john.doe@example.com",
      "vehicle": {
        "color": "Red",
        "plate": "ABC123",
        "capacity": 4,
        "vehicleType": "car"
      },
      "status": "inactive",
      "createdAt": "2026-03-03T12:00:00Z"
    }
  }
  ```
- **400 Bad Request** - Missing or invalid data in the request body.
  ```json
  {
    "errors": [
      {
        "msg": "First name is required",
        "param": "fullname.firstname",
        "location": "body"
      }
    ]
  }
  ```
- **500 Internal Server Error** - Unexpected error occurred on the server.

### Notes
- Ensure `Content-Type: application/json` header is set.
- Passwords should be hashed by the server; do not send pre-hashed values.

## GET /captains/profile

Retrieves the profile information of the authenticated captain.

### Response
- **200 OK**: Successfully retrieved captain profile.
  ```json
  {
    "captain": {
      "id": "12345",
      "fullname": {
        "firstname": "John",
        "lastname": "Doe"
      },
      "email": "john.doe@example.com",
      "vehicle": {
        "color": "Red",
        "plate": "ABC123",
        "capacity": 4,
        "vehicleType": "car"
      },
      "status": "inactive",
      "createdAt": "2026-03-03T12:00:00Z"
    }
  }
  ```
- **401 Unauthorized**: Unauthorized access.

### Notes
- Ensure the captain is authenticated by providing a valid token.

## GET /captains/logout

Logs out the authenticated captain by invalidating their session or token.

### Response
- **200 OK**: Successfully logged out.
  ```json
  {
    "message": "Logged out successfully"
  }
  ```
- **401 Unauthorized**: Unauthorized access.

### Notes
- Ensure the captain is authenticated by providing a valid token.