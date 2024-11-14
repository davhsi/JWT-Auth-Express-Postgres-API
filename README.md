
# JWT Authentication with Express & PostgreSQL API

This **JWT Authentication API** built with **Express** and **PostgreSQL** is a robust solution for building secure user authentication and authorization systems. It supports essential **CRUD operations** for managing user posts, JWT-based security, and a powerful backend powered by **Sequelize ORM**. This project is ideal for developers looking to integrate **secure user authentication** with **PostgreSQL** in their applications.

## Features
- **JWT Authentication**: Secure user login and registration with **password hashing** and **JWT tokens**.
- **Role-Based Access Control**: Control access to resources based on roles, enhancing security for protected routes.
- **CRUD API**: Perform Create, Read, Update, Delete operations for posts with full authentication and authorization.
- **PostgreSQL Integration**: Seamless integration with **PostgreSQL** using **Sequelize ORM** for data management.
- **Express Middleware**: Use **authentication middleware** to protect routes requiring authentication.

## Why Use This API?
This project helps you quickly implement **user authentication** using **JWT tokens**, providing:
- **Scalable authentication** for both small and large applications.
- Secure access to protected endpoints.
- A seamless and easy-to-extend architecture using **PostgreSQL**.

Ideal for:
- Web applications needing a secure API.
- Full-stack projects where backend authentication is crucial.
- Developers looking for a practical implementation of **JWT authentication**.

## Installation and Setup

### Prerequisites
- **Node.js** (v14 or higher) — Ensure you have **Node.js** installed on your system.
- **PostgreSQL** (v12 or higher) — Make sure you have **PostgreSQL** installed locally or remotely.
- **Git** (for cloning the repository) — You'll need **Git** to clone this repository to your local machine.

### Steps to Set Up the Project

1. **Clone the Repository**
   ```bash
   git clone https://github.com/davhsi/JWT-Auth-Express-Postgres-API.git
   cd JWT-Auth-Express-Postgres-API
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Set Up Environment Variables**  
   Create a `.env` file in the project root directory with the following content:

   ```plaintext
   DATABASE_URL=postgres://postgres:root@localhost:5432/postgres
   JWT_SECRET=topsecretkey123
   ```

   - **DATABASE_URL**: The **PostgreSQL** connection string, typically in the format `postgres://username:password@localhost:5432/database`.
   - **JWT_SECRET**: A strong secret key for **JWT token signing**.

4. **Run the Application**
   Start the application with:

   ```bash
   npm start
   ```

   The server will now be running on `http://localhost:5000`.

5. **Using Nodemon (optional)**  
   To automatically restart the server on file changes, use `nodemon`:

   ```bash
   nodemon server.js
   ```

## API Documentation

### Authentication

#### Register a User
- **Endpoint**: `POST /api/auth/register`
- **Request Body**:
    ```json
    {
      "username": "yourusername",
      "password": "yourpassword"
    }
    ```
- **Response**: Success message or error details.

#### Login a User
- **Endpoint**: `POST /api/auth/login`
- **Request Body**:
    ```json
    {
      "username": "yourusername",
      "password": "yourpassword"
    }
    ```
- **Response**:
    ```json
    {
      "token": "JWT_TOKEN"
    }
    ```

### Post Management

#### Create a Post
- **Endpoint**: `POST /api/posts/`
- **Headers**: `Authorization: Bearer JWT_TOKEN`
- **Request Body**:
    ```json
    {
      "title": "Post Title",
      "description": "Post Description"
    }
    ```
- **Response**:
    ```json
    {
      "id": 1,
      "title": "Post Title",
      "description": "Post Description",
      "author": 1,
      "updatedAt": "2024-11-14T08:57:03.722Z",
      "createdAt": "2024-11-14T08:57:03.722Z"
    }
    ```

#### Get All Posts
- **Endpoint**: `GET /api/posts/`
- **Response**:
    ```json
    [
      {
        "id": 1,
        "title": "Post Title",
        "description": "Post Description",
        "author": 1
      },
      ...
    ]
    ```

#### Get a Single Post
- **Endpoint**: `GET /api/posts/:id`
- **Response**: Details of a specific post.

#### Update a Post
- **Endpoint**: `PUT /api/posts/:id`
- **Headers**: `Authorization: Bearer JWT_TOKEN`
- **Request Body**:
    ```json
    {
      "title": "Updated Title",
      "description": "Updated Description"
    }
    ```
- **Response**: Updated post details.

#### Delete a Post
- **Endpoint**: `DELETE /api/posts/:id`
- **Headers**: `Authorization: Bearer JWT_TOKEN`
- **Response**: Success message.

## Folder Structure

- **controllers**: Business logic for each endpoint
- **models**: Sequelize models for `User` and `Post`
- **routes**: Routing files for `auth` and `posts`
- **middleware**: Authentication middleware for protected routes

## Database Integration

This project connects to a **PostgreSQL** database using **Sequelize ORM**. The database configuration is provided through the `DATABASE_URL` environment variable, which must be set in the `.env` file. 

- Ensure that **PostgreSQL** is running and the database is accessible.
- This API is scalable, and you can easily integrate it with other parts of your application.

## Conclusion

With this **JWT Authentication API**, you get a **secure, robust** foundation for building applications that require authentication and authorization. It's ready to be extended with additional features such as **role management**, **admin functionality**, or even **OAuth integration**.

---

## Tags
- **JWT Authentication**
- **Express API**
- **PostgreSQL API**
- **Sequelize ORM**
- **Full-stack Authentication**
- **Secure API**
- **RESTful API**