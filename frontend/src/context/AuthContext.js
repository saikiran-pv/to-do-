import React, { createContext, useState, useEffect } from 'react';


// Create Context
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);  // State to store user information
  const [loading, setLoading] = useState(true);  // State to track loading state during authentication

  // Check localStorage for the token when the app is loaded
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      // Assuming the token is a JWT, you can decode it to get the user information
      const decodedUser = JSON.parse(atob(token.split('.')[1]));  // Decoding JWT to get user info
      setUser(decodedUser);
    }
    setLoading(false);
  }, []);

  const login = (userData, token) => {
    localStorage.setItem('token', token);  // Store token in localStorage
    setUser(userData);  // Store user data
   
  };

  const logout = () => {
    localStorage.removeItem('token');  // Remove token from localStorage
    setUser(null);  // Reset user state
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
