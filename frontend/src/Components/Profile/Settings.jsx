import { useState, useEffect } from "react";
import API from "../../api/axios";
import Header from "../Site/Header";
import Sidebar from "../Site/Sidebar";

const Settings = () => {
    const [userData, setUserData] = useState({
        username: '',
        email: '',
        profile: null
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
            
            setUserData({
                username: res.data.username || '',
                email: res.data.email || '',
                profile: null
            });
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
            setUserData({
                ...userData,
                profile: file
            });
            
             if (file) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    setPreviewImage(e.target.result);
                };
                reader.readAsDataURL(file);
            } else {
                setPreviewImage('');
            }
        } else {
            setUserData({
                ...userData,
                [name]: value
            });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage('');
        setError('');

        try {
            const token = localStorage.getItem('token');
            const formData = new FormData();
            
            formData.append('username', userData.username);
            formData.append('email', userData.email);
            
            if (userData.profile) {
                formData.append('profile', userData.profile);
            }

            const res = await API.put('/users/me', formData, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data'
                }
            });

            setMessage('Profile updated successfully!');
            setCurrentProfile(res.data.profileUrl || '');
            setPreviewImage('');
            
             if (res.data.email) {
                localStorage.setItem('userEmail', res.data.email);
            }
            
        } catch (err) {
            console.error('Update error:', err);
            if (err.response?.data?.message) {
                setError(err.response.data.message);
            } else {
                setError('Failed to update profile');
            }
        } finally {
            setLoading(false);
        }
    };

    const handleCancel = () => {
        setPreviewImage('');
        setUserData(prev => ({
            ...prev,
            profile: null
        }));
    };

    return (
    <div className="flex flex-col h-screen w-full">
        <Header/>
      <div className="flex flex-1 min-h-0 "> 
            <Sidebar/>
        <div className="container mx-auto w-[86vw] mt-[15vh] p-4 max-w-2xl ">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">Account Settings</h2>
            
            {message && (
                <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
                    {message}
                </div>
            )}
            
            {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                    {error}
                </div>
            )}

            <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6">
                 <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Profile Picture
                    </label>
                    
                    <div className="flex items-center space-x-4">
                        <div className="relative">
                            {(previewImage || currentProfile) ? (
                                <img 
                                    src={previewImage || `http://localhost:5000${currentProfile}`} 
                                    alt="Profile" 
                                    className="w-20 h-20 rounded-full object-cover border-2 border-purple-200"
                                />
                            ) : (
                                <div className="w-20 h-20 rounded-full bg-purple-800 flex items-center justify-center text-2xl text-purple-500">
                                    {userData.username?.charAt(0).toUpperCase() || 'U'}
                                </div>
                            )}
                            
                            <label htmlFor="profile-upload" className="absolute bottom-0 right-0 bg-purple-600 text-white p-1 rounded-full cursor-pointer hover:bg-purple-700">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                </svg>
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
                        
                        <div className="flex-1">
                            <p className="text-sm text-gray-500 mb-2">
                                Upload a new profile picture. JPG, PNG or GIF, max 5MB.
                            </p>
                            {previewImage && (
                                <button
                                    type="button"
                                    onClick={handleCancel}
                                    className="text-sm text-red-600 hover:text-red-800"
                                >
                                    Cancel upload
                                </button>
                            )}
                        </div>
                    </div>
                </div>

                 <div className="mb-4">
                    <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2">
                        Username *
                    </label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        value={userData.username}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded-lg py-2 px-3 outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        required
                    />
                </div>

                 <div className="mb-6">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address *
                    </label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={userData.email}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded-lg py-2 px-3 outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        required
                    />
                </div>

                 <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Change Password (Optional)
                    </label>
                    <div className="space-y-3">
                        <input
                            type="password"
                            placeholder="New password"
                            className="w-full border border-gray-300 rounded-lg py-2 px-3 outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                            required
                        />
                        <input
                            type="password"
                            placeholder="Confirm new password"
                            className="w-full border border-gray-300 rounded-lg py-2 px-3 outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                            required
                        />
                    </div>
                    <p className="text-sm text-gray-500 mt-2">
                        Password change functionality coming soon.
                    </p>
                </div>

                {/* Submit Button */}
                <div className="flex justify-end space-x-3">
                    <button
                        type="button"
                        onClick={() => window.history.back()}
                        className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        disabled={loading}
                        className={`px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors ${
                            loading ? 'opacity-50 cursor-not-allowed' : ''
                        }`}
                    >
                        {loading ? 'Updating...' : 'Save Changes'}
                    </button>
                </div>
            </form>

        </div>
        </div>
        </div>
    );
};

export default Settings;