package com.imaddev.tasksapp.mappers.Impl;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import org.springframework.stereotype.Component;
import com.imaddev.tasksapp.dto.TaskListDto;
import com.imaddev.tasksapp.entity.Task;
import com.imaddev.tasksapp.entity.TaskList;
import com.imaddev.tasksapp.entity.TaskStatus;
import com.imaddev.tasksapp.mappers.TaskListMapper;
import com.imaddev.tasksapp.mappers.TaskMapper;

@Component
public class TaskListMapperImpl implements TaskListMapper {

    private final TaskMapper taskMapper;

    public TaskListMapperImpl(TaskMapper taskMapper) {
        this.taskMapper = taskMapper;
    }

    @Override
    public TaskList fromDto(TaskListDto taskListDto) {
        return new TaskList(taskListDto.id(),
                taskListDto.title(),
                taskListDto.description(),
                Optional.ofNullable(taskListDto.tasks())
                        .map(tasks -> tasks.stream().map(task -> taskMapper.fromDto(task)).toList()).orElse(null),
                null,
                null);
    }

    @Override
    public TaskListDto toDto(TaskList taskList) {
        List<Task> tasks = Optional.ofNullable(taskList.getTasks()).orElse(new ArrayList<>());
        int tasknb = tasks.size();
        int taskcompletednb = tasks.stream().filter(task -> task.getStatus() == TaskStatus.CLOSED).toList().size();
        Double progress = 0.0;
        if (tasknb > 0) {
            progress = (double) taskcompletednb / tasknb;
        }
        return new TaskListDto(taskList.getId(),
                taskList.getTitle(),
                taskList.getDescription(),
                tasknb,
                progress,
                tasks.isEmpty() ? null : tasks.stream().map(task -> taskMapper.toDto(task)).toList());
    }

}
