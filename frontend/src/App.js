import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Register from './pages/Register';  // Assuming Register component is created
import Login from './pages/Login';        // Assuming Login component is created
import Tasks from "./pages/Tasks";
import TaskDetails from "./pages/TaskDetails";
import NewTask from './pages/NewTask';
// import Logout from "./pages/Logout";



function App() {

  const isAuthenticated = !!localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove user data from storage
    window.location.reload(); // Refresh the page to update UI
  };

  return (
    <Router>
      <div>
        {/* Navigation Links */}
        <nav>
          <ul>
            <li>
              {isAuthenticated ? (
                <> 
                  <Link to="/tasks">Tasks</Link>
                  <button onClick={handleLogout}>Logout</button>
                </>
              ) : (
                <>
                  <Link to="/register">Register</Link> {/* This is the name of the link */}
                  <Link to="/login">Login</Link> {/* This is the name of the link */}
                </>
              )}
            </li>
          </ul>
        </nav>

        {/* Define Routes */}
        <Routes>
          <Route path="/" element={<h1>Welcome to the To-Do App</h1>} />
          <Route path="/tasks" element={<Tasks />} />
          <Route path="/task/:_id" element={<TaskDetails />} />
          <Route path="/login" element={<Login /> } />
          <Route path="/register" element={<Register />} />
          <Route path="/newtask" element={<NewTask />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;