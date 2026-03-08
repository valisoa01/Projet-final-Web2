import { useEffect, useState } from "react";
import API from "../../api/axios"; // Supprimé BASE_URL
import Header from "../Site/Header";
import Sidebar from "../Site/Sidebar";
import { Mail, User, CheckCircle, Edit3, LogOut } from "lucide-react";

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await API.get('/users/me', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setProfile(res.data); 
      } catch (err) {
        setError('Failed to fetch profile');
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="flex flex-col h-screen w-full bg-gray-50">
      <Header />
      <div className="flex flex-1 min-h-0">
        <Sidebar />
        <div className="flex-1 flex justify-start items-center p-6 ml-[15vw]">
          {profile && (
            <div className="bg-white rounded-xl shadow-lg w-full max-w-5xl flex">
              <div className="flex-none w-1/3 p-6 flex flex-col items-center justify-center bg-cyan-50 rounded-l-xl">
                {profile.profileUrl ? (
                  <img
                    src={profile.profileUrl} // CORRIGÉ : URL Cloudinary complète
                    alt="Profile"
                    className="w-48 h-48 rounded-full border-4 border-cyan-400 object-cover"
                  />
                ) : (
                  <div className="w-48 h-48 rounded-full bg-cyan-100 flex items-center justify-center text-6xl text-cyan-500">
                    {profile.username?.charAt(0).toUpperCase()}
                  </div>
                )}
              </div>
              <div className="flex-1 p-6">
                <h2 className="text-3xl font-bold">{profile.username}</h2>
                <p>{profile.email}</p>
                <div className="flex gap-4 mt-4">
                  <button onClick={() => window.location.href='/settings'} className="bg-cyan-500 text-white px-4 py-2 rounded-lg">Edit Profile</button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;