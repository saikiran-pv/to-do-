import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Register from './pages/Register';  // Assuming Register component is created
import Login from './pages/Login';        // Assuming Login component is created
import Tasks from "./pages/Tasks";
import TaskDetails from "./pages/TaskDetails";
import NewTask from './pages/NewTask';
import About from './pages/About'; 
import Footer from "./pages/footer";
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';



function App() {

  const isAuthenticated = !!localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove user data from storage
    window.location.reload(); // Refresh the page to update UI
  };

  return (
    <AuthProvider>
    <Router>
      <div className="min-h-screen flex flex-col">
        {/* Navigation Links */}
        <div className="flex-grow">
        <nav className=" bg-purple-500 p-4 h-16">
        <Link to="/" className="text-white text-3xl font-bold">
          TODO
        </Link>
        <ul className="flex space-x-4 float-right ">
          <li className="text-whit items-center space-x-6">
            {isAuthenticated ? (
              <> 
                <Link to="/tasks" className="hover:text-blue-300 transition">Tasks</Link>
                <button
                  onClick={handleLogout}
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-400 transition"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/register" className="hover:text-blue-300 text-lg transition">Register</Link>
                <Link to="/login" className="hover:text-blue-300 text-lg transition">Login</Link>
              </>
            )}
          </li>
        </ul>
      </nav>

     


        {/* Define Routes */}
        <Routes>
          <Route path="/" element={<About />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/tasks" element={<Tasks />} />
          </Route>
          <Route path="/task/:_id" element={<TaskDetails />} />
          <Route path="/newtask" element={<NewTask />} />
          <Route path="/login" element={<Login /> } />
          <Route path="/register" element={<Register />} />
          
        </Routes>
      </div>
      </div>
      <Footer />
    </Router>
    </AuthProvider>
  );
}

export default App;