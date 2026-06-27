import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { RouterProvider, createBrowserRouter, Navigate } from "react-router-dom"
import "./index.css"
import { LoginForm } from "./components/LoginForm"
import { SignupForm } from "./components/SignupForm"
import { AuthProvider } from "./context/AuthContext"
import { ProtectedRoute } from "./components/ProtectedRoute"
import { Toaster } from "./components/ui/sonner"
import AuthLayout from "./layouts/AuthLayout"
import Dashboard from "./dashboard/Dashboard"
import Attendance from "./features/attendance/Attendance"
import ViewList from "./features/lists/ViewList"
import ManageList from "./features/lists/ManageList"
import ManageProfile from "./features/profile/ManageProfile"

const router = createBrowserRouter([
  {
    path: "/login",
    element: (
      <AuthLayout>
        <LoginForm />
      </AuthLayout>
    ),
  },
  {
    path: "/signup",
    element: (
      <AuthLayout>
        <SignupForm />
      </AuthLayout>
    ),
  },
  {
    path: "/dashboard",
    element: (
      <ProtectedRoute>
        <Dashboard />
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: <Navigate to="attendance" replace /> },
      { path: "attendance", element: <Attendance /> },
      { path: "view-lists", element: <ViewList /> },
      { path: "manage-lists", element: <ManageList /> },
      { path: "profile", element: <ManageProfile /> },
    ],
  },
  { path: "/", element: <Navigate to="/dashboard" replace /> },
  { path: "*", element: <Navigate to="/dashboard" replace /> },
])

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
      <Toaster position="top-center" />
    </AuthProvider>
  </StrictMode>
)
