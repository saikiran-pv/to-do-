import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

function TaskDetails() {
  const { _id } = useParams(); // Get task ID from URL
  const navigate = useNavigate();

  const [task, setTask] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

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

      navigate("/tasks"); // Redirect to task list after deletion
    } catch (error) {
      console.error("Error deleting task", error);
    }
  };

  return (
    <div>
      <h2>Task Details</h2>
      {isEditing ? (
        <>
          <input
            type="text"
            value={task.title}
            onChange={(e) => setTask({ ...task, title: e.target.value })}
          />
          <textarea
            value={task.description}
            onChange={(e) => setTask({ ...task, description: e.target.value })}
          />
          <button onClick={handleUpdate}>Save</button>
        </>
      ) : (
        <>
          <h3>{task.title}</h3>
          <p>{task.description}</p>
          <button onClick={() => setIsEditing(true)}>Update</button>
        </>
      )}

      <button onClick={handleDelete} style={{ color: "red" }}>
        Delete
      </button>
    </div>
  );
}

export default TaskDetails;
