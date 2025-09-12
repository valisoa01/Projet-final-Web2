import React, { useState } from "react";
import jsPDF from "jspdf";
import "jspdf-autotable";

export default function ExpenseList({ expenses, categories, onEdit, onDelete }) {
  const [confirmId, setConfirmId] = useState(null); // expense en attente de confirmation

  const getCategoryName = (categoryId) => {
    const category = categories.find(cat => cat.id === categoryId);
    return category ? category.name : "Unknown Category";
  };

  const formatDate = (dateString) => {
    if (!dateString) return "-";
    return new Date(dateString).toLocaleDateString();
  };

  const handleDeleteClick = (id) => setConfirmId(id);
  const cancelDelete = () => setConfirmId(null);
  const confirmDelete = (id) => {
    onDelete(id);
    setConfirmId(null);
  };

  const handleDownload = (expense) => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text("Expense Ticket", 14, 22);
    doc.setFontSize(12);
    doc.text(`Amount: $${parseFloat(expense.amount).toFixed(2)}`, 14, 32);
    doc.text(`Description: ${expense.description || "-"}`, 14, 40);
    doc.text(`Type: ${expense.type}`, 14, 48);
    doc.text(`Category: ${getCategoryName(expense.CategoryId)}`, 14, 56);
    doc.text(`Date: ${formatDate(expense.date || expense.startDate)}`, 14, 64);
    doc.text(`Receipt: ${expense.receipt || "-"}`, 14, 72);
    doc.save(`Expense_${expense.id}.pdf`);
  };

  if (!expenses || expenses.length === 0) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md text-center">
        <p className="text-gray-500">No expenses yet. Add your first expense to get started!</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-800">Expense History</h3>
        <p className="text-sm text-gray-600">{expenses.length} expense{expenses.length !== 1 ? 's' : ''} found</p>
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
              <React.Fragment key={expense.id}>
                <tr className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4 text-red-600 font-medium">${parseFloat(expense.amount).toFixed(2)}</td>
                  <td className="py-3 px-4 max-w-xs truncate" title={expense.description}>{expense.description || "-"}</td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      expense.type === 'one-time' 
                        ? 'bg-blue-100 text-blue-800' 
                        : 'bg-purple-100 text-purple-800'
                    }`}>{expense.type}</span>
                  </td>
                  <td className="py-3 px-4 text-gray-700">{getCategoryName(expense.CategoryId)}</td>
                  <td className="py-3 px-4 text-sm text-gray-600">{formatDate(expense.date || expense.startDate)}</td>
                  <td className="py-3 px-4">
                    {expense.receipt ? (
                      <a href={`/${expense.receipt}`} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 text-sm">
                        View
                      </a>
                    ) : <span className="text-gray-400 text-sm">-</span>}
                  </td>
                  <td className="py-3 px-4 text-right flex justify-end gap-2">
                    <button onClick={() => onEdit(expense)} className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-md text-sm hover:bg-yellow-200 transition-colors">Edit</button>
                    <button onClick={() => handleDeleteClick(expense.id)} className="bg-red-100 text-red-700 px-3 py-1 rounded-md text-sm hover:bg-red-200 transition-colors">Delete</button>
                    <button onClick={() => handleDownload(expense)} className="bg-green-500 text-black px-3 py-1 rounded-md text-sm hover:bg-green-600 transition-colors">Download</button>
                  </td>
                </tr>

                {/* Mini modal inline pour confirmation de suppression */}
                {confirmId === expense.id && (
                  <tr className="bg-red-50 border-b border-red-200">
                    <td colSpan={7} className="py-3 px-4 text-center">
                      <div className="inline-flex items-center justify-center space-x-3 bg-white border border-red-200 rounded-md px-4 py-2 shadow-md">
                        <span className="text-red-700 font-medium">Do you really want to delete this expense?</span>
                        <button onClick={() => confirmDelete(expense.id)} className="bg-red-600 text-white px-3 py-1 rounded-md hover:bg-red-700 transition-colors">Delete</button>
                        <button onClick={cancelDelete} className="bg-gray-300 text-gray-700 px-3 py-1 rounded-md hover:bg-gray-400 transition-colors">Cancel</button>
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
