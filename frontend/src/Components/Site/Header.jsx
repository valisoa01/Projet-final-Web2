 const Header = () => {
    const Name = () => {
        return (
            <div className="w-[20%] bg-blue-300 h-full flex items-center justify-center">
                E Circle Soft
            </div>
        );
    }
    
    const SearchButton = () => {
        return (
            <div className="w-[60%] flex items-center justify-center">
                <div className="relative w-64">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <svg className="w-4 h-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                        </svg>
                    </div>
                    <input 
                        type="search" 
                        className="block w-full p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500" 
                        placeholder="Search..." 
                    />
                </div>
            </div>
        );
    }
    
    const ButtonRight = () => {
        return ( 
            <div className="w-[20%] flex items-center justify-end pr-4">
                <button className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700">
                    Menu
                </button>
            </div>
        );
    }
    
    return (
        <div className="bg-white shadow-md h-[10vh] w-screen flex flex-row">
            <Name/>
            <SearchButton/>
            <ButtonRight/>
        </div>
    )
}

export default Header;