# Hacker Backend Task (Levels 1-4)

## Overview
This project is a Node.js + Express backend built to practice modular backend development.  
It demonstrates step-by-step learning from Level 1 to Level 4.

- **Level-1:** Basic routes like `/ping`, `/time`, `/random` without modular structure  
- **Level-2:** Added POST /echo route with input validation  
- **Level-3:** Introduced query parameters and random number validation  
- **Level-4:** Modular controllers, routers, logger middleware, 404 handler  

---

## Project Structure

hacker-backend-task/
├─ controllers/
│ ├─ echoController.js
│ └─ randomController.js
├─ routes/
│ ├─ echoRoutes.js
│ └─ randomRoutes.js
├─ middleware/
│ └─ logger.js
├─ levels/
│ ├─ level-1.js
│ ├─ level-2.js
│ └─ level-3.js
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
POST /echo
Body Parameters:

json
Copy code
{
  "name": "Rahul",
  "age": 21
}
Response:

json
Copy code
{
  "success": true,
  "you_sent": {
    "name": "Rahul",
    "age": 21
  }
}
GET /random
Query Parameters (optional):

arduino
Copy code
/random?min=10&max=50
Response:

json
Copy code
{
  "random": 37,
  "min": 10,
  "max": 50
}
Features
Stepwise learning with Level-1 → Level-4 files

Controllers handle business logic

Modular routers for clean code

Logger middleware for request logging

Input validation for /echo and /random

404 catch-all route

Fully structured for future Level-5 CRUD & persistence

Author
Rahul Pandey

pgsql
Copy code

---

If you want, I can **also prepare the full working `level-1.js`, `level-2.js`, `level-3.js` code** so that you can **commit everything at once** with this README.  

Do you want me to do that next?