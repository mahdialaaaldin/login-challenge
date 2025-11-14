# Login Challenge - Full Stack Application

A secure login application built with React and ASP.NET Core, featuring JWT authentication and modern UI design.

## 🎯 Project Overview

This project demonstrates a complete authentication system with:
- Modern, responsive frontend using React
- Secure backend API with ASP.NET Core
- JWT token-based authentication
- Password hashing with BCrypt
- Database persistence with Entity Framework Core and SQLite

## 🏗️ Architecture
```
LoginChallenge/
├── LoginAPI/              # Backend - ASP.NET Core Web API
│   ├── Controllers/       # API endpoints
│   ├── Models/           # Data models
│   ├── Data/             # Database context
│   ├── Services/         # Business logic (JWT token generation)
│   └── logindb.db        # SQLite database
│
├── frontend/             # Frontend - React Application
│   ├── src/
│   │   ├── components/   # React components
│   │   └── services/     # API integration
│   └── package.json
│
└── README.md            # This file
```

## 🛠️ Technologies Used

### Backend
- **ASP.NET Core 8.0** - Web API framework
- **Entity Framework Core 8.0** - ORM for database operations
- **SQLite** - Lightweight database
- **BCrypt.Net** - Password hashing
- **JWT Bearer Authentication** - Token-based auth
- **Swagger/OpenAPI** - API documentation

### Frontend
- **React 18** - UI library
- **Vite** - Build tool and dev server
- **Axios** - HTTP client
- **CSS3** - Styling (matching Figma design)

## 🔒 Security Features

1. **Password Hashing**: Passwords are hashed using BCrypt before storage
2. **JWT Tokens**: Stateless authentication with expiring tokens (2-hour validity)
3. **HTTPS**: API enforces HTTPS in production
4. **CORS**: Configured to allow only specific origins
5. **Input Validation**: Both client-side and server-side validation
6. **SQL Injection Prevention**: Entity Framework parameterized queries
7. **Error Handling**: Secure error messages that don't leak sensitive information

## 📋 Prerequisites

Before running this application, ensure you have:

- **.NET 8.0 SDK** - [Download here](https://dotnet.microsoft.com/download)
- **Node.js (v18+)** - [Download here](https://nodejs.org/)
- **Visual Studio 2022** (optional, or use VS Code)
- **Git** - For version control

## 🚀 Setup and Installation

### 1. Clone the Repository
```bash
git clone https://github.com/mahdialaaaldin/login-challenge
cd LoginChallenge
```

### 2. Backend Setup
```bash
# Navigate to backend
cd LoginAPI

# Restore NuGet packages
dotnet restore

# Apply database migrations (creates logindb.db)
dotnet ef database update
# OR simply run the application, it will create the database automatically

# Run the API
dotnet run
```

The API will start at `https://localhost:7227` (or similar port shown in console)

**Default Test User:**
- Email: `test@example.com`
- Password: `Test123!`

### 3. Frontend Setup

Open a **new terminal window**:
```bash
# Navigate to frontend
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

The app will open at `http://localhost:5173`

### 4. Test the Application

1. Open `http://localhost:5173` in your browser
2. Enter credentials:
   - Email: `test@example.com`
   - Password: `Test123!`
3. Click "Login"
4. You should see a success message!

## 🧪 Testing the API

### Using Swagger UI

1. Navigate to `https://localhost:7227/swagger`
2. Expand `POST /api/Auth/login`
3. Click "Try it out"
4. Enter test credentials:
```json
   {
     "email": "test@example.com",
     "password": "Test123!"
   }
```
5. Click "Execute"

### Using cURL
```bash
curl -X POST https://localhost:7227/api/Auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"Test123!"}'
```

## 📐 Design Decisions

### Why SQLite?
- Zero configuration required
- Self-contained database file
- Perfect for development and demos
- Easy to share and replicate
- Can be easily migrated to SQL Server/PostgreSQL for production

### Why JWT?
- Stateless authentication (no server-side sessions)
- Works well with modern SPAs
- Can be used across multiple domains
- Industry standard for API authentication

## 🎨 UI/UX Decisions

- **Clean, minimal design** following Figma mockup
- **Form validation** with clear error messages
- **Loading states** to provide user feedback
- **Responsive design** works on mobile and desktop
- **Accessible** with proper labels and ARIA attributes

## ⚠️ Known Limitations

1. **Token Storage**: Tokens stored in localStorage (consider HttpOnly cookies for production)
2. **Single User**: Only one test user seeded in database
3. **No Password Reset**: Password recovery not implemented
4. **No Rate Limiting**: API doesn't limit login attempts (add in production)
5. **No Refresh Tokens**: Tokens expire after 2 hours (implement refresh tokens for production)
6. **Development Database**: Using SQLite (migrate to SQL Server/PostgreSQL for production)
7. **No Email Verification**: Users aren't verified via email
8. **HTTPS Certificate**: Development certificate may show warnings in browser

## Best Practices Implemented

### Backend
✅ Dependency Injection for services  
✅ Async/await for database operations  
✅ Data Transfer Objects (DTOs) for API responses  
✅ Model validation with DataAnnotations  
✅ Proper HTTP status codes  
✅ Structured logging  
✅ Database migrations  

### Frontend
✅ Component-based architecture  
✅ State management with React hooks  
✅ API service abstraction  
✅ Error boundary handling  
✅ Loading states for async operations  
✅ Form validation  
✅ Responsive design  
