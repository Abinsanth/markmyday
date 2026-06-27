import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import "./index.css"
import App from "./App.tsx"
import { LoginForm } from "./components/LoginForm.tsx"
import { SignupForm } from "./components/SignupForm.tsx"
import { AuthProvider } from "./context/AuthContext.tsx"
import { ProtectedRoute } from "./components/ProtectedRoute.tsx"
import AuthLayout from "./layouts/AuthLayout"
import { Toaster } from "@/components/ui/sonner"

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      {/* <Toaster position="top-center" /> */}
      <Toaster position="top-center" richColors expand={true} />
      <AuthProvider>
        <Routes>
          <Route
            path="/login"
            element={
              <AuthLayout>
                <LoginForm />
              </AuthLayout>
            }
          />
          <Route
            path="/signup"
            element={
              <AuthLayout>
                <SignupForm />
              </AuthLayout>
            }
          />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <App />
              </ProtectedRoute>
            }
          />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
)
