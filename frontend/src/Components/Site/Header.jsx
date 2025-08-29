 const Header = () => {
  // 🔵 Partie gauche (Logo + Texte)
  const Name = () => {
    return (
      <div className="w-[20%] flex items-center pl-6">
        {/* Logo rond */}
        <div className="w-8 h-8 flex items-center justify-center rounded-full border-2 border-blue-500 text-blue-500 font-bold mr-2">
          C
        </div>
        <span className="text-xl font-semibold text-gray-800">
          Circle <span className="text-black">Soft</span>
        </span>
      </div>
    );
  };

  // 🔍 Barre de recherche
  const SearchButton = () => {
    return (
      <div className="w-[60%] flex items-center ">
        <div className="relative w-64">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg
              className="w-4 h-4 text-gray-500"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
              aria-hidden="true"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
          </div>
          <input
            type="search"
            className="block w-full p-2 pl-10 text-sm border border-blue-400 rounded-md focus:ring-blue-500 focus:border-blue-500"
            placeholder="Search..."
          />
        </div>
      </div>
    );
  };

  // 🔔 Bouton notification
  const NotificationButton = () => {
    return (
      <div className="w-[20%] flex items-center justify-end pr-6 gap-4">
  {/* 🔔 Bouton notification */}
  <div className="relative">
    <button className="w-10 h-10 flex items-center justify-center border border-blue-400 rounded-lg hover:bg-gray-100">
      <span className="text-xl">🔔</span>
    </button>
    {/* Pastille rouge */}
    <span className="absolute top-1 right-1 block w-2 h-2 rounded-full bg-red-500"></span>
  </div>

  {/* 🌙 Bouton dark mode */}
  <div className="relative">
    <button className="w-10 h-10 flex items-center justify-center border border-blue-400 rounded-lg hover:bg-gray-100">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-5 h-5 text-black"
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M17.293 13.293a8 8 0 01-10.586-10.586A8 8 0 1017.293 13.293z" />
      </svg>
    </button>
  </div>
</div>


 
      
    );
  };

  return (
    <div className="bg-white shadow-md h-[10vh] w-screen flex flex-row items-center mb-5">
      <Name />
      <SearchButton />
      <NotificationButton />
    </div>
  );
};

export default Header;
