import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";
import ContentIncomes from "./ContentIncomes";
 

const Incomes = () => {
    return (
     <div className="flex flex-col h-screen w-full bg-gray-100">
      {/* Header fixed on top */}
      <Header className="flex-none" />

      {/* Main area */}
      <div className="flex flex-1 min-h-0">
        {/* Sidebar with fixed width but not fixed position */}
        <div className="w-64 flex-shrink-0">
          <Sidebar />
        </div>

        {/* Content takes remaining space, scrollable */}
        <div className="flex-1 h-full overflow-auto">
          <ContentIncomes />
        </div>
      </div>
    </div>
  );
}
export default Incomes 