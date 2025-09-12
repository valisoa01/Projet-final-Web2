 import Header from "./Header";
import Sidebar from "./Sidebar";
import ContentIncomes from "./ContentIncomes";

 
const Incomes = () => {
  return (
    <div className="flex flex-col h-screen w-full bg-gray-100">
      <Header className="flex-none" />

      <div className="flex flex-1 min-h-0">
        <div className="w-64 flex-shrink-0">
          <Sidebar />
        </div>

        <div className="flex-1 h-full overflow-auto p-2">
          <ContentIncomes />
        </div>
      </div>
    </div>
  );
};

export default Incomes;
