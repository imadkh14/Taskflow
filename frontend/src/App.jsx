import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import TaskListsPage from './pages/TaskListsPage'
import CreateTaskListPage from './pages/CreateTaskListPage'
import EditTaskListPage from './pages/EditTaskListPage'
import TasksPage from './pages/TasksPage'
import CreateTaskPage from './pages/CreateTaskPage'
import EditTaskPage from './pages/EditTaskPage'

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<TaskListsPage />} />
        <Route path="/task-lists/create" element={<CreateTaskListPage />} />
        <Route path="/task-lists/:id/edit" element={<EditTaskListPage />} />
        <Route path="/task-lists/:taskListId/tasks" element={<TasksPage />} />
        <Route path="/task-lists/:taskListId/tasks/create" element={<CreateTaskPage />} />
        <Route path="/task-lists/:taskListId/tasks/:taskId/edit" element={<EditTaskPage />} />
      </Routes>
    </Layout>
  )
}

export default App
