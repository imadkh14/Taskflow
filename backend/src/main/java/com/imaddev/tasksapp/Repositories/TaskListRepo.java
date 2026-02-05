package com.imaddev.tasksapp.Repositories;

import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.imaddev.tasksapp.entity.TaskList;

@Repository
public interface TaskListRepo extends JpaRepository<TaskList,UUID>{

}
