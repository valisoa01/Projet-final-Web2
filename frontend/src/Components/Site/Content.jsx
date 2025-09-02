const Content = () => {
  return (
    <div className="p-8 bg-white text-gray-800 w-500">
      <div className="bg-red-500 rounded-lg shadow-lg mb-8 hidden" id="alert">
        <div className="text-xl font-bold text-white">You've exceeded your monthly budget by $111.47.</div>
      </div>
      <div className="bg-purple-100 p-6 rounded-lg shadow-lg mb-8">
        <div className="text-2xl font-semibold mb-4 text-purple-700">Filtres tes Dépenses</div>
        <div className="flex flex-col md:flex-row gap-6">
          <input
            type="month"
            defaultValue={new Date().toISOString().slice(0, 7)}
            className="p-4 rounded-lg bg-white text-purple-700 text-lg w-full md:w-1/3"
          />
          <select className="p-4 rounded-lg bg-white text-purple-700 text-lg w-full md:w-1/3">
            <option value="">All Categories</option>
            <option value="Food">Food</option>
            <option value="Travel">Travel</option>
          </select>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-purple-50 p-6 rounded-lg shadow-lg text-center">
          <div className="text-xl font-semibold text-purple-700">Total Income</div>
          <div className="text-3xl mt-2 text-purple-600" id="totalIncome">$5000.00</div>
        </div>
        <div className="bg-purple-50 p-6 rounded-lg shadow-lg text-center">
          <div className="text-xl font-semibold text-purple-700">Total Expenses</div>
          <div className="text-3xl mt-2 text-purple-600" id="totalExpenses">$3000.00</div>
        </div>
        <div className="bg-purple-50 p-6 rounded-lg shadow-lg text-center">
          <div className="text-xl font-semibold text-purple-700">Remaining Balance</div>
          <div className="text-3xl mt-2 text-green-600" id="remainingBalance">$2000.00</div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-purple-100 p-6 rounded-lg shadow-lg">
          <div className="text-2xl font-semibold  text-purple-700">Expense by Category</div>
          <div className="h-90">
            <div className="flex justify-center items-center h-full">
              <div className="text-center">
                <div className="w-48 h-48 bg-purple-300 rounded-full mb-4" id="pieChart"></div>
                <div className="text-lg text-purple-700" id="catFood">Food: $1000</div>
                <div className="text-lg text-purple-700" id="catTravel">Travel: $1500</div>
                <div className="text-lg text-purple-700" id="catOther">Other: $500</div>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-purple-100 p-6 rounded-lg shadow-lg">
          <div className="text-2xl font-semibold mb-6 text-purple-700">Monthly Spending Over Time</div>
          <div className="h-96">
            <div className="flex flex-col justify-between h-full">
              <div className="text-lg text-purple-700" id="monthAug">Aug 2025: $2500</div>
              <div className="h-24 bg-purple-300 rounded-lg mt-2" id="barAug"></div>
              <div className="text-lg text-purple-700" id="monthSep">Sep 2025: $3000</div>
              <div className="h-32 bg-purple-300 rounded-lg mt-2" id="barSep"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Content;