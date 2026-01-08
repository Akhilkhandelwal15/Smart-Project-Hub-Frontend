# Smart Project Hub - Frontend Documentation

## 1. Project Overview
**Smart Project Hub** is a modern React-based frontend application designed for project and task management. It allows users to collaborate on projects, track tasks, and manage roles within a team. The application is built for performance and implemented using Vite.

## 2. Technology Stack
*   **Core**: React 18, Vite
*   **Language**: JavaScript (ES Modules)
*   **UI Components**: Material UI (@mui/material)
*   **State Management**: React Query (Server State), React Context (Auth State)
*   **Routing**: React Router DOM v6+
*   **Forms**: React Hook Form + Yup Validation
*   **HTTP Client**: Axios

## 3. Getting Started

### Prerequisites
*   Node.js (v16 or higher recommended)
*   npm or yarn

### Installation
1.  **Clone the repository**:
    ```bash
    git clone <repository-url>
    cd frontend
    ```

2.  **Install dependencies**:
    ```bash
    npm install
    ```

3.  **Configuration**:
    Create a `.env` file in the root directory based on your backend configuration.
    ```env
    VITE_API_URL=http://localhost:5000/api # Example backend URL
    ```

4.  **Run the application**:
    ```bash
    npm run dev
    ```

## 4. Project Structure
The source code is located in the `src` directory:

*   **`api/`**: Axios configuration and API endpoints (auth, projects, tasks).
*   **`components/`**: Reusable UI components.
*   **`context/`**: Global state providers (e.g., `AuthContext`).
*   **`features/`**: Feature-specific logic and UI (e.g., specific views for Projects/Tasks).
*   **`pages/`**: Main page views (Login, Signup, Dashboard).
*   **`routes/`**: Routing configuration including Protected and Public routes.
*   **`validations/`**: Yup validation schemas.

## 5. Core Features

### Authentication & Authorization
*   **Flow**: The app uses cookie-based authentication (indicated by `withCredentials: true` in Axios).
*   **Context**: `AuthContext` manages the current user state and determines if the user is authenticated.
*   **Route Protection**:
    *   `PrivateRoute`: Restricts access to logged-in users.
    *   `ProjectRoute` / `Role Based Checks`: Restricts access based on user roles (e.g., `owner`, `manager`).

### Dashboard
The central hub for viewing project summaries and navigating to specific project details.

### Project Management
*   **List Projects**: View all accessible projects.
*   **Create Project**: Form to initialize new projects.
*   **Project Details**: Detailed view of a project, probably fetching tasks associated with it.

### Task Management
*   **Task Tracking**: Functionality to view, create, and update tasks within projects.

## 6. API Integration
The application uses a centralized Axios instance (`src/api/apiInstance.js`) to handle HTTP requests.
*   **Base URL**: Configured via `VITE_API_URL`.
*   **Credentials**: Automatically sends cookies with requests for secure authentication.

## 7. Commands
*   `npm run dev`: Start the development server.
*   `npm run build`: Build for production.
*   `npm run lint`: Run ESLint checks.
*   `npm run preview`: Preview the production build locally.
