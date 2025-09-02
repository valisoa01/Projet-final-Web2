import { Home, Wallet, Briefcase, User, Settings } from "lucide-react";

const Sidebar = () => {
  return (
    <div>
      <aside className="w-64 h-full bg-white shadow-lg flex flex-col justify-between transition-all duration-300">
        {/* Partie haute */}
        <div>
          {/* Profil utilisateur */}
          <div className="flex items-center gap-3 p-4 border-b border-purple-100">
            <img
              src="https://i.pravatar.cc/40"
              alt="User"
              className="w-10 h-10 rounded-full ring-2 ring-purple-200"
            />
            <div>
              <h2 className="font-semibold text-gray-800 text-lg">Gavano</h2>
            </div>
            <button className="ml-auto text-purple-500 hover:text-purple-700 transition-colors">
              ⋮
            </button>
          </div>

          {/* Menu principal */}
          <nav className="mt-6 px-2">
            <ul className="space-y-1">
              <li>
                <a
                  href="#"
                  className="flex items-center gap-3 p-3 text-purple-600 bg-purple-50 rounded-lg font-medium hover:bg-purple-100 transition-colors duration-200"
                >
                  <Home className="w-5 h-5 text-purple-600" />
                  Dashboard
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="flex items-center gap-3 p-3 text-gray-700 hover:bg-purple-50 hover:text-purple-600 rounded-lg transition-colors duration-200"
                >
                  <Wallet className="w-5 h-5 text-gray-600 group-hover:text-purple-600" />
                  Expenses
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="flex items-center gap-3 p-3 text-gray-700 hover:bg-purple-50 hover:text-purple-600 rounded-lg transition-colors duration-200"
                >
                  <Briefcase className="w-5 h-5 text-gray-600 group-hover:text-purple-600" />
                  Incomes
                </a>
              </li>
            </ul>
          </nav>
        </div>

        {/* Partie basse */}
        <div className="p-4 border-t border-purple-100">
          <ul className="space-y-1">
            <li>
              <a
                href="#"
                className="flex items-center gap-3 text-gray-700 hover:bg-purple-50 hover:text-purple-600 p-3 rounded-lg transition-colors duration-200"
              >
                <User className="w-5 h-5 text-gray-600 group-hover:text-purple-600" />
                Profile
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center gap-3 text-gray-700 hover:bg-purple-50 hover:text-purple-600 p-3 rounded-lg transition-colors duration-200"
              >
                <Settings className="w-5 h-5 text-gray-600 group-hover:text-purple-600" />
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