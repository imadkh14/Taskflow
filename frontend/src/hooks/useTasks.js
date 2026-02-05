import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { taskApi } from '../api'
import { taskListKeys } from './useTaskLists'
import toast from 'react-hot-toast'

// Query keys
export const taskKeys = {
  all: (taskListId) => ['tasks', taskListId],
  detail: (taskListId, taskId) => ['tasks', taskListId, taskId],
}

// Get all tasks for a task list
export const useTasks = (taskListId) => {
  return useQuery({
    queryKey: taskKeys.all(taskListId),
    queryFn: () => taskApi.getAll(taskListId),
    enabled: !!taskListId,
  })
}

// Get a single task
export const useTask = (taskListId, taskId) => {
  return useQuery({
    queryKey: taskKeys.detail(taskListId, taskId),
    queryFn: () => taskApi.getById(taskListId, taskId),
    enabled: !!taskListId && !!taskId,
  })
}

// Create a task
export const useCreateTask = (taskListId) => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: (task) => taskApi.create(taskListId, task),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: taskKeys.all(taskListId) })
      queryClient.invalidateQueries({ queryKey: taskListKeys.all })
      queryClient.invalidateQueries({ queryKey: taskListKeys.detail(taskListId) })
      toast.success('Task created successfully!')
    },
  })
}

// Update a task
export const useUpdateTask = (taskListId) => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: ({ taskId, data }) => taskApi.update(taskListId, taskId, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: taskKeys.all(taskListId) })
      queryClient.invalidateQueries({ queryKey: taskKeys.detail(taskListId, variables.taskId) })
      queryClient.invalidateQueries({ queryKey: taskListKeys.all })
      queryClient.invalidateQueries({ queryKey: taskListKeys.detail(taskListId) })
      toast.success('Task updated successfully!')
    },
  })
}

// Delete a task
export const useDeleteTask = (taskListId) => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: (taskId) => taskApi.delete(taskListId, taskId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: taskKeys.all(taskListId) })
      queryClient.invalidateQueries({ queryKey: taskListKeys.all })
      queryClient.invalidateQueries({ queryKey: taskListKeys.detail(taskListId) })
      toast.success('Task deleted successfully!')
    },
  })
}

// Toggle task completion
export const useToggleTaskComplete = (taskListId) => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: ({ taskId, task }) => taskApi.toggleComplete(taskListId, taskId, task),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: taskKeys.all(taskListId) })
      queryClient.invalidateQueries({ queryKey: taskListKeys.all })
      queryClient.invalidateQueries({ queryKey: taskListKeys.detail(taskListId) })
    },
  })
}
