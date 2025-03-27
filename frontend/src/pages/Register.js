// src/components/Register.js
import React, { useState } from 'react';
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Register() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5001/api/users/register", formData);
      navigate("/login");
    } catch (error) {
      console.error("Registration failed", error.response.data);
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          placeholder="Username" 
          value={formData.username}
          onChange={(e) => setFormData({ ...formData, username: e.target.value })}
        />
        <input 
          type="email" 
          placeholder="Email" 
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />
        <input 
          type="password" 
          placeholder="Password" 
          value={formData.password}
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
        />
        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default Register;
