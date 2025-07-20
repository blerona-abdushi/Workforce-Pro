import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";
import EmployeesPage from "./pages/dashboard/employees/EmployeesPage";
import OverviewPage from "./pages/dashboard/overview/OverviewPage";
import { Toaster } from "./components/ui/sonner";
import PrivateRoute from "./lib/PrivateRoute";
import EditDepartmentPage from "./pages/dashboard/overview/EditDepartmentPage";

function App() {
  return (
   <Router>
     <Routes>
      <Route path="/" element={<LandingPage/>}/>
      <Route path="/login" element={<LoginPage/>}/>
      <Route path="/register" element={<RegisterPage/>}/>
     </Routes>
     <PrivateRoute>
      <Routes>
      <Route path="/overview" element={<OverviewPage/>}/>
      <Route path="/employees" element={<EmployeesPage/>}/>
      <Route path="/edit-department/:id" element={<EditDepartmentPage/>}/>
      </Routes>
      </PrivateRoute>

     <Toaster/>
   </Router>
  );
}

export default App;
