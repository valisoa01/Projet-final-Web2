// Header.jsx
import { LogOut, Bell, Moon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

const Header = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');

  useEffect(() => {
    // Récupérez le username depuis le localStorage
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    navigate('/signin');
  };

  return (
    <div className="bg-white shadow-md h-[10vh] w-full flex flex-row items-center fixed">
      {/* Logo + Name */}
      <div className="w-[20%] flex items-center pl-6">
        <div className="w-8 h-8 flex items-center justify-center rounded-full border-2 border-purple-500 text-purple-500 font-bold mr-2">
          {username ? username.charAt(0).toUpperCase() : 'U'}
        </div>
        <span className="text-xl font-semibold text-gray-800">
          Expense <span className="text-black">Tracker</span>
        </span>
      </div>

      {/* Action Buttons */}
      <div className="w-[80%] flex items-center justify-end pr-6 gap-4">
        <div className="relative">
          <button className="w-10 h-10 flex items-center justify-center border border-purple-400 rounded-lg hover:bg-gray-100">
            <Bell className="w-5 h-5 text-purple-600" />
            <span className="absolute top-1 right-1 block w-2 h-2 rounded-full bg-red-500"></span>
          </button>
        </div>

        <div className="relative">
          <button onClick={handleLogout} className="w-10 h-10 flex items-center justify-center border border-purple-400 rounded-lg hover:bg-gray-100">
            <LogOut className="w-5 h-5 text-purple-600" />
          </button>
        </div>

        <div className="relative">
          <button className="w-10 h-10 flex items-center justify-center border border-purple-400 rounded-lg hover:bg-gray-100">
            <Moon className="w-5 h-5 text-purple-600" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header;