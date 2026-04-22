import React, { useEffect, useState } from "react";
import "./App.css";
import { FaTasks } from "react-icons/fa";

function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const fetchTasks = () => {
    fetch("http://localhost:8080/tasks")
      .then((res) => res.json())
      .then((data) => setTasks(data));
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const addTask = () => {
    fetch("http://localhost:8080/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        description,
        completed: false,
      }),
    }).then(() => {
      fetchTasks();
      setTitle("");
      setDescription("");
    });
  };

  const deleteTask = (id) => {
    fetch(`http://localhost:8080/tasks/${id}`, {
      method: "DELETE",
    }).then(() => fetchTasks());
  };


  const toggleTask = (task) => {
  fetch(`http://localhost:8080/tasks/${task.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: task.title,
      description: task.description,
      completed: !task.completed, // 🔥 flip value
    }),
  }).then(() => fetchTasks());
};

  return (
  <div className="App">
    <h1 className="heading">
        <FaTasks className="icon" />
          Task Manager
    </h1>

    <div>
  <input
    type="text"
    placeholder="Enter Title"
    value={title}
    onChange={(e) => setTitle(e.target.value)}
  />

  <input
    type="text"
    placeholder="Enter Description"
    value={description}
    onChange={(e) => setDescription(e.target.value)}
  />

  <button onClick={addTask}>Add Task</button>

  <br /><br />
</div>

    <div className="task-list">
      {tasks.map((task) => (
        <div className="card" key={task.id}>
          <h3>{task.title}</h3>
          <p>{task.description}</p>

          <span
            className={task.completed ? "done" : "pending"}
            onClick={() => toggleTask(task)}
            style={{ cursor: "pointer" }}
          >
            {task.completed ? "✔ Done" : "❌ Pending"}
          </span>

          <br /><br />

          <button onClick={() => deleteTask(task.id)}>Delete</button>
        </div>
      ))}
    </div>
  </div>
);
}

export default App;
