# LoginAPI - Backend Documentation

ASP.NET Core Web API for authentication services.

## 🔌 API Endpoints

### POST /api/Auth/login
Authenticates user and returns JWT token.

**Request:**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "Login successful",
  "token": "eyJhbGc...",
  "email": "user@example.com"
}
```

**Error Response (401):**
```json
{
  "success": false,
  "message": "Invalid email or password",
  "token": null,
  "email": null
}
```

### GET /api/Auth/health
Health check endpoint.

**Response:**
```json
{
  "status": "API is running",
  "timestamp": "2024-11-13T10:30:00Z"
}
```

## 🗄️ Database Schema

### Users Table
| Column | Type | Constraints |
|--------|------|-------------|
| Id | INTEGER | PRIMARY KEY, AUTO INCREMENT |
| Email | TEXT | NOT NULL, UNIQUE |
| PasswordHash | TEXT | NOT NULL |
| CreatedAt | DATETIME | NOT NULL, DEFAULT UTC NOW |

## 🔑 JWT Token Structure
```json
{
  "sub": "user@example.com",
  "jti": "unique-token-id",
  "nameid": "user-id",
  "email": "user@example.com",
  "exp": 1699889400
}
```

## 🛡️ Security Configuration

- Passwords hashed with BCrypt (work factor: 11)
- JWT tokens signed with HMAC-SHA256
- Token validity: 2 hours
- CORS enabled for specific origins only
- HTTPS enforced