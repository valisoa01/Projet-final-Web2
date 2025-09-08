import { useEffect, useState } from "react";
import API from "../../api/axios";
import Header from "../Site/Header";
import Sidebar from "../Site/Sidebar";



const Profile = () => {
    const [profile, setProfile] = useState(null);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);

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
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
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

    if (loading) {
        return (
            <div className="container mx-auto mt-8">
                <div className="flex justify-center items-center h-64">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
                </div>
            </div>
        );
    }

    return (  
    <div className="flex flex-col h-screen w-full">

        <Header/>
      <div className="flex flex-1 min-h-0"> 
        <Sidebar/>
         <div className="container mx-auto mt-8 p-4 max-w-2xl">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">User Profile</h2>
          
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}
          
          {profile && (
            <div className=" rounded-lg shadow-lg p-6 mt-[10vh] bg-purple-400">
              <div className="flex flex-col items-center text-center mb-6 gap-[2rem] mt-[5v] p-[35px] rounded-lg bg-purple-500">
                {profile.profileUrl ? (
                  <img 
                    src={`http://localhost:5000${profile.profileUrl}`} 
                    alt="Profile" 
                    className=" w-[14rem] h-[14rem] ml-[20px] rounded-full object-cover border-2 border-purple-900 p-[5px]"
                  />
                ) : (
                  <div className="w-24 h-24 rounded-full bg-purple-100 flex items-center justify-center text-4xl text-purple-500">
                    {profile.username?.charAt(0).toUpperCase() || 'U'}
                  </div>
                )}
                <div className="ml-6">
                  <h3 className="text-xl font-semibold text-gray-800 text-[28px]">{profile.username}</h3>
                  <p className="text-gray-200">{profile.email}</p>
                </div>
              </div>
              
              <div className=" gap-4 ml-[8vw] w-[15vw]">
                <div className="bg-purple-500 p-4 rounded-lg">
                  <h4 className="font-medium text-white mb-2">Account Information</h4>
                   <p className="text-white font-bold"><strong>Email :</strong> <strong className="text-gray-800">{profile.email} </strong></p>
                  <p className="text-white font-bold"><strong>Username : </strong> <strong className="text-gray-800">{profile.username}</strong></p>
                </div>
                
              </div>
            </div>
          )}
        </div>
          
        </div>
      
        </div>
    );
}
 
export default Profile;