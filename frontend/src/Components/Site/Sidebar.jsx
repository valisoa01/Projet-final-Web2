 import { Home, Wallet, Briefcase, User, Settings } from "lucide-react";
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
 import API from "../../api/axios";
 import { MdCategory } from "react-icons/md";
 
 const Sidebar = () => {
 
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) return;

        const res = await API.get('/users/me', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setProfile(res.data);
      } catch (err) {
        console.error('Profile fetch error', err);
      }
    };
    fetchProfile();
  }, []);

  const getInitials = (name) => {
    if (!name) return 'U';
    return name.charAt(0).toUpperCase();
  };

  return (
    <aside className="w-64 h-[90vh] fixed top-[10vh] left-0 bg-white dark:bg-gray-900 shadow-xl flex flex-col justify-between z-40 transition-colors duration-300">
      
      {/* User profile */}
      <div>
        <div className="flex items-center gap-3 p-5 border-b border-gray-200 dark:border-gray-700">
          <div className="w-12 h-12 rounded-full bg-cyan-500 flex items-center justify-center text-white font-bold ring-2 ring-cyan-300/30 overflow-hidden shadow-md">
            {profile?.profileUrl ? (
              <img 
                src={`http://localhost:5000${profile.profileUrl}`} 
                alt="Profile" 
                className="w-full h-full object-cover"
                onError={(e) => { e.target.style.display = 'none'; }}
              />
            ) : (
              <span>{getInitials(profile?.username)}</span>
            )}
          </div>
          
          <div>
            <h2 className="font-semibold text-gray-800 dark:text-white text-sm">
              {profile?.username || 'User'}
            </h2>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              {profile?.email || ''}
            </p>
          </div>
        </div>

        {/* Menu principal */}
        <nav className="mt-6 px-3">
          <ul className="space-y-2">
            <li>
              <button
                onClick={() => navigate('/dashboard')}
                className="flex items-center gap-3 p-3 text-gray-800 dark:text-white hover:bg-cyan-100 dark:hover:bg-cyan-700/30 rounded-xl transition-all duration-300 w-full text-left"
              >
                <Home className="w-5 h-5 text-cyan-500" />
                Dashboard
              </button>
            </li>
            <li>
              <button
                onClick={() => navigate('/expense')}
                className="flex items-center gap-3 p-3 text-gray-700 dark:text-gray-300 hover:bg-cyan-100 dark:hover:bg-cyan-700/30 rounded-xl transition-all duration-300 w-full text-left"
              >
                <Wallet className="w-5 h-5 text-cyan-400" />
                Expenses
              </button>
            </li>
            <li>
              <button
                onClick={() => navigate('/incomes')}
                className="flex items-center gap-3 p-3 text-gray-700 dark:text-gray-300 hover:bg-cyan-100 dark:hover:bg-cyan-700/30 rounded-xl transition-all duration-300 w-full text-left"
              >
                <Briefcase className="w-5 h-5 text-cyan-400" />
                Incomes
              </button>
            </li> 
            <li>
              <button
                onClick={() => navigate('/category')}
                className="flex items-center gap-3 p-3 text-gray-700 dark:text-gray-300 hover:bg-cyan-100 dark:hover:bg-cyan-700/30 rounded-xl transition-all duration-300 w-full text-left"
              >
                <MdCategory className="w-5 h-5 text-cyan-400" />
                Category
              </button>
            </li>
          </ul>
        </nav>
      </div>

      <div className="p-4 border-t border-gray-200 dark:border-gray-700">
        <ul className="space-y-2">
          <li>
            <button  
              onClick={() => navigate('/profile')}
              className="flex items-center gap-3 text-gray-700 dark:text-gray-300 hover:bg-cyan-100 dark:hover:bg-cyan-700/30 p-3 rounded-xl transition-all duration-300 w-full text-left"
            >
              <User className="w-5 h-5 text-cyan-400" />
              Profile
            </button>
          </li>
          <li>
            <button 
              onClick={() => navigate('/settings')}
              className="flex items-center gap-3 text-gray-700 dark:text-gray-300 hover:bg-cyan-100 dark:hover:bg-cyan-700/30 p-3 rounded-xl transition-all duration-300 w-full text-left"
            >
              <Settings className="w-5 h-5 text-cyan-400" />
              Settings
            </button>
          </li>
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;
