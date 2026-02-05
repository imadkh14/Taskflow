package com.imaddev.tasksapp.services;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.UUID;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.imaddev.tasksapp.Repositories.TaskListRepo;
import com.imaddev.tasksapp.Repositories.TaskRepo;
import com.imaddev.tasksapp.entity.Task;
import com.imaddev.tasksapp.entity.TaskList;
import com.imaddev.tasksapp.entity.TaskPriority;
import com.imaddev.tasksapp.entity.TaskStatus;

import jakarta.transaction.Transactional;

@Service
public class TaskServiceImpl implements TaskService {

    @Autowired
    private TaskRepo taskRepo;

    @Autowired
    private TaskListRepo taskListRepo;

    @Override
    public List<Task> listTaskByTaskListId(UUID tasklistid) {
        return taskRepo.findByTaskListId(tasklistid);
    }

    @Transactional
    @Override
    public Task createTask(UUID tasklistid, Task task) {
        if (task.getId() != null) {
            throw new IllegalArgumentException("the task has already an ID");
        }
        if (task.getTitle() == null || task.getTitle().isBlank()) {
            throw new IllegalArgumentException("the title is required");
        }
        TaskList taskList = taskListRepo.findById(tasklistid).orElseThrow(() -> {
            throw new IllegalArgumentException("tasklist not found");
        });
        TaskPriority priority = Optional.ofNullable(task.getPriority()).orElse(TaskPriority.MEDIUM);
        TaskStatus status = TaskStatus.OPEN;
        LocalDateTime now = LocalDateTime.now();
        Task newtask = new Task(null,
                task.getTitle(),
                task.getDescription(),
                status,
                priority,
                task.getDueDate(),
                taskList,
                now,
                now);
        return taskRepo.save(newtask);
    }

    @Override
    public Optional<Task> getTask(UUID tasklistid, UUID taskid) {
        return taskRepo.findByTaskListIdAndId(tasklistid, taskid);
    }

    @Transactional
    @Override
    public Task updateTask(UUID tasklistid, UUID taskid, Task task) {

        if (task.getId() != null && !Objects.equals(taskid, task.getId())) {
            throw new IllegalArgumentException("the Id of the task is not compatible with taskid given");
        }
        if (task.getPriority() == null) {
            throw new IllegalArgumentException("Task must have a priority");
        }
        if (task.getStatus() == null) {
            throw new IllegalArgumentException("Task must have a status");
        }
        Task task2 = taskRepo.findByTaskListIdAndId(tasklistid, taskid).orElseThrow(() -> {
            throw new IllegalArgumentException("tasklist not found");
        });

        task2.setTitle(task.getTitle());
        task2.setDescription(task.getDescription());
        task2.setDueDate(task.getDueDate());
        task2.setStatus(task.getStatus());
        task2.setPriority(task.getPriority());
        task2.setUpdated(LocalDateTime.now());

        return taskRepo.save(task2);

    }

    @Override
    @Transactional
    public void deleteTask(UUID tasklistid, UUID taskid) {
        taskRepo.deleteByTaskListIdAndId(tasklistid, taskid);
    }

}
