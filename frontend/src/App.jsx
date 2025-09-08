 import { Routes, Route, Navigate } from 'react-router-dom';
 
import Signup from './Components/Auth/Signup';
import Home from './pages/Home';
import Signin from './Components/Auth/Signin';
import Dashboard from './Components/Site/Dashboard';

function App() {
  return (
    <Routes>
      {/* Route par défaut : redirige "/" vers "/login" */}
      <Route path="/" element={<Navigate to="/Signin" replace />} />

      <Route path="/signup" element={<Signup />} />
      <Route path="/Signin" element={<Signin />} />
      <Route path="/home" element={<Home />} />
      <Route path="/dashboard" element={<Dashboard />} /> 
    </Routes>
  );
}

export default App;
