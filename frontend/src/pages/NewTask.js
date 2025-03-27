import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useNavigate, Link } from "react-router-dom";
import TaskForm from "../components/TaskForm";

const NewTask = () => {

  return (
    <div>
      <h2>Add New Task</h2>
      <TaskForm/>
    </div>
  );
};

export default NewTask;
