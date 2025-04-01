import { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";
import AuthContext from "../context/AuthContext";

const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const { user } = useContext(AuthContext);
  const [tasks, setTasks] = useState([]);
  
  useEffect(() => {
    if (user) {
      fetchTasks();
    }
  }, [user]);

  const fetchTasks = async () => {
    console.log("we are here");
    const token = localStorage.getItem("token");
    try {
      const res = await axios.get("http://localhost:5001/api/tasks", {
        headers: { "x-auth-token": `${token}` },
      });

      console.log("we are here");
      setTasks(res.data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  const addTask = async (task) => {
    const token = localStorage.getItem("token");
    try {
      const res = await axios.post(
        "http://localhost:5001/api/tasks",
        task,
        { headers: { "x-auth-token": `${token}` } }
      );
      setTasks([...tasks, res.data]);
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  const deleteTask = async (taskId) => {
    const token = localStorage.getItem("token");
    try {
      await axios.delete(`http://localhost:5001/api/tasks/${taskId}`, {
        headers: { "x-auth-token": `${token}` },
      });
      setTasks(tasks.filter((task) => task._id !== taskId));
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  return (
    <TaskContext.Provider value={{ tasks, fetchTasks, addTask, deleteTask }}>
      {children}
    </TaskContext.Provider>
  );
};

export default TaskContext;
