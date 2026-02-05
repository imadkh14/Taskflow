package com.imaddev.tasksapp.services;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.UUID;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.imaddev.tasksapp.Repositories.TaskListRepo;
import com.imaddev.tasksapp.entity.TaskList;

import jakarta.transaction.Transactional;

@Service
public class TaskListServiceImpl implements TaskListService{

    @Autowired
    private TaskListRepo taskListRepo;

    @Override
    public List<TaskList> listtaskLists() {
        return taskListRepo.findAll();
    }

    @Override
    public TaskList createTaskList(TaskList taskList) {

        if(taskList.getId() != null){
            throw new IllegalArgumentException("TaskList already has ID");
        }
        if(taskList.getTitle() == null || taskList.getTitle().isBlank()){
            throw new IllegalArgumentException("TaskList has not a title");
        }
        LocalDateTime now = LocalDateTime.now();
        return taskListRepo.save(new TaskList(null,
                                             taskList.getTitle(),
                                             taskList.getDescription(), 
                                             null, 
                                             now, 
                                             now));
    }

    @Override
    public Optional<TaskList> getTaskListById(UUID id) {
        return taskListRepo.findById(id); 
    }

    @Transactional
    @Override
    public TaskList updateTaskList(UUID id,TaskList taskList) {

        if(taskList.getId() == null){
            throw new IllegalArgumentException("TaskList must have ID");
        }
        if(!Objects.equals(taskList.getId(), id)){
            throw new IllegalArgumentException("the ID given don't refere to the tasklist ID");
        }
        TaskList existingTaskList = taskListRepo.findById(id).orElseThrow(()->
            { throw new IllegalArgumentException("TaskLIst not found");
            });
        existingTaskList.setTitle(taskList.getTitle());
        existingTaskList.setDescription(taskList.getDescription());
        existingTaskList.setUpdated(LocalDateTime.now());
        return taskListRepo.save(existingTaskList);

    }

    @Override
    public void deleteTaskList(UUID id) {
        taskListRepo.deleteById(id);
    }

}
