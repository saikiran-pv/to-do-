README
To-Do App
A simple task management app where users can add, view, and delete tasks. It features token-based authentication and route protection for security.
Technologies Used
•	Frontend: React, React Router, Tailwind CSS, Axios
•	Backend: Node.js, Express, MongoDB
•	Authentication: JWT (JSON Web Tokens) for token-based authentication
•	State Management: React Context API
•	Database: MongoDB
Features
•	User Registration and Login
•	JWT-based authentication
•	Protected Routes (Tasks page)
•	Task creation, viewing, editing, and deletion
•	Task categories (Personal, Work, All Tasks)
•	Responsive design using Tailwind CSS
Setup Instructions
Follow the instructions below to get the app running locally.
Prerequisites
•	Node.js and npm: Ensure you have Node.js installed. You can check if it's installed by running:
node -v
npm -v
If not installed, download and install it from here.
•	MongoDB: Make sure you have a running MongoDB instance or use a cloud-based MongoDB service like MongoDB Atlas.

Installation
1.	Clone the repository:
	git clone https://github.com/saikiran-pv/to-do-.git
	cd <repository-folder>
2.	Install dependencies:
Frontend: Navigate to the frontend directory and install the dependencies:
cd frontend
npm install
Backend: Navigate to the backend directory and install the dependencies:
cd backend
npm install
Running the Application
Backend
1.	Edit  a .env file in the backend directory and add the following variables:
MONGO_URI=<your-mongodb-connection-string>
JWT_SECRET=<your-jwt-secret-key>
2.	Start the backend server: From the backend directory, run:
npm start
This will start the backend server on http://localhost:5001.
Frontend
1.	Start the frontend server: From the frontend directory, run:
npm start
This will start the frontend server on http://localhost:3000.
2.	Open the app: Once the servers are running, open a browser and go to http://localhost:3000 to view the app.


Project Structure
Here is an overview of the project structure:
/my-todo-app
  /backend
    /controllers
    /models
    /routes
    /middleware
    server.js
    .env
  /frontend
    /src
      /components
      /context
      /pages
      App.js
      index.js
    /public
    /styles
    package.json
  README.md
Backend
•	server.js: Main entry point for the Express backend.
•	/models: Mongoose models (e.g., User, Task).
•	/routes: Express routes for handling API requests (e.g., login, tasks).
•	/controllers: Functions that handle the logic for each route.
•	/middleware: JWT authentication middleware.
Frontend
•	/components: React components for UI (e.g., TaskList, TaskForm).
•	/context: React Context for state management (e.g., AuthContext).
•	/pages: React pages (e.g., Login, Register, Tasks).
•	App.js: Main React component that contains the routes.
•	index.js: Entry point for the React frontend.

