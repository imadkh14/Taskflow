package com.imaddev.tasksapp.mappers;

import com.imaddev.tasksapp.dto.TaskListDto;
import com.imaddev.tasksapp.entity.TaskList;

public interface TaskListMapper {
    TaskList fromDto(TaskListDto taskListDto);
    TaskListDto toDto(TaskList taskList);
}
