  HACKER BACKEND TASK - OVERVIEW

| Section                        | Details                                                                                                   |
|--------------------------------|-----------------------------------------------------------------------------------------------------------|
| Project Overview                | Stepwise Node.js + Express backend learning journey covering: Basic routes, File-based CRUD, Modular design, JWT Authentication, Deployment-ready with env variables |
| Installation                    | 1. git clone https://github.com/raahulpandey/hacker-backend-task.git                                      |
|                                | 2. cd hacker-backend-task                                                                                 |
|                                | 3. npm install                                                                                             |
|                                | 4. npm start                                                                                               |
| Server                          | Runs on PORT 5000 by default                                                                              |
| Environment Variables (.env)    | PORT=5000                                                                                                 |
|                                | MONGO_URL=your_mongodb_connection_string                                                                 |
|                                | JWT_SECRET=supersecret                                                                                    |
|                                | JWT_EXPIRES_IN=1h                                                                                         |
|                                | Add .env to .gitignore to keep secrets safe. Include .env.example for reference                           |

| LEVEL 1 & 2 - BASIC ROUTES      | Method | Endpoint | Description                               |
|--------------------------------|--------|----------|-------------------------------------------|
| Check server running            | GET    | /ping    | Check server is running                    |
| Current server time             | GET    | /time    | Get current server time                    |
| Random number                   | GET    | /random  | Get random number (query: min, max)       |
| Echo JSON payload               | POST   | /echo    | Echo back JSON payload                     |

Example POST /echo:
{
  "name": "Rahul",
  "age": 21
}

Response:
{
  "success": true,
  "you_sent": { "name": "Rahul", "age": 21 }
}

| LEVEL 3 - FILE-BASED CRUD USERS | Method | Endpoint    | Description               |
|--------------------------------|--------|------------|---------------------------|
| Get all users                  | GET    | /user      | Get all users             |
| Get user by ID                 | GET    | /user/:id  | Get user by ID            |
| Create user                    | POST   | /user      | Body: name, age           |
| Update user                    | PUT    | /user/:id  | Body: name, age           |
| Delete user                    | DELETE | /user/:id  | Delete user               |

| LEVEL 5 - AUTHENTICATION & PROTECTED ROUTES | Method | Endpoint        | Description                     |
|--------------------------------------------|--------|----------------|---------------------------------|
| Register new user                          | POST   | /auth/register | Body: username, password        |
| Login & get JWT token                       | POST   | /auth/login    | Body: username, password        |
| Get user profile (protected)               | GET    | /auth/profile  | Headers: Authorization: Bearer <JWT_TOKEN> |
| Admin-only access (protected)              | GET    | /auth/admin    | Admin role required             |
| Dashboard access (protected)               | GET    | /auth/dashboard| Admin & User access             |

Example Register POST /auth/register:
{
  "username": "rahul",
  "password": "123456"
}

Response:
{
  "message": "user registered successfully",
  "user": { "username": "rahul", "role": "admin" }
}

Example Login POST /auth/login:
{
  "username": "rahul",
  "password": "123456"
}

Response:
{
  "message": "login successfully",
  "token": "<JWT_TOKEN>"
}

Access Protected Profile GET /auth/profile:
Headers: Authorization: Bearer <JWT_TOKEN>
Response:
{
  "message": "profile accessed",
  "user": { "id": 1, "username": "rahul", "role": "admin" }
}

| FEATURES                                   | Details                                                                                             |
|-------------------------------------------|-----------------------------------------------------------------------------------------------------|
| Stepwise learning                          | Basic routes → CRUD → Modular design → JWT Authentication                                           |
| File-based user management                 | users.json                                                                                          |
| Input validation & error handling          | Implemented                                                                                         |
| Logger middleware                          | Request logging                                                                                      |
| JWT-based authentication & RBAC            | Protect routes with admin/user roles                                                                |
| Catch-all route                            | 404 route implemented                                                                                |

| PHASE 1: CORE BACKEND                     | Details                                                                                             |
|-------------------------------------------|-----------------------------------------------------------------------------------------------------|
| Node.js basics                             | Modules, global objects, event loop, async programming                                             |
| Express fundamentals                        | Routing, middleware, error handling                                                                |
| Data storage                               | JSON-based file CRUD                                                                                |
| Authentication                             | bcryptjs password hashing, JWT token management                                                    |
| Role-Based Access Control (RBAC)           | Protect routes with admin/user roles                                                               |
| API testing                                | Postman/Insomnia                                                                                    |

| PHASE 2: DEPLOYMENT & ENVIRONMENT          | Details                                                                                             |
|-------------------------------------------|-----------------------------------------------------------------------------------------------------|
| Environment variables                      | Secrets & configuration                                                                            |
| Deployment platforms                        | Render, Heroku, Railway, Vercel                                                                    |
| Deployment steps                           | Connect GitHub repo → Configure build/start commands → Deploy → Test API on live URL               |

| AUTHOR                                     | Rahul Kumar Pandey                                                                                       |
