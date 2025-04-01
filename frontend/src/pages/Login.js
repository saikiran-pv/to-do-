// src/components/Login.js
import React, { useState ,useContext} from 'react';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AuthContext from '../context/AuthContext';


function Login() {

  const { login } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(formData);
      const res = await axios.post("http://localhost:5001/api/users/login", formData);

      login(res.data.user, res.data.token);
      // localStorage.setItem("token", res.data.token);
      window.location.href = "/tasks";

    } catch (error) {
      console.error("Login failed", error.response.data);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-96">
      <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <label className="block text-gray-700">Email</label>
        <input 
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          type="email" 
          placeholder="Email" 
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />
        <label className="block text-gray-700">Password</label>
        <input 
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          type="password" 
          placeholder="Password" 
          value={formData.password}
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
        />
        <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition">Login</button>
      </form>
    </div>
    </div>
  );
}

export default Login;
