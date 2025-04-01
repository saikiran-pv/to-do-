import React, { useEffect, useState, useContext } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { PlusCircleIcon } from "@heroicons/react/24/solid";
import TaskContext from "./TaskContext";

const Tasks = () => {
  const { tasks, fetchTasks, deleteTask } = useContext(TaskContext); // Use Context API
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedTask, setSelectedTask] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  
  const [notification, setNotification] = useState(location.state?.successMessage);

  useEffect(() => {
    fetchTasks(); // Fetch tasks from context
  }, []);

  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => setNotification(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  const handleDelete = async (_id) => {
    await deleteTask(_id);
    setSelectedTask(null);
    setNotification("Task deleted successfully!");
  };

  const filteredTasks = selectedCategory
    ? tasks.filter((task) => task.category === selectedCategory)
    : tasks;

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="h-full w-[20%] bg-white flex flex-col items-center p-4">
        <h1 className="text-lg font-bold">Categories</h1>
        <ul className="mt-4 space-y-2">
          <li onClick={() => setSelectedCategory("Personal")} className="cursor-pointer hover:text-blue-500">Personal</li>
          <li onClick={() => setSelectedCategory("Work")} className="cursor-pointer hover:text-blue-500">Work</li>
          <li onClick={() => setSelectedCategory("")} className="cursor-pointer hover:text-blue-500">All Tasks</li>
        </ul>
      </div>

      {/* Task List */}
      <div className="h-full w-[50%] bg-gray-200 flex flex-col p-4">
        {notification && (
          <div className="fixed inset-0 flex justify-center items-center z-50 bg-black bg-opacity-50">
            <div className="bg-green-500 text-white p-4 rounded-lg">
              <div className="flex justify-between">
                <span>{notification}</span>
                <button onClick={() => setNotification(null)} className="text-white font-bold">X</button>
              </div>
            </div>
          </div>
        )}

        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold">Tasks</h2>
          <Link to="/newtask">
            <PlusCircleIcon className="w-8 h-8 text-green-600 hover:text-green-800" />
          </Link>
        </div>

        <ul>
          {filteredTasks.map((task) => (
            <li key={task._id} className="p-2 bg-white shadow-md rounded mb-2 cursor-pointer hover:bg-gray-300"
                onClick={() => setSelectedTask(task)}>
              {task.title}
            </li>
          ))}
        </ul>
      </div>

      {/* Task Details Panel */}
      <div className="h-full w-[30%] bg-gray-300 p-6 rounded-lg shadow-lg flex flex-col">
        {selectedTask ? (
          <>
            <h2 className="text-2xl font-bold mb-4">{selectedTask.title}</h2>
            <p className="text-gray-700 mb-4">{selectedTask.description}</p>
            <p className="text-gray-700 mb-4">Due: {new Date(selectedTask.dueDate).toLocaleDateString()}</p>
            <p className="text-gray-700 mb-4">Priority: {selectedTask.priority} | Category: {selectedTask.category}</p>
            <p className="text-gray-700 mb-6">{selectedTask.completed ? "Completed" : "Not Completed"}</p>

            <div className="flex space-x-4">
              <Link to={`/task/${selectedTask._id}`} className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
                Edit
              </Link>
              <button onClick={() => handleDelete(selectedTask._id)}
                      className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600">
                Delete
              </button>
            </div>
          </>
        ) : (
          <p className="text-gray-500">Click on a task to view details here.</p>
        )}
      </div>
    </div>
  );
};

export default Tasks;
