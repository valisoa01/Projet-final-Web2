import Header from "./Header";
import Sidebar from "./Sidebar";
import ContentIncomes from "./ContentIncomes";
import Content from "./DashoardContent"

const Incomes = () => {
    return (
    <div className="flex flex-col h-screen w-full bg-gray-100">
      {/* Header en haut */}
      <Header className="flex-none" />

      {/* Zone principale : Sidebar à gauche, Content à droite */}
      <div className="flex flex-1 min-h-0 gap-[15rem]"> 
        <Sidebar className="w-64 h-full" />
        <ContentIncomes className="flex-1 h-full overflow-auto" />
      </div>
    </div>
  );
}
export default Incomes 