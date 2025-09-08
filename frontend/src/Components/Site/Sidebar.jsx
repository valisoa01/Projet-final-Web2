// Sidebar.jsx (version simplifiée)
import { Home, Wallet, Briefcase, User, Settings } from "lucide-react";
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

const Sidebar = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [profileUrl, setProfileUrl] = useState('');

  useEffect(() => {
    // Récupérez les données utilisateur depuis le localStorage
    const storedUsername = localStorage.getItem('username');
    const storedEmail = localStorage.getItem('userEmail');
    const storedProfileUrl = localStorage.getItem('profileUrl');
    
    if (storedUsername) setUsername(storedUsername);
    if (storedEmail) setUserEmail(storedEmail);
    if (storedProfileUrl) setProfileUrl(storedProfileUrl);
  }, []);

  // Fonction pour générer des initiales si pas de photo
  const getInitials = (name) => {
    if (!name) return 'U';
    return name.charAt(0).toUpperCase();
  };

  return (
    <div>
      <aside className="w-64 h-[90%] bg-white shadow-lg flex flex-col justify-between transition-all duration-300 fixed mt-[11vh]">
        {/* Partie haute */}
        <div>
          {/* Profil utilisateur */}
          <div className="flex items-center gap-3 p-4 border-b border-purple-100">
            <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 font-bold ring-2 ring-purple-200 overflow-hidden">
              {profileUrl ? (
                <img 
                  src={`http://localhost:5000${profileUrl}`} 
                  alt="Profile" 
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    // Fallback aux initiales si l'image ne charge pas
                    e.target.style.display = 'none';
                  }}
                />
              ) : (
                <span>{getInitials(username)}</span>
              )}
            </div>
            
            <div>
              <h2 className="font-semibold text-gray-800 text-sm">{username || 'Utilisateur'}</h2>
              <p className="text-xs text-gray-500">{userEmail || ''}</p>
            </div>
            
            <button className="ml-auto text-purple-500 hover:text-purple-700 transition-colors">
              ⋮
            </button>
          </div>

          {/* Menu principal */}
          <nav className="mt-6 px-2">
            <ul className="space-y-1">
              <li>
                <button
                  onClick={() => navigate('/dashboard')}
                  className="flex items-center gap-3 p-3 text-purple-600 bg-purple-50 rounded-lg font-medium hover:bg-purple-100 transition-colors duration-200 w-full text-left"
                >
                  <Home className="w-5 h-5 text-purple-600" />
                  Dashboard
                </button>
              </li>
              <li>
                <button
                onClick={() => navigate('/expense')}
                  className="flex items-center gap-3 p-3 text-gray-700 hover:bg-purple-50 hover:text-purple-600 rounded-lg transition-colors duration-200 w-full text-left"
                >
                  <Wallet className="w-5 h-5 text-gray-600 group-hover:text-purple-600" />
                  Expenses
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/incomes')}
                  className="flex items-center gap-3 p-3 text-gray-700 hover:bg-purple-50 hover:text-purple-600 rounded-lg transition-colors duration-200 w-full text-left"
                >
                  <Briefcase className="w-5 h-5 text-gray-600 group-hover:text-purple-600" />
                  Incomes
                </button>
              </li>
            </ul>
          </nav>
        </div>

        {/* Partie basse */}
        <div className="p-4 border-t border-purple-100">
          <ul className="space-y-1">
            <li>
              <button  
                onClick={() => navigate('/profile')}
                className="flex items-center gap-3 text-gray-700 hover:bg-purple-50 hover:text-purple-600 p-3 rounded-lg transition-colors duration-200 w-full text-left"
              >
                <User className="w-5 h-5 text-gray-600 group-hover:text-purple-600" />
                Profile
              </button>
            </li>
            <li>
              <button 
                onClick={() => navigate('/settings')}
                className="flex items-center gap-3 text-gray-700 hover:bg-purple-50 hover:text-purple-600 p-3 rounded-lg transition-colors duration-200 w-full text-left"
              >
                <Settings className="w-5 h-5 text-gray-600 group-hover:text-purple-600" />
                Settings
              </button>
            </li>
          </ul>
        </div>
      </aside>
    </div>
  );
};

export default Sidebar;