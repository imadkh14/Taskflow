package com.imaddev.tasksapp.services;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import com.imaddev.tasksapp.entity.TaskList;

public interface TaskListService {
    List<TaskList> listtaskLists() ;
    TaskList  createTaskList(TaskList taskList);
    Optional<TaskList>  getTaskListById(UUID id);
    TaskList updateTaskList(UUID id,TaskList taskList);
    void deleteTaskList(UUID id);
}
