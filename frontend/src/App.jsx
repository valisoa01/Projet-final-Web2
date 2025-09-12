// src/App.js
import { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Signup from './Components/Auth/Signup';
import Home from './pages/Home';
import Signin from './Components/Auth/Signin';
import Dashboard from './Components/Site/Dashboard';
import Profile from './Components/Profile/Profile';
import Settings from './Components/Profile/Settings';
import Incomes from './Components/Site/Incomes';
import ExpensePage from "./Components/Site/Expense/ExpensePage";
import CategoryPage from "./Components/Site/Category/CategoryPage";
function App() {
  const [refreshKey, setRefreshKey] = useState(0);

  const triggerRefresh = () => {
    console.log("Triggering global refresh");
    setRefreshKey(prev => prev + 1);
  };

  return (
    <div>
      <Routes>
        <Route path="/" element={<Navigate to="/signin" replace />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route 
          path="/dashboard" 
          element={<Dashboard refreshKey={refreshKey} />} 
        />
        <Route path="/home" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/incomes" element={<Incomes />} />
        <Route 
          path="/expense" 
          element={<ExpensePage onChange={triggerRefresh} />} 
        />
        <Route 
          path="/category" 
          element={<CategoryPage onChange={triggerRefresh} />} 
        />
        <Route path="*" element={<h1>404 : Page non trouvée</h1>} />
      </Routes>
    </div>
  );
}

export default App;


 
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTQsImVtYWlsIjoibWlrb2phbnlhdm9AZ21haWwuY29tIiwidXNlcm5hbWUiOiJtaeyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJ2YWxpc29hdG9sb3RyaW5pYWluYUBnbWFpbC5jb20iLCJ1c2VybmFtZSI6InZhbGlzb2EwMSIsImlhdCI6MTc1NzY2MjQ5NywiZXhwIjoxNzU4MjY3Mjk3fQ.s1Np8hBQspxUZoVJbDRFdKFx5LtGhQOYdkVfvfNaNdMWtvamEiLCJpYXQiOjE3NTc2NTgyNTksImV4cCI6MTc1ODI2MzA1OX0.aNUT2vhGnI-6PiMU9cBo18WE5rRqmVwkvSTEfL1uLKY

// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTQsImVtYWlsIjoibWlrb2phbnlhdm9AZ21haWwuY29tIiwidXNlcm5hbWUiOiJtaWtvamEiLCJpYXQiOjE3NTc2MDUzNTYsImV4cCI6MTc1ODIxMDE1Nn0.Rbb80jr-mH_TEbQl_tV9HUAv6Az9YZJz0OF6qWa8OLE