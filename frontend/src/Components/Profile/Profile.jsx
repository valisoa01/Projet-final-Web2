import { useEffect, useState } from "react";
import API from "../../api/axios";
import Header from "../Site/Header";
import Sidebar from "../Site/Sidebar";
import { Mail, User, CheckCircle, Edit3, LogOut } from "lucide-react";

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          setError('No authentication token found');
          setLoading(false);
          return;
        }
        const res = await API.get('/users/me', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setProfile(res.data); 
      } catch (err) {
        console.error('Profile fetch error:', err);
        setError('Failed to fetch profile');
        if (err.response?.status === 401) {
          localStorage.removeItem('token');
          localStorage.removeItem('userId');
        }
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const handleLogout = async () => {
    try {
      await API.post('/auth/logout');
    } catch (err) {
      console.error("Error during logout:", err);
    } finally {
      localStorage.clear();
      window.location.href = "/signin";
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-cyan-500"></div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen w-full bg-gray-50 dark:bg-gray-900">
      <Header />
      <div className="flex flex-1 min-h-0">
        <Sidebar />

        {/* Profile Section */}
        <div className="flex-1 flex justify-start items-center p-6 overflow-auto ml-[15vw]">
          {error && (
            <div className="bg-red-50 dark:bg-red-900 border border-red-200 dark:border-red-700 text-red-700 dark:text-red-400 rounded-lg p-4 mb-4 w-full max-w-5xl">
              {error}
            </div>
          )}

          {profile && (
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg w-full max-w-5xl flex hover:shadow-2xl transition-shadow duration-300 ml-20">
              
              {/* Profile Picture */}
              <div className="flex-none w-1/3 p-6 flex flex-col items-center justify-center bg-cyan-50 dark:bg-cyan-900 rounded-l-xl gap-4">
                {profile.profileUrl ? (
                  <img
                    src={`http://localhost:5000${profile.profileUrl}`}
                    alt="Profile"
                    className="w-48 h-48 rounded-full border-4 border-cyan-400 object-cover"
                  />
                ) : (
                  <div className="w-48 h-48 rounded-full bg-cyan-100 flex items-center justify-center text-6xl text-cyan-500 border-4 border-cyan-400">
                    {profile.username?.charAt(0).toUpperCase() || 'U'}
                  </div>
                )}
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500"/>
                  <span className="text-green-600 font-semibold">Online</span>
                </div>
              </div>

              {/* User Info */}
              <div className="flex-1 p-6 flex flex-col justify-center gap-6">
                <h2 className="text-3xl font-bold text-gray-800 dark:text-white">{profile.username}</h2>
                <p className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                  <Mail className="w-5 h-5 text-cyan-500" /> {profile.email}
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <div className="bg-cyan-50 dark:bg-cyan-900 rounded-lg p-4 shadow flex items-center gap-2">
                    <User className="w-5 h-5 text-cyan-600 dark:text-cyan-300"/>
                    <div>
                      <p className="text-gray-700 dark:text-white font-semibold">Username</p>
                      <p className="text-gray-800 dark:text-gray-200 font-medium">{profile.username}</p>
                    </div>
                  </div>

                  <div className="bg-cyan-50 dark:bg-cyan-900 rounded-lg p-4 shadow flex items-center gap-2">
                    <Mail className="w-5 h-5 text-cyan-600 dark:text-cyan-300"/>
                    <div>
                      <p className="text-gray-700 dark:text-white font-semibold">Email</p>
                      <p className="text-gray-800 dark:text-gray-200 font-medium">{profile.email}</p>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-4 mt-4">
                  <button 
                    onClick={() => window.location.href='/settings'}
                    className="flex items-center gap-2 bg-cyan-500 hover:bg-cyan-600 text-white px-4 py-2 rounded-lg transition-all"
                  >
                    <Edit3 className="w-5 h-5"/> Edit Profile
                  </button>
                  <button 
                    onClick={() => setShowLogoutConfirm(true)} 
                    className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-all"
                  >
                    <LogOut className="w-5 h-5"/> Logout
                  </button>
                </div>

                <div className="mt-6 p-4 bg-gray-100 dark:bg-gray-700 rounded-lg shadow-inner text-gray-600 dark:text-gray-300 text-center">
                  Manage your account settings and personal information.
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 🔹 Logout Confirmation Modal */}
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
                className="px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white"
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

export default Profile;