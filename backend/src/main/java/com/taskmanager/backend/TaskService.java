package com.taskmanager.backend;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
public class TaskService {
    
    @Autowired
    private TaskRepository taskRepository;

    //Get all task
    public List<Task> getAllTask() {
        return taskRepository.findAll();
    }

    //Create new Task
    public Task createTask(Task task){
        return taskRepository.save(task);
    }

    //Get task by id
    public Task getTaskById(Long id){
        return taskRepository.findById(id).orElse(null);
    }

    //Delete task
    public void deleteTask(Long id){
        taskRepository.deleteById(id);
    }

    //PUT : update task
    public Task updateTask(Long id, Task updateTask){
        Task existing = taskRepository.findById(id).orElse(null);

        if(existing != null){
            existing.setTitle(updateTask.getTitle());
            existing.setDescription(updateTask.getDescription());
            existing.setCompleted(updateTask.isCompleted());

            return taskRepository.save(existing);
        }

        return null;
    }
}
