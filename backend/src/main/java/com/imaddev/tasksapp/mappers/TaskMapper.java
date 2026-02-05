package com.imaddev.tasksapp.mappers;

import com.imaddev.tasksapp.dto.TaskDto;
import com.imaddev.tasksapp.entity.Task;


public interface TaskMapper {
    Task fromDto(TaskDto taskDto);
    TaskDto toDto(Task task);
}
