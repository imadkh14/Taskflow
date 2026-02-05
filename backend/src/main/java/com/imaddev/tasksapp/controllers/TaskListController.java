package com.imaddev.tasksapp.controllers;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.imaddev.tasksapp.dto.TaskListDto;
import com.imaddev.tasksapp.mappers.TaskListMapper;
import com.imaddev.tasksapp.services.TaskListService;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;


@RestController
@RequestMapping("/api/taskLists")
public class TaskListController {

    @Autowired
    private TaskListService taskListService;

    @Autowired
    private TaskListMapper taskListMapper;

    @GetMapping
    public List<TaskListDto> getTaskLists() {
        return taskListService.listtaskLists().stream().map(tasklist->taskListMapper.toDto(tasklist)).toList();
    }

    @PostMapping
    public TaskListDto createTaskLists(@RequestBody TaskListDto taskListDto) {
         return taskListMapper.toDto(taskListService.createTaskList(
                    taskListMapper.fromDto(taskListDto))
                    );
    }

    @GetMapping("/{tasklist_id}")
    public Optional<TaskListDto> getTaskList(@PathVariable("tasklist_id") UUID tasklistId) {
        return taskListService.getTaskListById(tasklistId).map(tasklist->taskListMapper.toDto(tasklist));
    }

    @PutMapping("/{tasklist_id}")
    public TaskListDto updateTaskList(@PathVariable("tasklist_id") UUID tasklistId,@RequestBody TaskListDto taskListDto) {
        return taskListMapper.toDto(taskListService.updateTaskList(tasklistId, taskListMapper.fromDto(taskListDto)));
    }

    @DeleteMapping("/{tasklist_id}")
    public void deleteTaskList(@PathVariable("tasklist_id") UUID tasklistId){
        taskListService.deleteTaskList(tasklistId);
    }
    
}
