 import Header from "./Header";
import Sidebar from "./Sidebar";

const Dashboard = () => {
  return (
    <div className="flex w-full h-screen flex-col">
    <Header className="flex-none" />   {/* prend juste la hauteur nécessaire */}
    <Sidebar className="flex-1 bg-amber-500" /> {/* prend tout l'espace restant */}
</div>

  )
};

export default Dashboard;
