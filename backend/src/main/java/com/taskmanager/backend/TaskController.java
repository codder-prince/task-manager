package com.taskmanager.backend;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/tasks")
// @CrossOrigin("*")   // frontend connect ke liye
public class TaskController {
    
    @Autowired
    private TaskService taskService;

    //GET all tasks
    @GetMapping
    public List<Task> getAllTasks(){
        return taskService.getAllTask();
    }

    //POST create task
    @PostMapping
    public Task createTask(@RequestBody Task task){
        return taskService.createTask(task);
    }

    //GET task by id
    @GetMapping("/{id}")
    public Task getTaskById(@PathVariable Long id){
        return taskService.getTaskById(id);
    }

    //DELETE task
    @DeleteMapping("/{id}")
    public void deleteTask(@PathVariable Long id){
        taskService.deleteTask(id);
    }

    //PUT task
    @PutMapping("/{id}")
    public Task updateTask(@PathVariable Long id, @RequestBody Task task){
        return taskService.updateTask(id, task);
    }

}
