import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";
import EmployeesPage from "./pages/dashboard/employees/EmployeesPage";
import OverviewPage from "./pages/dashboard/overview/OverviewPage";
import EditDepartmentPage from "./pages/dashboard/overview/EditDepartmentPage";
import { Toaster } from "./components/ui/sonner";
import PrivateRoute from "./lib/PrivateRoute";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* ✅ Protected routes wrapped individually */}
        <Route
          path="/overview"
          element={
            <PrivateRoute>
              <OverviewPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/employees"
          element={
            <PrivateRoute>
              <EmployeesPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/edit-department/:id"
          element={
            <PrivateRoute>
              <EditDepartmentPage />
            </PrivateRoute>
          }
        />
      </Routes>

      <Toaster />
    </Router>
  );
}

export default App;
