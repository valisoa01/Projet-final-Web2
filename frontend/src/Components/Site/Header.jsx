 import { LogOut, Bell, Moon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import API from '../../api/axios';
import Logo from '../../assets/favicon.png'; 

const Header = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [balanceRemaining, setBalanceRemaining] = useState(0);

  // Récupération du nom d'utilisateur
  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) setUsername(storedUsername);
  }, []);

  // Déconnexion
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

  // Récupération du solde dynamique
  const handleNotificationClick = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return;
      const res = await API.get('/dashboard/stats', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setBalanceRemaining(Number(res.data.remainingBalance || 0));
      setShowNotification(!showNotification); // toggle affichage
    } catch (err) {
      console.error('Error fetching balance:', err);
      setBalanceRemaining(0);
      setShowNotification(!showNotification);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-900 shadow-md h-[10vh] w-full flex items-center fixed z-50">
      {/* Logo & Title */}
      <div className="w-[20%] flex items-center pl-6">
        <div className="w-12 h-12 relative mr-2">
          <div className="absolute w-4 h-4 bg-cyan-300 rounded-full top-1 left-1 animate-ping"></div>
          <div className="absolute w-2 h-2 bg-cyan-400 rounded-full bottom-1 right-1 animate-pulse"></div>
          <img src={Logo} alt="App Logo" className="w-full h-full object-contain relative z-10 rounded-full" />
        </div>
        <span className="text-xl font-semibold text-gray-800 dark:text-white">
          Plan <span className="text-cyan-500">Tracker</span>
        </span>
      </div>

      {/* Actions */}
      <div className="w-[80%] flex items-center justify-end pr-6 gap-4">
        {/* Notification */}
        <div className="relative">
          <button
            onClick={handleNotificationClick}
            className="w-10 h-10 flex items-center justify-center border border-cyan-400 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            <Bell className="w-5 h-5 text-cyan-500" />
            <span className="absolute top-1 right-1 block w-2 h-2 rounded-full bg-red-500"></span>
          </button>

          {/* Notification Message */}
          {showNotification && (
            <div className="absolute top-full right-0 mt-2 w-64 bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 border border-gray-200 dark:border-gray-700">
              <h2 className="text-md font-semibold text-gray-800 dark:text-white mb-2">
                Notifications
              </h2>
              <p className="text-gray-700 dark:text-gray-300">
                You have remaining:{" "}
                <span className={balanceRemaining >= 0 ? "text-green-600 font-bold" : "text-red-600 font-bold"}>
                  {balanceRemaining.toFixed(2)} Ar
                </span>
              </p>
              <div className="flex justify-end mt-2">
                <button
                  onClick={() => setShowNotification(false)}
                  className="px-3 py-1 rounded-lg bg-cyan-600 hover:bg-cyan-700 text-white text-sm"
                >
                  Close
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Logout */}
        <div className="relative">
          <button
            onClick={() => setShowLogoutConfirm(true)}
            className="w-10 h-10 flex items-center justify-center border border-cyan-400 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            <LogOut className="w-5 h-5 text-cyan-500" />
          </button>
        </div>

        {/* Dark mode */}
        <div className="relative">
          <button className="w-10 h-10 flex items-center justify-center border border-cyan-400 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800">
            <Moon className="w-5 h-5 text-cyan-500" />
          </button>
        </div>
      </div>

      {/* Logout Confirm Modal */}
      {showLogoutConfirm && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 w-80">
            <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
              Are you sure you want to log out?
            </h2>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowLogoutConfirm(false)}
                className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 text-gray-800 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-white"
              >
                No
              </button>
              <button
                onClick={handleLogout}
                className="px-4 py-2 rounded-lg bg-cyan-600 hover:bg-cyan-700 text-white"
              >
                Yes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;
