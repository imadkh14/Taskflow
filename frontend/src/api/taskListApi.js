import apiClient from './apiClient'

// Task List API endpoints
export const taskListApi = {
  // Get all task lists
  getAll: async () => {
    const response = await apiClient.get('/taskLists')
    return response.data
  },

  // Get a single task list by ID
  getById: async (id) => {
    const response = await apiClient.get(`/taskLists/${id}`)
    return response.data
  },

  // Create a new task list
  create: async (taskList) => {
    const response = await apiClient.post('/taskLists', taskList)
    return response.data
  },

  // Update an existing task list
  update: async (id, taskList) => {
    const response = await apiClient.put(`/taskLists/${id}`, taskList)
    return response.data
  },

  // Delete a task list
  delete: async (id) => {
    await apiClient.delete(`/taskLists/${id}`)
  },
}
