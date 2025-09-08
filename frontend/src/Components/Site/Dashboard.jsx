import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";
import Content from "./Content";
import API from "../../api/axios";

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/signin");
        return;
      }

      try {
         const userData = {
          id: localStorage.getItem("userId"),
          email: localStorage.getItem("userEmail"),
          username: localStorage.getItem("username"),
        };
        
        if (!userData.id || !userData.email) {
           const response = await API.get('/users/me');
          const userInfo = response.data;
          
          localStorage.setItem('userId', userInfo.id);
          localStorage.setItem('userEmail', userInfo.email);
          localStorage.setItem('username', userInfo.username);
          
          setUser(userInfo);
        } else {
          setUser(userData);
        }
        
      } catch (error) {
        console.error('Auth check failed:', error);
        localStorage.clear();
        navigate("/signin");
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [navigate]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen w-full bg-gray-100">
       <Header className="flex-none" />

       <div className="flex flex-1 min-h-0 gap-[15rem]"> 
        <Sidebar className="w-64 h-full" />
        <Content className="flex-1 h-full overflow-auto" />
      </div>
    </div>
  );
};

export default Dashboard;