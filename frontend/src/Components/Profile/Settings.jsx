import { useState, useEffect } from "react";
import API from "../../api/axios";
import Header from "../Site/Header";
import Sidebar from "../Site/Sidebar";
import { Camera } from "lucide-react"; // <-- icône caméra

const Settings = () => {
  const [userData, setUserData] = useState({
    username: '',
    email: '',
    profile: null,
    password: '',
    confirmPassword: '',
  });
  const [currentProfile, setCurrentProfile] = useState('');
  const [previewImage, setPreviewImage] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const fetchUserProfile = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await API.get('/users/me', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setUserData(prev => ({
        ...prev,
        username: res.data.username || '',
        email: res.data.email || ''
      }));
      setCurrentProfile(res.data.profileUrl || '');
    } catch (err) {
      console.error('Error fetching profile:', err);
      setError('Failed to load profile data');
    }
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'profile') {
      const file = files[0];
      setUserData(prev => ({ ...prev, profile: file }));
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => setPreviewImage(e.target.result);
        reader.readAsDataURL(file);
      } else setPreviewImage('');
    } else {
      setUserData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); 
    setMessage(''); 
    setError('');

    if (userData.password && userData.password !== userData.confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const formData = new FormData();
      formData.append('username', userData.username);
      formData.append('email', userData.email);
      if (userData.profile) formData.append('profile', userData.profile);
      if (userData.password) formData.append('password', userData.password);

      const res = await API.put('/users/me', formData, {
        headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'multipart/form-data' }
      });

      setMessage('Profile updated successfully!');
      setCurrentProfile(res.data.profileUrl || '');
      setPreviewImage('');
      setUserData(prev => ({ ...prev, password: '', confirmPassword: '', profile: null }));
      if (res.data.email) localStorage.setItem('userEmail', res.data.email);
    } catch (err) {
      console.error('Update error:', err);
      setError(err.response?.data?.message || 'Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setPreviewImage('');
    setUserData(prev => ({ ...prev, profile: null, password: '', confirmPassword: '' }));
  };

  return (
    <div className="flex flex-col h-screen w-full bg-gray-50 dark:bg-gray-900">
      <Header />
      <div className="flex flex-1 min-h-0">
        <Sidebar />
        <div className="flex-1 flex justify-center items-start p-6 overflow-auto mt-20 md:ml-64">
          <div className="w-full max-w-6xl flex flex-col md:flex-row gap-6">

            {/* Partie gauche : Formulaire */}
            <div className="flex-1 bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
              <h2 className="text-2xl font-bold mb-6 text-gray-800">Basic Info</h2>

              {message && <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">{message}</div>}
              {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">{error}</div>}

              <form onSubmit={handleSubmit}>
                <div className="flex flex-col md:flex-row gap-6">
                  {/* Photo de profil avec icône caméra */}
                  <div className="flex-none w-full md:w-1/3 flex flex-col items-center">
                    <div className="relative w-32 h-32 mb-4">
                      {(previewImage || currentProfile) ? (
                        <img
                          src={previewImage || `http://localhost:5000${currentProfile}`}
                          alt="Profile"
                          className="w-32 h-32 rounded-full object-cover border-2 border-cyan-400"
                        />
                      ) : (
                        <div className="w-32 h-32 rounded-full bg-cyan-100 flex items-center justify-center text-4xl text-cyan-500 border-2 border-cyan-400">
                          {userData.username?.charAt(0).toUpperCase() || 'U'}
                        </div>
                      )}
                      {/* Icône caméra */}
                      <label htmlFor="profile-upload" className="absolute bottom-0 right-0 bg-cyan-500 w-10 h-10 rounded-full flex items-center justify-center cursor-pointer border-2 border-white hover:bg-cyan-600">
                        <Camera className="w-5 h-5 text-white"/>
                        <input
                          id="profile-upload"
                          type="file"
                          name="profile"
                          accept="image/*"
                          onChange={handleChange}
                          className="hidden"
                        />
                      </label>
                    </div>
                    {previewImage && <button type="button" onClick={handleCancel} className="mt-2 text-sm text-red-600 hover:text-red-800">Cancel</button>}
                  </div>

                  {/* Infos utilisateur */}
                  <div className="flex-1 flex flex-col gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Username</label>
                      <input type="text" name="username" value={userData.username} onChange={handleChange} className="w-full border border-gray-300 rounded-lg py-2 px-3 focus:ring-2 focus:ring-cyan-500 focus:border-transparent"/>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                      <input type="email" name="email" value={userData.email} onChange={handleChange} className="w-full border border-gray-300 rounded-lg py-2 px-3 focus:ring-2 focus:ring-cyan-500 focus:border-transparent"/>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number (Optional)</label>
                      <input type="text" name="phone" placeholder="+261 ..." className="w-full border border-gray-300 rounded-lg py-2 px-3 focus:ring-2 focus:ring-cyan-500 focus:border-transparent"/>
                    </div>
                  </div>
                </div>

                {/* Account Info */}
                <div className="mt-8">
                  <h3 className="text-xl font-semibold mb-4 text-gray-800">Account Info</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input type="password" name="password" placeholder="New password" value={userData.password} onChange={handleChange} className="w-full border border-gray-300 rounded-lg py-2 px-3 focus:ring-2 focus:ring-cyan-500 focus:border-transparent"/>
                    <input type="password" name="confirmPassword" placeholder="Confirm new password" value={userData.confirmPassword} onChange={handleChange} className="w-full border border-gray-300 rounded-lg py-2 px-3 focus:ring-2 focus:ring-cyan-500 focus:border-transparent"/>
                  </div>
                </div>

                <div className="flex justify-end gap-3 mt-6">
                  <button type="button" onClick={handleCancel} className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">Cancel</button>
                  <button type="submit" disabled={loading} className={`px-6 py-2 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600 transition-colors ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}>
                    {loading ? 'Updating...' : 'Save Changes'}
                  </button>
                </div>
              </form>
            </div>

            {/* Partie droite : Guide */}
            <div className="w-full md:w-1/3 bg-cyan-50 dark:bg-gray-700 rounded-xl p-6 flex flex-col items-center justify-center text-center shadow-md">
              <div className="w-20 h-20 bg-cyan-200 rounded-full mb-4 flex items-center justify-center text-cyan-500 text-3xl">
                📱
              </div>
              <h4 className="text-lg font-semibold mb-2 text-gray-800">Guide to setup your account</h4>
              <p className="text-sm text-gray-600 dark:text-gray-300">Follow these simple steps to complete your profile and secure your account.</p>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
