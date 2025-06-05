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
