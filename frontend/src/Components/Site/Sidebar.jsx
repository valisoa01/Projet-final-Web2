 import { Home, Wallet, Briefcase, User, Settings, Users } from "lucide-react";

const Sidebar = () => {
  return (
    <div>
        <aside className=" w-64 h-full bg-white shadow-md flex flex-col justify-between">
      {/* Partie haute */}
      <div>
        {/* Profil utilisateur */}
        <div className="flex items-center gap-3 p-4 border-b">
          <img
            src="https://i.pravatar.cc/40"
            alt="User"
            className="w-10 h-10 rounded-full"
          />
          <div>
            <h2 className="font-bold text-gray-800">Gavano</h2>
          </div>
          <button className="ml-auto text-gray-500">⋮</button>
        </div>

        {/* Menu principal */}
        <nav className="mt-6">
          <ul className="space-y-1">
            <li>
              <a
                href="#"
                className="flex items-center gap-3 p-3 text-purple-600 bg-purple-50 rounded-lg font-medium"
              >
                <Home className="w-5 h-5" />
                Dashboard
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center gap-3 p-3 text-gray-700 hover:bg-gray-100 rounded-lg"
              >
                <Wallet className="w-5 h-5" />
                Expenses
              </a>
            </li>
            <li>
              <a
                href="./Incomes.jsx"
                className="flex items-center gap-3 p-3 text-gray-700 hover:bg-gray-100 rounded-lg"
              >
                <Briefcase className="w-5 h-5" />
                Incomes
              </a>
            </li>
           
          </ul>
        </nav>
      </div>

      {/* Partie basse */}
       <div className="p-4 border-t">
    <ul className="space-y-2">
      <li>
        <a
          href="#"
          className="flex items-center gap-3 text-gray-700 hover:bg-gray-100 p-2 rounded-lg"
        >
          <User className="w-5 h-5" />
          Profile
        </a>
      </li>
      <li>
        <a
          href="#"
          className="flex items-center gap-3 text-gray-700 hover:bg-gray-100 p-2 rounded-lg"
        >
          <Settings className="w-5 h-5" />
          Setting
        </a>
      </li>
    </ul>
  </div>
    </aside>
    </div>
    
  );
};

export default Sidebar;
