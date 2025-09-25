# Hacker Backend Task

## Installation
# Clone the repository
git clone https://github.com/raahulpandey/hacker-backend-task.git

# Navigate into project folder
cd hacker-backend-task

# Install dependencies
npm install

# Start the server
npm start

The server runs on PORT 5000 by default.

## Routes & Usage

Level 1 & 2 – Basic Routes
GET /ping, GET /time, GET /random, POST /echo (Refer to previous README for sample request/response)

Level 3 – File-based CRUD for Users
GET /users, GET /users/:id, POST /users, PUT /users/:id, DELETE /users/:id
File-based storage in users.json with validation.

Level 4 – Modular Structure
Controllers handle logic
Routes handle endpoints
Middleware handles logging
App.js is the entry point

Level 5 – Authentication & Protected Routes
POST /auth/register → Register new user with hashed password
POST /auth/login → Login user and get JWT token
GET /auth/profile → Protected route, accessible only with valid JWT token

Example: Register User
POST /auth/register
{
  "username": "rahul",
  "password": "123456"
}
Response:
{
  "message": "user registered",
  "user": 1,
  "username": "rahul"
}

Example: Login User
POST /auth/login
{
  "username": "rahul",
  "password": "123456"
}
Response:
{
  "message": "login successfully",
  "token": "eyJhbGciOiJIUzI1NiIsInR..."
}

Example: Access Protected Profile
GET /auth/profile
Headers: Authorization: Bearer <JWT_TOKEN>
Response:
{
  "message": "profile accessed",
  "user": {
    "id": 1,
    "username": "rahul"
  }
}

JWT token is used for authentication
authMiddleware.js verifies token and protects routes
Passwords are hashed using bcryptjs

## Features
Stepwise learning from basic routes → CRUD → Modular design → JWT Authentication
File-based user management (users.json)
Input validation and error handling
Logger middleware for request logging
JWT-based authentication with protected routes
Catch-all 404 route

## Phase 1: Core Backend with Node.js + Express
Node.js Basics
JS vs Node.js
Modules (require, module.exports)
Global objects (__dirname, __filename, process)
Event loop & asynchronous programming

Express.js Fundamentals
Setting up an Express server
Routes: GET, POST, PUT, DELETE
Middleware: app.use(), express.json(), custom middleware
Error handling & 404 routes

Data Storage
JSON-based storage for users and other resources
Reading/writing JSON files
CRUD operations in JSON (Create, Read, Update, Delete)

Authentication
User registration & login
Password hashing with bcryptjs
Token-based authentication using JWT

Role-Based Access Control (RBAC)
Middleware for role checking
Protecting routes (admin, user, dashboard)
Understanding HTTP status codes: 401, 403

API Testing
Using Postman or Insomnia
Testing all CRUD + Auth + RBAC endpoints

## Phase 2: Deployment & Environment

Environment Variables
.env files
Using process.env
Secrets for JWT, DB connections

Deployment
Platforms: Render, Heroku, Railway, Vercel (Node.js support)
Connect GitHub repository
Configure Build & Start commands (npm install, node index.js)
Deploy backend and test API on a live URL

## Environment Example
Create a `.env` file in the root:
PORT=5000
JWT_SECRET=your_jwt_secret

For sharing the repo, include `.env.example` instead of `.env`:
# .env.example
PORT=5000
JWT_SECRET=your_jwt_secret

Add `.env` to `.gitignore` to keep secrets safe.

## Author
Rahul Pandey
