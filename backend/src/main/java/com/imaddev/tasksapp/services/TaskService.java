package com.imaddev.tasksapp.services;

import java.util.List;
import java.util.Optional;
import java.util.UUID;
import com.imaddev.tasksapp.entity.Task;

public interface TaskService {
    List<Task> listTaskByTaskListId(UUID tasklistid);
    Task createTask(UUID tasklistid, Task task);
    Optional<Task> getTask(UUID tasklistid,UUID taskid);
    Task updateTask(UUID tasklistid,UUID taskid,Task task);
    void deleteTask(UUID tasklistid,UUID taskid);
}
