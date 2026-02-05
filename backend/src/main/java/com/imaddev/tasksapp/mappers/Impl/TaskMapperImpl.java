package com.imaddev.tasksapp.mappers.Impl;

import org.springframework.stereotype.Component;
import com.imaddev.tasksapp.dto.TaskDto;
import com.imaddev.tasksapp.entity.Task;
import com.imaddev.tasksapp.mappers.TaskMapper;

@Component
public class TaskMapperImpl implements TaskMapper{

    @Override
    public Task fromDto(TaskDto taskDto) {
        return new Task(taskDto.id(), taskDto.title(), taskDto.description(), taskDto.status(), taskDto.priority(), taskDto.dueDate(), null, null, null);
    }

    @Override
    public TaskDto toDto(Task task) {
        return new TaskDto(task.getId(),task.getTitle(),task.getDescription(),task.getStatus(),task.getPriority(),task.getDueDate());
    }

}
