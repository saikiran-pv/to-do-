import React from 'react';

const About = () => {
  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-100 rounded-lg shadow-lg">
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-6">About Our Todo App</h1>
      
      <div className="mb-4">
        <h2 className="text-2xl font-semibold text-gray-700 mb-2">Welcome to the Todo App!</h2>
        <p className="text-lg text-gray-600">
          This Todo app helps you organize and manage your daily tasks. Whether you're managing personal tasks or work-related projects, you can easily create, update, and delete tasks with just a few clicks.
        </p>
      </div>

      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-700 mb-2">Features</h2>
        <ul className="list-disc pl-6 text-lg text-gray-600">
          <li className="mb-2">Add tasks with a title and description</li>
          <li className="mb-2">Filter tasks by category (e.g., Work, Personal)</li>
          <li className="mb-2">View task details, including due dates and priority</li>
          <li className="mb-2">Edit and delete tasks as needed</li>
        </ul>
      </div>

      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-700 mb-2">How It Works</h2>
        <p className="text-lg text-gray-600">
          After logging in, you can add new tasks, categorize them, set priorities, and set due dates. Tasks can be filtered based on their category, allowing you to focus on specific types of tasks. You can also view and edit task details, including the task description and due dates.
        </p>
      </div>

      <div>
        <h2 className="text-2xl font-semibold text-gray-700 mb-2">Get Started</h2>
        <p className="text-lg text-gray-600">
          To get started, simply create an account, log in, and start adding tasks. You can manage your tasks, track your progress, and stay organized.
        </p>
      </div>

      <div className="mt-6 text-center">
        <p className="text-lg text-gray-600">
          We hope this app helps you stay organized and productive!
        </p>
      </div>
    </div>
  );
};

export default About;
