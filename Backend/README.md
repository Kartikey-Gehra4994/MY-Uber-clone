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
