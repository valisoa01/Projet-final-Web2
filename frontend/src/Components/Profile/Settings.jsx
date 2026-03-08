import { useState, useEffect } from "react";
import API from "../../api/axios"; // Supprimé BASE_URL car non utilisé ici
import Header from "../Site/Header";
import Sidebar from "../Site/Sidebar";
import { Camera } from "lucide-react"; 

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
            <div className="flex-1 bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
              <h2 className="text-2xl font-bold mb-6 text-gray-800">Basic Info</h2>
              {message && <div className="bg-green-100 text-green-700 px-4 py-3 rounded mb-4">{message}</div>}
              {error && <div className="bg-red-100 text-red-700 px-4 py-3 rounded mb-4">{error}</div>}

              <form onSubmit={handleSubmit}>
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="flex-none w-full md:w-1/3 flex flex-col items-center">
                    <div className="relative w-32 h-32 mb-4">
                      {(previewImage || currentProfile) ? (
                        <img
                          src={previewImage || currentProfile} 
                          alt="Profile"
                          className="w-32 h-32 rounded-full object-cover border-2 border-cyan-400"
                        />
                      ) : (
                        <div className="w-32 h-32 rounded-full bg-cyan-100 flex items-center justify-center text-4xl text-cyan-500 border-2 border-cyan-400">
                          {userData.username?.charAt(0).toUpperCase() || 'U'}
                        </div>
                      )}
                      <label htmlFor="profile-upload" className="absolute bottom-0 right-0 bg-cyan-500 w-10 h-10 rounded-full flex items-center justify-center cursor-pointer border-2 border-white">
                        <Camera className="w-5 h-5 text-white"/>
                        <input id="profile-upload" type="file" name="profile" accept="image/*" onChange={handleChange} className="hidden" />
                      </label>
                    </div>
                  </div>
                  <div className="flex-1 flex flex-col gap-4">
                    <input type="text" name="username" value={userData.username} onChange={handleChange} className="w-full border rounded-lg py-2 px-3"/>
                    <input type="email" name="email" value={userData.email} onChange={handleChange} className="w-full border rounded-lg py-2 px-3"/>
                  </div>
                </div>
                <button type="submit" disabled={loading} className="mt-6 px-6 py-2 bg-cyan-500 text-white rounded-lg">{loading ? 'Updating...' : 'Save Changes'}</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;