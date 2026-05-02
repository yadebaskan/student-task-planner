# Student Task Planner

A full-stack web application that allows students to manage and track their study tasks.

---

## Overview

This project is developed to help users organize their tasks, assign deadlines, and monitor their progress. The system supports user authentication and ensures that each user can only access their own data.

---

## Features

- User registration and login (JWT authentication)
- Create, update, and delete tasks
- Assign deadlines to tasks
- Mark tasks as completed or pending
- Filter tasks based on status
- View tasks in a calendar
- Visualize task status using charts
- Dark mode support

---

## System Architecture

The application follows a three-tier architecture:

- Frontend: React
- Backend: Node.js with Express
- Database: SQLite

Detailed architectural information is available in the Software Architecture Document:

docs/SAD.pdf

---

## Technologies Used

Frontend:
- React
- Chart.js
- React Calendar
- CSS

Backend:
- Node.js
- Express
- JWT
- bcrypt

Database:
- SQLite

---

## Installation

### Clone the repository

bash git clone https://github.com/yadebaskan/student-task-planner.git cd student-task-planner 

---

### Backend setup

bash cd backend npm install node server.js 

The backend runs on:
http://localhost:3000

---

### Frontend setup

bash cd frontend npm install npm run dev 

The frontend runs on:
http://localhost:5177

---

## Authentication

The system uses JSON Web Tokens (JWT) for authentication. After login, the token is stored in local storage and included in API requests. Each user can only access their own tasks.

---

## Project Structure

student-task-planner/ │ ├── frontend/ │   ├── src/ │   └── App.jsx │ ├── backend/ │   ├── server.js │   ├── app.js │   └── config/ │ ├── docs/ │   └── SAD.pdf │ └── README.md

---

## Future Improvements

- Mobile application version
- Notification system for deadlines
- Task sharing between users
- Cloud deployment
- Drag and drop task management

---

## Author

Yade Başkan

---

## Notes

This project was developed as part of a software architecture course.
