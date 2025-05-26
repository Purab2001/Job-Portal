# 🚀 Job Portal Application

Welcome to the Job Portal Application! This project is a comprehensive platform designed to connect job seekers with potential employers, offering a seamless experience for finding and applying for jobs.

## ✨ Core Features

-   **User Authentication**: Secure sign-up and login functionalities powered by Firebase.
-   **Job Browsing & Search**: Easily discover job listings with intuitive search and filtering options.
-   **Detailed Job View**: Access comprehensive information for each job, including descriptions, requirements, and company details.
-   **Job Application**: Apply for desired positions directly through the platform.
-   **Application Tracking**: Keep track of all your submitted job applications.
-   **Responsive Design**: A user-friendly interface that adapts to various screen sizes.

## 🛠️ Technology Stack

This application is built using a modern and robust technology stack:

### Frontend
-   **React**: A declarative, efficient, and flexible JavaScript library for building user interfaces.
-   **Vite**: A fast build tool that provides a lightning-fast development experience for modern web projects.
-   **React Router**: For declarative routing within the application.
-   **Firebase**: Utilized for user authentication and potentially other backend services.

### Backend
-   **Node.js**: A JavaScript runtime built on Chrome's V8 JavaScript engine.
-   **Express.js**: A fast, unopinionated, minimalist web framework for Node.js.
-   **MongoDB**: A NoSQL database for storing job listings, user data, and application details.

### Deployment
-   **Vercel**: For deploying the Node.js backend API.
-   **Firebase Hosting**: For hosting the React frontend application.

## ⚙️ Setup Instructions

Follow these steps to get the project up and running on your local machine.

### Prerequisites

-   Node.js (v14 or higher recommended)
-   npm or Yarn
-   MongoDB Atlas account (or local MongoDB instance)
-   Firebase project

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/job-portal.git
cd job-portal
```

### 2. Backend Setup

Navigate to the `backend` directory and install dependencies:

```bash
cd backend
npm install
```

Create a `.env` file in the `backend` directory and add your environment variables. Example:

```
PORT=5000
MONGODB_URI=your_mongodb_connection_string
FIREBASE_API_KEY=your_firebase_api_key
# Add other Firebase config variables as needed
```

### 3. Frontend Setup

Navigate to the `frontend` directory and install dependencies:

```bash
cd ../frontend
npm install
```

Create a `.env.local` file in the `frontend` directory and add your Firebase configuration and other environment variables. Example:

```
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
VITE_FIREBASE_PROJECT_ID=your_firebase_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
VITE_FIREBASE_APP_ID=your_firebase_app_id
VITE_FIREBASE_MEASUREMENT_ID=your_firebase_measurement_id
VITE_BACKEND_API_URL=http://localhost:5000 # Or your Vercel deployed backend URL
```

### 4. Run the Application

#### Start Backend

From the `backend` directory:

```bash
npm start
```

The backend server will run on `http://localhost:5000` (or the port you specified).

#### Start Frontend

From the `frontend` directory:

```bash
npm run dev
```

The frontend application will open in your browser, typically at `http://localhost:5173`.

## 🌐 Live Application

Explore the live application deployed on Firebase Hosting: [https://job-portal-2f4d7.web.app/](https://job-portal-2f4d7.web.app/)

---
Made with ❤️ by Abir Shahadat Purab