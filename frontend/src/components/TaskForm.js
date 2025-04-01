import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


const TaskForm = ({ setTasks }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [completed, setCompleted] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [priority, setPriority] = useState("");
  const [category, setCategory] = useState("");


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
            completed,
            dueDate,
            priority,
            category
         },
        { headers: { "x-auth-token": `${token}` }}
      );
     
      navigate("/tasks",  { state: { successMessage: "Task Created successfully!" }});
    } catch (error) {
      console.error("Task creation failed", error);
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold mb-4 text-center">Add Task</h2>

        <input 
          type="text" 
          value={title} 
          onChange={(e) => setTitle(e.target.value)} 
          placeholder="Task title" 
          required 
          className="w-full p-2 mb-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <input 
          type="text" 
          value={description} 
          onChange={(e) => setDescription(e.target.value)} 
          placeholder="Task description" 
          required 
          className="w-full p-2 mb-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <input 
          type="date" 
          value={dueDate} 
          onChange={(e) => setDueDate(e.target.value)} 
          placeholder="Task Due Date" 
          required 
          className="w-full p-2 mb-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <select 
          value={priority} 
          onChange={(e) => setPriority(e.target.value)} 
          required 
          className="w-full p-2 mb-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          <option value="">Task Priority</option>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select> 

        <select 
          value={category} 
          onChange={(e) => setCategory(e.target.value)} 
          required 
          className="w-full p-2 mb-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          <option value="">Task Category</option>
          <option value="Work">Work</option>
          <option value="Personal">Personal</option>
        </select>

        <select 
          value={completed} 
          onChange={(e) => setCompleted(e.target.value == "true")} 
          required 
          className="w-full p-2 mb-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          <option value="">Task Completed?</option>
          <option value="true">Yes</option>
          <option value="false">No</option>
        </select>

        <button 
          type="submit" 
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition">
          Add Task
        </button>
      </form>
    </div>

  );
};

export default TaskForm;
