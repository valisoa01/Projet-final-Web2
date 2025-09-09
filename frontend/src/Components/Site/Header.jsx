import { LogOut, Bell, Moon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import API from '../../api/axios';
import Logo from '../../assets/react.svg'; // <-- Make sure to set the correct path to your logo

const Header = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');

  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);

  const handleLogout = async () => {
    try {
      await API.post('/auth/logout');
    } catch (err) {
      console.error('Error during logout:', err);
    } finally {
      localStorage.clear();
      navigate('/signin');
    }
  };

  return (
    <div className="bg-white dark:bg-gray-900 shadow-md h-[10vh] w-full flex items-center fixed z-50">
      
      {/* Logo + App Name */}
      <div className="w-[20%] flex items-center pl-6">
        <div className="w-12 h-12 relative mr-2">
          {/* Animated background circles */}
          <div className="absolute w-4 h-4 bg-cyan-300 rounded-full top-1 left-1 animate-ping"></div>
          <div className="absolute w-2 h-2 bg-cyan-400 rounded-full bottom-1 right-1 animate-pulse"></div>
          {/* Logo */}
          <img src={Logo} alt="App Logo" className="w-full h-full object-contain relative z-10 rounded-full" />
        </div>
        <span className="text-xl font-semibold text-gray-800 dark:text-white">
          Expense <span className="text-cyan-500">Tracker</span>
        </span>
      </div>

      {/* Action Buttons */}
      <div className="w-[80%] flex items-center justify-end pr-6 gap-4">
        {/* Notifications */}
        <div className="relative">
          <button className="w-10 h-10 flex items-center justify-center border border-cyan-400 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800">
            <Bell className="w-5 h-5 text-cyan-500" />
            <span className="absolute top-1 right-1 block w-2 h-2 rounded-full bg-red-500"></span>
          </button>
        </div>

        {/* Logout */}
        <div className="relative">
          <button onClick={handleLogout} className="w-10 h-10 flex items-center justify-center border border-cyan-400 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800">
            <LogOut className="w-5 h-5 text-cyan-500" />
          </button>
        </div>

        {/* Dark Mode Toggle */}
        <div className="relative">
          <button className="w-10 h-10 flex items-center justify-center border border-cyan-400 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800">
            <Moon className="w-5 h-5 text-cyan-500" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header;
