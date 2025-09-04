import { LogOut, Bell, Moon } from 'lucide-react';

const Header = () => {
  // Logo + Name component
  const Name = () => {
    return (
      <div className="w-[20%] flex items-center pl-6">
        {/* Logo */}
        <div className="w-8 h-8 flex items-center justify-center rounded-full border-2 border-purple-500 text-purple-500 font-bold mr-2">
          T
        </div>
        <span className="text-xl font-semibold text-gray-800">
          Expense <span className="text-black">Tracker</span>
        </span>
      </div>
    );
  };

  // Notification and Logout buttons
  const ActionButtons = () => {
    return (
      <div className="w-[80%] flex items-center justify-end pr-6 gap-4">
        {/* Notification button */}
        <div className="relative">
          <button className="w-10 h-10 flex items-center justify-center border border-purple-400 rounded-lg hover:bg-gray-100">
            <Bell className="w-5 h-5 text-purple-600" />
            {/* Notification badge */}
            <span className="absolute top-1 right-1 block w-2 h-2 rounded-full bg-red-500"></span>
          </button>
        </div>

        {/* Logout button */}
        <div className="relative">
          <button className="w-10 h-10 flex items-center justify-center border border-purple-400 rounded-lg hover:bg-gray-100">
            <LogOut className="w-5 h-5 text-purple-600" />
          </button>
        </div>

        {/* Dark mode button */}
        <div className="relative">
          <button className="w-10 h-10 flex items-center justify-center border border-purple-400 rounded-lg hover:bg-gray-100">
            <Moon className="w-5 h-5 text-purple-600" />
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="bg-white shadow-md h-[10vh] w-screen flex flex-row items-center mb-5">
      <Name />
      <ActionButtons />
    </div>
  );
};

export default Header;