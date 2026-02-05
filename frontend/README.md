# TasksApp Frontend

A React frontend for the TasksApp Spring Boot API.

## Tech Stack

- **React 19** - UI Library
- **Vite** - Build tool
- **TailwindCSS 4** - Styling
- **React Router** - Client-side routing
- **React Query (TanStack Query)** - Server state management
- **Axios** - HTTP client
- **React Hot Toast** - Toast notifications

## Project Structure

```
frontend/
├── src/
│   ├── api/                 # API client and endpoints
│   │   ├── apiClient.js     # Axios instance
│   │   ├── taskApi.js       # Task endpoints
│   │   ├── taskListApi.js   # TaskList endpoints
│   │   └── index.js
│   │
│   ├── components/          # Reusable components
│   │   ├── Card.jsx         # Task list card
│   │   ├── EmptyState.jsx   # Empty state placeholder
│   │   ├── Layout.jsx       # Main layout wrapper
│   │   ├── LoadingSpinner.jsx
│   │   ├── Modal.jsx        # Confirmation modal
│   │   ├── Navbar.jsx       # Navigation bar
│   │   ├── ProgressBar.jsx  # Progress indicator
│   │   ├── TaskForm.jsx     # Task create/edit form
│   │   ├── TaskItem.jsx     # Task list item
│   │   ├── TaskListForm.jsx # TaskList create/edit form
│   │   └── index.js
│   │
│   ├── hooks/               # Custom React Query hooks
│   │   ├── useTaskLists.js  # TaskList queries & mutations
│   │   ├── useTasks.js      # Task queries & mutations
│   │   └── index.js
│   │
│   ├── pages/               # Page components
│   │   ├── CreateTaskListPage.jsx
│   │   ├── CreateTaskPage.jsx
│   │   ├── EditTaskListPage.jsx
│   │   ├── EditTaskPage.jsx
│   │   ├── TaskListsPage.jsx  # Home page
│   │   ├── TasksPage.jsx
│   │   └── index.js
│   │
│   ├── App.jsx              # App routes
│   ├── main.jsx             # Entry point
│   └── index.css            # Global styles with Tailwind
│
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

## Getting Started

### Prerequisites

- Node.js 18+ 
- Backend running on `http://localhost:8080`

### Installation

```bash
cd frontend
npm install
```

### Development

```bash
npm run dev
```

The app will be available at `http://localhost:5173`

### Production Build

```bash
npm run build
npm run preview
```

## API Endpoints

The frontend consumes the following API endpoints:

### Task Lists

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/taskLists` | Get all task lists |
| POST | `/api/taskLists` | Create task list |
| GET | `/api/taskLists/{id}` | Get single task list |
| PUT | `/api/taskLists/{id}` | Update task list |
| DELETE | `/api/taskLists/{id}` | Delete task list |

### Tasks

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/{taskListId}/tasks` | Get tasks for a list |
| POST | `/api/{taskListId}/tasks` | Create task |
| GET | `/api/{taskListId}/tasks/{taskId}` | Get single task |
| PUT | `/api/{taskListId}/tasks/{taskId}` | Update task |
| DELETE | `/api/{taskListId}/tasks/{taskId}` | Delete task |

## Features

### Task Lists Screen (Home)
- View all task lists in a grid layout
- Each card shows title, description, and progress bar
- Create, edit, and delete task lists

### Tasks Screen
- View all tasks in a task list
- Global progress bar showing completion percentage
- Add, edit, delete, and toggle task completion
- Priority badges (HIGH/MEDIUM/LOW)
- Due date display with overdue indicator

### Forms
- Client-side validation
- Loading states during submission
- Cancel button to go back

### UX Features
- Toast notifications for success/error
- Loading spinners
- Empty states
- Confirmation modals for delete actions
- Responsive design

## Running with Backend

1. Start the Spring Boot backend:
```bash
cd tasksapp
./mvnw spring-boot:run
```

2. Start the frontend:
```bash
cd frontend
npm run dev
```

3. Open `http://localhost:5173` in your browser

The Vite dev server proxies `/api` requests to the backend at `http://localhost:8080`.
