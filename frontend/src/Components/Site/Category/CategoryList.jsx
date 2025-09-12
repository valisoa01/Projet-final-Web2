import React from "react";

const CategoryList = ({ categories, onEdit, onDelete }) => {
  return (
    <div className="bg-white shadow-lg rounded-xl p-6 w-full overflow-x-auto">
      <h2 className="text-xl font-semibold text-blue-900 mb-4">Categories List</h2>
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-blue-100 text-blue-900">
            <th className="px-4 py-2">Name</th>
             <th className="px-4 py-2">Created At</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((cat) => (
            <tr key={cat.id} className="border-b border-gray-200 hover:bg-blue-50 transition-all">
              <td className="px-4 py-2">{cat.name}</td>
              <td className="px-4 py-2">{new Date(cat.createdAt).toLocaleDateString()}</td>
              <td className="px-4 py-2 flex gap-2">
                <button onClick={() => onEdit(cat)} className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600 transition-all">Edit</button>
                <button onClick={() => onDelete(cat.id)} className="bg-red-600 text-white px-2 py-1 rounded hover:bg-red-700 transition-all">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CategoryList;
