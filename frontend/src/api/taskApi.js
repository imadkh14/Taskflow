import apiClient from './apiClient'

// Task API endpoints
export const taskApi = {
  // Get all tasks for a task list
  getAll: async (taskListId) => {
    const response = await apiClient.get(`/${taskListId}/tasks`)
    return response.data
  },

  // Get a single task by ID
  getById: async (taskListId, taskId) => {
    const response = await apiClient.get(`/${taskListId}/tasks/${taskId}`)
    return response.data
  },

  // Create a new task
  create: async (taskListId, task) => {
    const response = await apiClient.post(`/${taskListId}/tasks`, task)
    return response.data
  },

  // Update an existing task
  update: async (taskListId, taskId, task) => {
    const response = await apiClient.put(`/${taskListId}/tasks/${taskId}`, task)
    return response.data
  },

  // Delete a task
  delete: async (taskListId, taskId) => {
    await apiClient.delete(`/${taskListId}/tasks/${taskId}`)
  },

  // Toggle task completion status
  toggleComplete: async (taskListId, taskId, task) => {
    const newStatus = task.status === 'CLOSED' ? 'OPEN' : 'CLOSED'
    const updatedTask = { ...task, status: newStatus }
    const response = await apiClient.put(`/${taskListId}/tasks/${taskId}`, updatedTask)
    return response.data
  },
}
