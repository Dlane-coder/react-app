import React, { useState, useEffect } from "react";
import './App.css';
function App() {
  // State to store tasks
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");

  // Function to add a new task
  const addTask = () => {
    if (newTask.trim() !== "") {
      setTasks([...tasks, { text: newTask, completed: false }]); // Store task as an object
      setNewTask(""); // Clear input field
    }
  };

  // Function to toggle task completion
  const toggleComplete = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index] = { ...updatedTasks[index], completed: !updatedTasks[index].completed };
    setTasks(updatedTasks);
  };

  // Function to remove a task
  const removeTask = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  // Load saved tasks when the app starts
  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem("tasks"));
    if (savedTasks) {
      setTasks(savedTasks);
    }
  }, []);

  // Save tasks whenever they change
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  // ✅ Make sure this `return` is inside the function
  return (
    <div className="App">
      <h1>To-Do List</h1>
      <div>
        <input
          type="text"
          placeholder="Enter a task..."
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <button onClick={addTask}>Add Task</button>
      </div>
      <ul>
  {tasks.map((task, index) => (
    <li key={index} style={{ display: "flex", alignItems: "center", gap: "10px", padding: "10px", borderRadius: "5px", background: "white" }}>
      <input
        type="checkbox"
        checked={task.completed}
        onChange={() => toggleComplete(index)}
      />
      <span style={{ textDecoration: task.completed ? "line-through" : "none", color: "black" }}>
        {task.text}
      </span>
      <button className="delete-btn" onClick={() => removeTask(index)}>❌</button>
    </li>
  ))}
</ul>
</div>
);
}

export default App;

