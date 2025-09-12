 import React from "react";
import jsPDF from "jspdf";
import "jspdf-autotable";

export default function ExpenseList({ expenses, onEdit, onDelete }) {

  // Récupère le nom de la catégorie depuis la relation Prisma
  const getCategoryName = (expense) => expense.Categories?.name || "Unknown Category";

  // Formate la date
  const formatDate = (dateString) => {
    if (!dateString) return "-";
    return new Date(dateString).toLocaleDateString();
  };

  // Génération du PDF pour une dépense individuelle
  const handleDownload = (expense) => {
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text("Expense Ticket", 14, 20);

    // Création du tableau avec les colonnes et les données de cette dépense
    const tableColumn = ["Field", "Value"];
    const tableRows = [
      ["Amount", `$${parseFloat(expense.amount).toFixed(2)}`],
      ["Description", expense.description || "-"],
      ["Type", expense.type],
      ["Category", getCategoryName(expense)],
      ["Date", formatDate(expense.date || expense.startDate)],
      ["Receipt", expense.receipt || "-"]
    ];

    doc.autoTable({
      head: [tableColumn],
      body: tableRows,
      startY: 30,
      theme: "grid",
      headStyles: { fillColor: [139, 92, 246] },
      styles: { fontSize: 12 }
    });

    doc.save(`Expense_${expense.id}.pdf`);
  };

  if (!expenses || expenses.length === 0) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md text-center">
        <p className="text-gray-500">
          No expenses yet. Add your first expense to get started!
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-800">Expense History</h3>
        <p className="text-sm text-gray-600">
          {expenses.length} expense{expenses.length !== 1 ? "s" : ""} found
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              <th className="py-3 px-4 text-left text-sm font-medium text-gray-700">Amount</th>
              <th className="py-3 px-4 text-left text-sm font-medium text-gray-700">Description</th>
              <th className="py-3 px-4 text-left text-sm font-medium text-gray-700">Type</th>
              <th className="py-3 px-4 text-left text-sm font-medium text-gray-700">Category</th>
              <th className="py-3 px-4 text-left text-sm font-medium text-gray-700">Date</th>
              <th className="py-3 px-4 text-left text-sm font-medium text-gray-700">Receipt</th>
              <th className="py-3 px-4 text-right text-sm font-medium text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody>
            {expenses.map((expense) => (
              <tr key={expense.id} className="border-b border-gray-100 hover:bg-gray-50">
                <td className="py-3 px-4 text-red-600 font-medium">
                  ${parseFloat(expense.amount).toFixed(2)}
                </td>
                <td className="py-3 px-4 max-w-xs truncate" title={expense.description}>
                  {expense.description || "-"}
                </td>
                <td className="py-3 px-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    expense.type === "one-time"
                      ? "bg-blue-100 text-blue-800"
                      : "bg-purple-100 text-purple-800"
                  }`}>
                    {expense.type}
                  </span>
                </td>
                <td className="py-3 px-4 text-gray-700">{getCategoryName(expense)}</td>
                <td className="py-3 px-4 text-sm text-gray-600">{formatDate(expense.date || expense.startDate)}</td>
                <td className="py-3 px-4">
                  {expense.receipt ? (
                    <a
                      href={`/${expense.receipt}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 text-sm"
                    >
                      View
                    </a>
                  ) : (
                    <span className="text-gray-400 text-sm">-</span>
                  )}
                </td>
                <td className="py-3 px-4 text-right flex justify-end gap-2">
                  <button
                    onClick={() => onEdit(expense)}
                    className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-md text-sm hover:bg-yellow-200 transition-colors"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => onDelete(expense.id)}
                    className="bg-red-100 text-red-700 px-3 py-1 rounded-md text-sm hover:bg-red-200 transition-colors"
                  >
                    Delete
                  </button>
                  <button
                    onClick={() => handleDownload(expense)}
                    className="bg-green-500 text-black px-3 py-1 rounded-md text-sm hover:bg-green-600 transition-colors"
                  >
                    Download
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
