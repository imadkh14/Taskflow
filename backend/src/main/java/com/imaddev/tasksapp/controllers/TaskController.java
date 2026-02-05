package com.imaddev.tasksapp.controllers;

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
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.imaddev.tasksapp.dto.TaskDto;
import com.imaddev.tasksapp.mappers.TaskMapper;
import com.imaddev.tasksapp.services.TaskService;


@RestController
@RequestMapping("/api/{tasklist_id}/tasks")
public class TaskController {

    @Autowired
    private TaskService taskService;

    @Autowired
    private TaskMapper taskMapper;

    @GetMapping
    public List<TaskDto> findTasksByTaskListId(@PathVariable("tasklist_id") UUID tasklistId){
        return taskService.listTaskByTaskListId(tasklistId).stream().map(task->taskMapper.toDto(task)).toList();
    }

    @PostMapping
    public TaskDto createTask(@PathVariable("tasklist_id") UUID tasklistId,@RequestBody TaskDto task){
        return taskMapper.toDto(taskService.createTask(tasklistId, taskMapper.fromDto(task)));
    }

    @GetMapping("/{task_id}")
    public Optional<TaskDto> getTask(@PathVariable("tasklist_id") UUID tasklistId,@PathVariable("task_id") UUID taskid){
        return taskService.getTask(tasklistId, taskid).map(task->taskMapper.toDto(task));
    }

    @PutMapping("/{task_id}")
    public TaskDto updateTask(@PathVariable("tasklist_id") UUID tasklistId,@PathVariable("task_id") UUID taskid,@RequestBody TaskDto taskDto){
        return taskMapper.toDto(taskService.updateTask(tasklistId, taskid,taskMapper.fromDto(taskDto)));
    }

    @DeleteMapping("/{task_id}")
    public void deleteTask(@PathVariable("tasklist_id") UUID tasklistId,@PathVariable("task_id") UUID taskid){
         taskService.deleteTask(tasklistId, taskid);
    }

}
