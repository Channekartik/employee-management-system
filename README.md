# 🏢 Employee Management System
### Prodigy Infotech — Task-02
> Full-Stack: React.js + Spring Boot 3 + JWT + MySQL 8

---

## 📁 Project Structure

```
employee-management-system/
├── backend/          ← Spring Boot Maven project
├── frontend/         ← React.js project
└── database/
    └── schema.sql    ← MySQL schema + seed data
```

---

## 🚀 Quick Start

### Prerequisites
| Tool     | Version  |
|----------|----------|
| Java     | 17+      |
| Maven    | 3.8+     |
| Node.js  | 18+      |
| MySQL    | 8.0+     |

---

### Step 1 — Database
```bash
mysql -u root -p
source /path/to/database/schema.sql
# Creates: employee_mgmt_db
# Seeds:   admin + user accounts + 8 sample employees
```

### Step 2 — Backend
```bash
cd backend

# Edit src/main/resources/application.properties:
#   spring.datasource.password=YOUR_MYSQL_PASSWORD

mvn clean install
mvn spring-boot:run
# Starts on http://localhost:8080
```

### Step 3 — Frontend
```bash
cd frontend
npm install
npm start
# Opens http://localhost:3000
```

---

## 🔐 Default Credentials

| Role  | Email                  | Password    |
|-------|------------------------|-------------|
| ADMIN | admin@company.com      | Admin@1234  |
| USER  | user@company.com       | User@1234  |

---

## 🌐 API Endpoints

### Auth (Public)
| Method | URL                     | Description       |
|--------|-------------------------|-------------------|
| POST   | /api/auth/register      | Register new user |
| POST   | /api/auth/login         | Login & get JWT   |

### Employees (Protected)
| Method | URL                       | Role         | Description     |
|--------|---------------------------|--------------|-----------------|
| GET    | /api/employees            | USER + ADMIN | List all        |
| GET    | /api/employees/{id}       | USER + ADMIN | Get by ID       |
| GET    | /api/employees/search     | USER + ADMIN | Search keyword  |
| POST   | /api/employees            | ADMIN only   | Create employee |
| PUT    | /api/employees/{id}       | ADMIN only   | Update employee |
| DELETE | /api/employees/{id}       | ADMIN only   | Delete employee |

---

## 🧪 Postman Examples

### Login
```
POST http://localhost:8080/api/auth/login
Content-Type: application/json

{ "email": "admin@company.com", "password": "Admin@1234" }
```

### Create Employee (ADMIN)
```
POST http://localhost:8080/api/employees
Authorization: Bearer <token>
Content-Type: application/json

{
  "firstName":   "John",
  "lastName":    "Doe",
  "email":       "john.doe@company.com",
  "phone":       "9876543299",
  "department":  "Engineering",
  "designation": "Senior Developer",
  "salary":      90000,
  "joiningDate": "2024-01-15"
}
```

### Update Employee (ADMIN)
```
PUT http://localhost:8080/api/employees/1
Authorization: Bearer <token>
Content-Type: application/json

{ ...same fields as create... }
```

### Delete Employee (ADMIN)
```
DELETE http://localhost:8080/api/employees/1
Authorization: Bearer <token>
```

---

## 🗂 Frontend Pages

| Route                  | Access       | Description           |
|------------------------|--------------|-----------------------|
| /login                 | Public       | Login page            |
| /register              | Public       | Registration page     |
| /dashboard             | USER + ADMIN | Stats & overview      |
| /employees             | USER + ADMIN | Employee list + search|
| /employees/:id         | USER + ADMIN | Employee details      |
| /employees/add         | ADMIN only   | Add new employee      |
| /employees/edit/:id    | ADMIN only   | Edit employee         |

---

## ⚠️ Common Errors

| Error                       | Fix                                              |
|-----------------------------|--------------------------------------------------|
| CORS error in browser       | Verify CorsConfig allows `http://localhost:3000` |
| DB connection failed        | Check MySQL is running + password in .properties |
| JWT 401 Unauthorized        | Token expired — log in again                     |
| 403 Forbidden on POST/PUT   | Logged-in user must be ADMIN                     |
| Port 8080 already in use    | `lsof -i :8080` then kill, or change server.port |

---

## 🔧 Tech Stack

| Layer      | Technology              |
|------------|-------------------------|
| Frontend   | React 18, React Bootstrap 2 |
| Routing    | React Router DOM v6     |
| HTTP       | Axios + Interceptors    |
| Backend    | Spring Boot 3.2         |
| Security   | Spring Security 6 + JWT |
| ORM        | Spring Data JPA         |
| Database   | MySQL 8                 |
| Passwords  | BCrypt (strength 12)    |
| Build      | Maven                   |
## Project Screenshots

### Login Page
![Login Page](screenshots/login-page.png)

### Dashboard
![Dashboard](screenshots/dashboard.png)

### Employee List
![Employee List](screenshots/employee-list.png)

### Add Employee
![Add Employee](screenshots/add-employee.png)
