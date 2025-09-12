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


 
 
