# Hacker Backend Task (Levels 1-4)

## Overview
This is a **Node.js + Express** backend project built for step-by-step practice of backend development.  
It demonstrates learning from **Level 1 → Level 4**, including modular structure and file-based CRUD operations.

---

## Project Structure

hacker-backend-task/
├─ controllers/
│ ├─ echoController.js
│ └─ userController.js
├─ routes/
│ ├─ echoRoutes.js
│ └─ userRoutes.js
├─ middleware/
│ └─ logger.js
├─ levels/
│ ├─ level-1.js
│ ├─ level-2.js
│ └─ level-3.js
├─ userdata.json
├─ app.js
├─ package.json
├─ package-lock.json
└─ node_modules/

yaml
Copy code

---

## Installation

```bash
# Clone repo
git clone https://github.com/raahulpandey/hacker-backend-task.git

# Navigate into folder
cd hacker-backend-task

# Install dependencies
npm install

# Run the server
npm start
Routes
Level 1 & 2
GET /ping

json
Copy code
Response:
{
  "success": true,
  "message": "pong"
}
GET /time

json
Copy code
Response:
{
  "success": true,
  "time": "2025-09-23T06:00:00.000Z"
}
GET /random

Query Parameters (optional): /random?min=10&max=50

json
Copy code
Response:
{
  "random": 37,
  "min": 10,
  "max": 50
}
POST /echo

Body Parameters:

json
Copy code
{
  "name": "Rahul",
  "age": 21
}
json
Copy code
Response:
{
  "success": true,
  "you_sent": {
    "name": "Rahul",
    "age": 21
  }
}
Level 3 – File-based CRUD for Users
GET /users → Get all users
GET /users/:id → Get single user
POST /users → Add user
PUT /users/:id → Update user
DELETE /users/:id → Delete user

All endpoints include input validation and error handling.

Level 4 – Modular Structure
Controllers: userController.js, echoController.js

Routes: userRoutes.js, echoRoutes.js

Middleware: logger.js for request logging

App Setup: app.js

This structure prepares the project for future Level-5 with database integration and advanced features.

Features
Stepwise learning from basic routes → CRUD → Modular design

File-based user management (userdata.json)

Input validation for all endpoints

Logger middleware for request logging

404 catch-all route

Author
Rahul Pandey