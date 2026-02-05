# TaskFlow — Full-Stack Task Manager

A modern full-stack task management application built with **Spring Boot** and **React**.

---

## Overview

TaskFlow is a productivity web app that lets users create task lists, manage tasks, and track progress through a clean dashboard interface.
The project demonstrates a complete full-stack architecture with a REST API and a modern React frontend.

---

## Key Features

### Task Lists

* Create, update and delete task lists
* Optional descriptions
* Automatic completion progress tracking

### Tasks

* Create, edit and delete tasks inside lists
* Priority levels: **Low, Medium, High**
* Status tracking: **Pending, In-Progress, Completed**
* Due dates support
* Progress indicators

### Platform Features

* RESTful API
* Global error handling
* CORS configuration
* Responsive UI with animations

---

## Tech Stack

### Backend

* Java 21
* Spring Boot 3
* Spring Data JPA
* MySQL
* Maven

### Frontend

* React + Vite
* TailwindCSS
* React Router
* TanStack React Query
* Axios
* Framer Motion
* Lucide Icons
* React Hot Toast

---

## Getting Started

### Prerequisites

* Java 21+
* Maven 3.6+
* Node.js 18+
* MySQL 8+
* IDE (IntelliJ / VS Code)

---

## Installation

### 1. Clone the repository

```bash
git clone <repository-url>
cd tasksapp
```

### 2. Create the database

```sql
CREATE DATABASE tasksapp_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

### 3. Configure the backend

Edit:

`backend/src/main/resources/application.properties`

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/tasksapp_db
spring.datasource.username=root
spring.datasource.password=YOUR_PASSWORD
```

Install dependencies:

```bash
cd backend
mvn clean install
```

### 4. Install frontend dependencies

```bash
cd frontend
npm install
```

---

## Run the Application

### Start Backend

```bash
cd backend
mvn spring-boot:run
```

Backend runs on **[http://localhost:8080](http://localhost:8080)**

### Start Frontend

```bash
cd frontend
npm run dev
```

Frontend runs on **[http://localhost:5173](http://localhost:5173)**

---

## API Overview

### Task Lists

| Method | Endpoint              | Description   |
| ------ | --------------------- | ------------- |
| GET    | `/api/taskLists`      | Get all lists |
| POST   | `/api/taskLists`      | Create list   |
| GET    | `/api/taskLists/{id}` | Get list      |
| PUT    | `/api/taskLists/{id}` | Update list   |
| DELETE | `/api/taskLists/{id}` | Delete list   |

### Tasks

| Method | Endpoint                       | Description |
| ------ | ------------------------------ | ----------- |
| GET    | `/api/{listId}/tasks`          | Get tasks   |
| POST   | `/api/{listId}/tasks`          | Create task |
| GET    | `/api/{listId}/tasks/{taskId}` | Get task    |
| PUT    | `/api/{listId}/tasks/{taskId}` | Update task |
| DELETE | `/api/{listId}/tasks/{taskId}` | Delete task |

---

## Project Structure

```
tasksapp/
├── backend/   # Spring Boot REST API
└── frontend/  # React application
```

---

## Available Scripts

### Backend

```bash
mvn spring-boot:run
mvn test
```

### Frontend

```bash
npm run dev
npm run build
npm run preview
```

---

## Author

Built by **Imad**

If you like the project, consider giving it a ⭐
