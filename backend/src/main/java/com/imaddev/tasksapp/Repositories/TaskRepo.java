package com.imaddev.tasksapp.Repositories;

import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.imaddev.tasksapp.entity.Task;
import java.util.List;
import java.util.Optional;


@Repository
public interface TaskRepo extends JpaRepository<Task,UUID>{
    List<Task> findByTaskListId(UUID taskListId);
    Optional<Task> findByTaskListIdAndId(UUID taskListId,UUID taskId);
    void deleteByTaskListIdAndId(UUID taskListId,UUID taskId);
}
