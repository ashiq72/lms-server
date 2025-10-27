<div align="center">

# 🎓 University LMS Server 🎓

**Backend API for a comprehensive Learning Management System (LMS) / University Management Project.**
<br>
<em>
  <b><i>"---Always Work Hard and Trust the Process---"</i></b>
</em>
<br>

<p>
  <a href="https://github.com/ashiq72/lms-server/actions">
    <img src="https://img.shields.io/github/actions/workflow/status/ashiq72/lms-server/.github%2Fworkflows%2Fci.yml?style=for-the-badge&logo=githubactions&logoColor=white&label=Build" alt="Build Status">
  </a>
  <a href="https://github.com/ashiq72/lms-server/blob/main/LICENSE">
    <img src="https://img.shields.io/github/license/ashiq72/lms-server?style=for-the-badge&color=blue&label=License" alt="License">
  </a>
  <a href="https://github.com/ashiq72/lms-server/issues">
    <img src="https://img.shields.io/github/issues/ashiq72/lms-server?style=for-the-badge&color=brightgreen" alt="Issues">
  </a>
</p>
</div>

---

## 📍 Table of Contents

* [✨ Core Features](#-core-features)
* [🛠️ Tech Stack](#-tech-stack)
* [🏁 Getting Started](#-getting-started)
    * [Prerequisites](#prerequisites)
    * [Installation & Setup](#-installation--setup)
    * [Running the Server](#-running-the-server)
* [🔑 Environment Variables](#-environment-variables)
* [⚡ API Endpoints](#-api-endpoints)
    * [Authentication](#-authentication)
    * [User Management](#-user-management)
    * [Student Management](#-student-management)
    * [Faculty Management](#-faculty-management)
    * [Admin Management](#-admin-management)
* [📚 Learn More](#-learn-more)
* [🤝 Contributing](#-contributing)
* [📜 License](#-license)

---

## ✨ Core Features

This server provides all the essential backend logic for a modern university portal:

* **🔐 Secure Authentication:** Full JWT (Access & Refresh Tokens) flow with `bcrypt` password hashing.
* **👮 Role-Based Access Control:** Distinct roles (Student, Faculty, Admin) with protected routes using custom middleware.
* **📁 File Uploads:** Integrated `multer` and `cloudinary` for handling profile pictures and course materials.
* **✉️ Email Service:** Uses `nodemailer` for password resets and notifications.
* **🛡️ Robust Validation:**
    * **Zod / Joi:** For complex schema validation on request bodies.
    * **Mongoose:** Built-in and custom schema validations.
* **⚙️ Full User Management:** Complete CRUD operations for all user roles.
* **🔑 Secure Password Handling:** Features for changing, forgetting, and resetting passwords.

## 🛠️ Tech Stack

This project is built with a modern, type-safe, and efficient stack, as seen in `package.json`.

| Category | Technology |
| :--- | :--- |
| **Backend Framework** | `Express.js` |
| **Language** | `TypeScript` |
| **Database** | `MongoDB` (with `Mongoose` ODM) |
| **Authentication** | `jsonwebtoken` (JWT), `bcrypt` |
| **Data Validation** | `zod`, `joi`, `validator` |
| **File Handling** | `multer`, `cloudinary` |
| **Email Service** | `nodemailer` |
| **API Utilities** | `http-status`, `cors`, `cookie-parser` |
| **Dev Environment** | `ts-node-dev`, `eslint` |

---

## 🏁 Getting Started

Follow these instructions to get the server up and running on your local machine.

### Prerequisites

You must have the following installed:
* Node.js (v18.x or later recommended)
* npm (or yarn)
* A MongoDB database instance (local or cloud-hosted like MongoDB Atlas)

### ⚙️ Installation & Setup

1.  **Clone the repository:**
    ```sh
    git clone [https://github.com/ashiq72/lms-server.git](https://github.com/ashiq72/lms-server.git)
    cd lms-server
    ```

2.  **Install dependencies:**
    ```sh
    npm install
    ```
    *(Or `yarn install`)*

3.  **Set up Environment Variables:**
    * Create a `.env` file in the root of the project.
    * Use the `.env.example` file (if available) or the section below as a guide.
    * Fill in all required values, especially `DATABASE_URL` and `JWT_SECRET_KEY`.

### 🚀 Running the Server

* **For Development (with hot-reloading):**
    ```sh
    npm run start:dev
    ```
    This will start the server using `ts-node-dev`.

* **For Production:**
    ```sh
    # 1. Build the TypeScript code into JavaScript
    npm run build

    # 2. Start the optimized server
    npm run start
    ```

* **To Run Linter:**
    ```sh
    npm run lint
    ```
---

## 🔑 Environment Variables

To run this project, you will need to create a `.env` file with the following variables:

```.env
# Server Configuration
PORT=5000
NODE_ENV=development

# Database
DATABASE_URL="your-mongodb-connection-string"

# JWT Authentication
JWT_SECRET_KEY="your-access-token-secret"
JWT_EXPIRES_IN="1d"
JWT_REFRESH_SECRET_KEY="your-refresh-token-secret"
JWT_REFRESH_EXPIRES_IN="7d"

# Cloudinary (for file uploads)
CLOUDINARY_CLOUD_NAME="..."
CLOUDINARY_API_KEY="..."
CLOUDINARY_API_SECRET="..."

# Nodemailer (for emails)
NODEMAILER_HOST="..."
NODEMAILER_PORT="..."
NODEMAILER_USER="..."
NODEMAILER_PASS="..."

# Frontend URL
CORS_ORIGIN="http://localhost:3000"
