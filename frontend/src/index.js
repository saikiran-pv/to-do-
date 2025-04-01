import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { AuthProvider } from "./context/AuthContext"; // ✅ Import AuthProvider
import { TaskProvider } from "./pages/TaskContext"; // ✅ Import TaskProvider

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthProvider> {/* ✅ Wrap with AuthProvider */}
      <TaskProvider> {/* ✅ Wrap with TaskProvider */}
        <App />
      </TaskProvider>
    </AuthProvider>
  </React.StrictMode>
);

reportWebVitals();
