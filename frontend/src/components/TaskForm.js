import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


const TaskForm = ({ setTasks }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [completed, setCompleted] = useState("");

  const navigate = useNavigate();
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const res = await axios.post(
        "http://localhost:5001/api/tasks",
        { 
            title,
            description,
            completed
         },
        { headers: { "x-auth-token": `${token}` }}
      );
      console.log("hey we logged here");
      navigate("/tasks");
    } catch (error) {
      console.error("Task creation failed", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Task title" required />
      <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Task description" required />
      <input type="boolean" value={completed} onChange={(e) => setCompleted(e.target.value)} placeholder="Task completed" required />
      <button type="submit">Add Task</button>
    </form>
  );
};

export default TaskForm;
