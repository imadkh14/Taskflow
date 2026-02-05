package com.imaddev.tasksapp.dto;

import java.time.LocalDateTime;
import java.util.UUID;
import com.imaddev.tasksapp.entity.TaskPriority;
import com.imaddev.tasksapp.entity.TaskStatus;

public record TaskDto(
    UUID id,
    String title,
    String description,
    TaskStatus status,
    TaskPriority priority,
    LocalDateTime dueDate
) {
}
