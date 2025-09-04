 import Header from "./Header";
import Sidebar from "./Sidebar";
import Content from "./Content";

const Dashboard = () => {
  return (
    <div className="flex flex-col h-screen w-full">
      {/* Header en haut */}
      <Header className="flex-none" />

      {/* Zone principale : Sidebar à gauche, Content à droite */}
      <div className="flex flex-1 min-h-0"> 
        <Sidebar className="w-64 h-full" />  {/* Sidebar prend toute la hauteur restante */}
        <Content className="flex-1 h-full overflow-auto" /> {/* Content prend tout le reste et scroll si nécessaire */}
      </div>
    </div>
  );
};

export default Dashboard;
