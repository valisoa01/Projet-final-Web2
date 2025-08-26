 import { Routes, Route, Navigate } from 'react-router-dom';
import Register from './Components/Auth/Register';
import Home from './pages/Home';
import Signin from './Components/Auth/Signin';

function App() {
  return (
    <Routes>
      {/* Route par défaut : redirige "/" vers "/login" */}
      <Route path="/" element={<Navigate to="/Signin" replace />} />

      <Route path="/register" element={<Register />} />
      <Route path="/Signin" element={<Signin />} />
      <Route path="/home" element={<Home />} />
    </Routes>
  );
}

export default App;
