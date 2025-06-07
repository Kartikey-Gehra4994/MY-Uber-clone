# User Registration Endpoint Documentation

## Endpoint

`POST /users/register`

## Description
Registers a new user in the system. This endpoint validates the input, hashes the password, creates a user, and returns an authentication token along with the user object.

## Request Body
Send a JSON object with the following structure:

```
{
  "fullname": {
    "firstname": "<string, required, min 3 chars>",
    "lastname": "<string, optional, min 3 chars>"
  },
  "email": "<string, required, valid email>",
  "password": "<string, required, min 6 chars>"
}
```

### Example
```
{
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "john.doe@example.com",
  "password": "password123"
}
```

## Responses

### Success (201 Created)
```
Status: 201
{
  "token": "<jwt_token>",
  "user": {
    "_id": "...",
    "fullname": { "firstname": "John", "lastname": "Doe" },
    "email": "john.doe@example.com",
    ...
  }
}
```

### Validation Error (422 Unprocessable Entity)
```
Status: 422
{
  "errors": [
    { "msg": "First name must be at least 3 characters long", ... },
    { "msg": "Please enter a valid email address", ... },
    ...
  ]
}
```

### Other Errors
- `400`/`500` for server or unexpected errors.

## Notes
- The password is securely hashed before storage.
- The email must be unique.
- Returns a JWT token for authentication in subsequent requests.

---

# User Login Endpoint Documentation

## Endpoint

`POST /users/login`

## Description
Authenticates a user with email and password. Returns a JWT token and user object on success.

## Request Body
Send a JSON object with the following structure:

```
{
  "email": "<string, required, valid email>",
  "password": "<string, required, min 6 chars>"
}
```

### Example
```
{
  "email": "john.doe@example.com",
  "password": "password123"
}
```

## Responses

### Success (200 OK)
```
Status: 200
{
  "token": "<jwt_token>",
  "user": {
    "_id": "...",
    "fullname": { "firstname": "John", "lastname": "Doe" },
    "email": "john.doe@example.com",
    ...
  }
}
```

### Validation Error (422 Unprocessable Entity)
```
Status: 422
{
  "errors": [
    { "msg": "Please enter a valid email address", ... },
    { "msg": "Password must be at least 6 characters long", ... },
    ...
  ]
}
```

### Authentication Error (401 Unauthorized)
```
Status: 401
{
  "message": "Invalid email or password"
}
```

### Other Errors
- `400`/`500` for server or unexpected errors.

## Notes
- Returns a JWT token for authentication in subsequent requests.
- Password is never returned in the response.

---

# Get User Profile Endpoint Documentation

## Endpoint

`GET /users/profile`

## Description
Returns the authenticated user's profile information. Requires a valid JWT token (sent as a cookie or Bearer token in the Authorization header).

## Request Headers
- `Authorization: Bearer <jwt_token>` (if not using cookies)
- Or send the token as a cookie named `token`.

## Responses

### Success (200 OK)
```
Status: 200
{
  "_id": "...",
  "fullname": { "firstname": "John", "lastname": "Doe" },
  "email": "john.doe@example.com",
  ...
}
```

### Authentication Error (401 Unauthorized)
```
Status: 401
{
  "message": "Unauthorized"
}
```

### Other Errors
- `400`/`500` for server or unexpected errors.

## Notes
- Requires authentication middleware.
- Returns the user object for the currently authenticated user.

---

# User Logout Endpoint Documentation

## Endpoint

`GET /users/logout`

## Description
Logs out the authenticated user by clearing the authentication cookie and blacklisting the JWT token. Requires a valid JWT token (sent as a cookie or Bearer token in the Authorization header).

## Request Headers
- `Authorization: Bearer <jwt_token>` (if not using cookies)
- Or send the token as a cookie named `token`.

## Responses

### Success (200 OK)
```
Status: 200
{
  "message": "Logged out successfully"
}
```

### Authentication Error (401 Unauthorized)
```
Status: 401
{
  "message": "Unauthorized"
}
```

### Other Errors
- `400`/`500` for server or unexpected errors.

## Notes
- Requires authentication middleware.
- The JWT token is blacklisted and the cookie is cleared.
- User must be authenticated to log out.


## Captain Registration Endpoint Documentation
## Endpoint
- `POST /captain/register`

Description
Registers a new captain (driver) in the system. This endpoint validates the input, creates a captain with vehicle details, and returns the created captain object.

Request Body
Send a JSON object with the following structure:
```
{
  "fullname": {
    "firstname": "<string, required, min 3 chars>",
    "lastname": "<string, optional, min 3 chars>"
  },
  "email": "<string, required, valid email>",
  "password": "<string, required, min 6 chars>",
  "vehicle": {
    "color": "<string, required, min 3 chars>",
    "plate": "<string, required, min 3 chars>",
    "capacity": <integer, required, min 1>,
    "vehicleType": "<string, required, one of: car, motorcycle, auto>"
  }
}
```

## Example
```
{
  "fullname": {
    "firstname": "Jane",
    "lastname": "Smith"
  },
  "email": "jane.smith@example.com",
  "password": "securepass",
  "vehicle": {
    "color": "Red",
    "plate": "XYZ123",
    "capacity": 4,
    "vehicleType": "car"
  }
}
```
## Responses
- `Success (201 Created)`
- `Status: 201`
```
{
  "_id": "...",
  "fullname": { "firstname": "Jane", "lastname": "Smith" },
  "email": "jane.smith@example.com",
  "vehicle": {
    "color": "Red",
    "plate": "XYZ123",
    "capacity": 4,
    "vehicleType": "car"
  },
  ...
}
```

## Validation Error (422 Unprocessable Entity)
```
Status: 422
{
  "errors": [
    { "msg": "First name must be at least 3 characters long", ... },
    { "msg": "Vehicle type must be one of car, motorcycle, or auto", ... },
    ...
  ]
}
```

## Other Errors
`400/500 for server or unexpected errors.
Notes`
- All fields are required except lastname.
- Vehicle type must be one of: car, motorcycle, auto.
- Returns the created captain object on success.

# 🚖 Captain API - Quick Reference

## Base URL
/captains

## 1. 🚀 Register Captain  
**POST** `/captains/register`

### Request Body
```
{
  "fullname": {
    "firstname": "Jane",      // required, min 3 chars
    "lastname": "Smith"       // optional
  },
  "email": "jane@example.com",  // required, valid
  "password": "secure123",      // required, min 6 chars
  "vehicle": {
    "color": "Red",              // required
    "plate": "XYZ123",           // required
    "capacity": 4,               // required, number
    "vehicleType": "car"         // required: car | motorcycle | auto
  }
}
```
Response

```
{
  "token": "<jwt_token>",
  "captain": { "fullname": { "firstname": "Jane" }, "email": "..." }
}
```
## 2. 🔑 Login Captain
`POST /captains/login`

Request Body
```
{
  "email": "jane@example.com",   // required
  "password": "secure123"        // required
}
```
Response
```
{
  "token": "<jwt_token>",
  "captain": { "email": "..." }
}
```
## 3. 👤 Get Profile
`GET /captains/profile`

Headers
```
Authorization: Bearer <token>
```
Response
```
{
  "captain": { "fullname": { "firstname": "Jane" }, "email": "..." }
}
```
## 4. 🚪 Logout
`GET /captains/logout`

Headers
```
Authorization: Bearer <token>
```
Response
```
{ "message": "Logout successfully" }
```
## ✅ Notes
- All endpoints use application/json

- Token is required for profile/logout

- Password is hashed, token is JWT-based

