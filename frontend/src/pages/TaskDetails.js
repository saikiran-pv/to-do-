import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

function TaskDetails() {
  const { _id } = useParams(); // Get task ID from URL
  const navigate = useNavigate();

  const [task, setTask] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const location = useLocation();

  const [notification, setNotification] = useState(location.state?.successMessage);

  // Fetch the task when the component mounts
  useEffect(() => {
    const fetchTask = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(`http://localhost:5001/api/tasks/${_id}`, {
          headers: { "x-auth-token": `${token}` },
        });

        if (res.data) {
          setTask(res.data); // Set task if found
        } else {
          navigate("/"); // Redirect if task not found
        }
      } catch (error) {
        console.error("Error fetching task", error);
        navigate("/"); // Redirect to home
      }
    };

    fetchTask();
  }, [_id, navigate]);

  if (!task) return <p>Loading...</p>;

  const handleUpdate = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.put(`http://localhost:5001/api/tasks/${_id}`, task, {
        headers: { "x-auth-token": `${token}` },
      });
      navigate("/tasks", { state: { successMessage: "Task Updated successfully!" }});
      setIsEditing(false); // Disable editing mode
    } catch (error) {
      console.error("Error updating task", error);
    }
  };

  const handleDelete = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:5001/api/tasks/${_id}`, {
        headers: { "x-auth-token": `${token}` },
      });

      navigate("/tasks", { state: { successMessage: "Task deleted successfully!" }}); // Redirect to task list after deletion
    } catch (error) {
      console.error("Error deleting task", error);
    }
  };

  const handleCloseNotification = () => {
    setNotification(null); // Close the notification manually
  };

  return (
    <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg p-6 mt-10">
      <h2 className="text-xl font-bold text-gray-800 mb-4">Task Details</h2>
      {notification && (
          <div className="fixed inset-0 flex justify-center items-center z-50 bg-black bg-opacity-50">
            <div className="bg-green-500 text-white p-4 rounded-lg w-1/3 max-w-md">
              <div className="flex justify-between items-center">
                <span>{notification}</span>
                <button
                  className="text-white font-bold"
                  onClick={handleCloseNotification}
                >
                  X
                </button>
              </div>
            </div>
          </div>
        )}
      {isEditing ? (
        <>
          <input
            type="text"
            value={task.title}
            onChange={(e) => setTask({ ...task, title: e.target.value })}
            className="w-full p-2 border rounded mb-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <textarea
            value={task.description}
            onChange={(e) => setTask({ ...task, description: e.target.value })}
            className="w-full p-2 border rounded mb-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <select 
            value={task.priority} 
            onChange={(e) => setTask({ ...task, priority: e.target.value })}
            required 
            className="w-full p-2 mb-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="">Task Priority</option>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select> 

          <select 
            value={task.category} 
            onChange={(e) => setTask({ ...task, category: e.target.value })}
            required 
            className="w-full p-2 mb-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="">Task Category</option>
            <option value="Work">Work</option>
            <option value="Personal">Personal</option>
          </select>

          <select 
            value={task.completed} 
            onChange={(e) => setTask({ ...task, completed: e.target.value })}
            required 
            className="w-full p-2 mb-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="">Task Completed?</option>
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select>

          <button 
            onClick={handleUpdate} 
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
          >
            Save
          </button>
        </>
      ) : (
        <>
          <h3 className="text-lg font-semibold text-gray-700">{task.title}</h3>
          <p className="text-gray-600 mb-4">{task.description}</p>
          <button 
            onClick={() => setIsEditing(true)}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
          >
            Update
          </button>
        </>
      )}

      <button 
        onClick={handleDelete} 
        className="bg-red-500 text-white px-4 py-2 rounded mt-4 hover:bg-red-600 transition"
      >
        Delete
      </button>
    </div>

  );
}

export default TaskDetails;
