import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import TaskForm from "../components/TaskForm";

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:5001/api/tasks", {
          headers: { "x-auth-token": `${token}` },
        });
        setTasks(res.data);
      } catch (error) {
        console.error("Error fetching tasks", error);
        navigate("/login");
      }
    };

    fetchTasks();
  }, [navigate]);

  return (
    <div>
      <h2>To-Do List</h2>
      <Link to={`/newtask`}>new task</Link> {/* Task Link */}
      <ul>
        {tasks.map((task) => (
          <li key={task._id}>
            <Link to={`/task/${task._id}`}>{task.title}</Link> {/* Task Link */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Tasks;
