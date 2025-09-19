<p align="center">
  <em>
  <br>
  <b><i>"---Always Work Hard and Trust the Process---"</i></b>
</p>

<h3>Validations in Mongoose 🧑</h3>

- Builtin validation
- Custom validation
- Third party validation libraries ( Validator / Zod / Joi)

---

## ⚡ API Endpoints

### 👤 User Management

- **POST** `/users/create-student` → Create a new student
- **POST** `/users/create-faculty` → Create a new faculty
- **POST** `/users/create-admin` → Create a new admin

---

### 🎓 Student Management

- **GET** `/students` → Get all students
- **GET** `/students/:id` → Get student by ID
- **PATCH** `/students/:id` → Update student details
- **DELETE** `/students/:id` → Delete student
- **GET** `/students/my-profile` → Get logged-in student profile

---

### 👨‍🏫 Faculty Management

- **GET** `/faculties` → Get all faculties
- **GET** `/faculties/:id` → Get faculty by ID
- **PATCH** `/faculties/:id` → Update faculty details
- **DELETE** `/faculties/:id` → Delete faculty
- **GET** `/faculties/my-profile` → Get logged-in faculty profile

---

### 🛠 Admin Management

- **GET** `/admins` → Get all admins
- **GET** `/admins/:id` → Get admin by ID
- **PATCH** `/admins/:id` → Update admin details
- **DELETE** `/admins/:id` → Delete admin
- **GET** `/admins/my-profile` → Get logged-in admin profile

---

### 🔐 Authentication

- **POST** `/auth/login` → Login with email & password
- **POST** `/auth/refresh-token` → Get a new access token
- **PATCH** `/auth/change-password` → Change password
- **POST** `/auth/forget-password` → Request password reset
- **POST** `/auth/reset-password` → Reset password with token

---

## 🔑 Authentication & Security

- **JWT Tokens**
  - Access Token (short-lived)
  - Refresh Token (long-lived)
- **Role-based Access**
  - Student, Faculty, Admin
- **Middleware Protection**
  - Ensures only authorized users access protected routes

---

## 🛠 Installation & Setup

1. Clone the repository

   ```bash
   git clone https://github.com/ashiq72/lms-server.git
   cd lms-server

   ```

2. Blog for this repository
   ```bash
   https://nextdotblog.blogspot.com/2025/09/lms-server.html
   ```
