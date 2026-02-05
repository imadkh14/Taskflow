import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { taskListApi } from '../api'
import toast from 'react-hot-toast'

// Query keys
export const taskListKeys = {
  all: ['taskLists'],
  detail: (id) => ['taskLists', id],
}

// Get all task lists
export const useTaskLists = () => {
  return useQuery({
    queryKey: taskListKeys.all,
    queryFn: taskListApi.getAll,
  })
}

// Get a single task list
export const useTaskList = (id) => {
  return useQuery({
    queryKey: taskListKeys.detail(id),
    queryFn: () => taskListApi.getById(id),
    enabled: !!id,
  })
}

// Create a task list
export const useCreateTaskList = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: taskListApi.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: taskListKeys.all })
      toast.success('Task list created successfully!')
    },
  })
}

// Update a task list
export const useUpdateTaskList = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: ({ id, data }) => taskListApi.update(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: taskListKeys.all })
      queryClient.invalidateQueries({ queryKey: taskListKeys.detail(variables.id) })
      toast.success('Task list updated successfully!')
    },
  })
}

// Delete a task list
export const useDeleteTaskList = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: taskListApi.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: taskListKeys.all })
      toast.success('Task list deleted successfully!')
    },
  })
}
