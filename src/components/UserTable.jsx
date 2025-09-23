import { ArrowUpDown } from "lucide-react";

export default function UserTable({
  users,
  onEdit,
  onDelete,
  onSort,
  sortConfig,
}) {
  return (
    <table className="w-full border-collapse border border-gray-200 shadow-md rounded-lg overflow-hidden">
      <thead className="bg-gray-100 text-gray-700">
        <tr className="bg-gray-100">
          <th
            className="px-4 py-3 text-left font-semibold cursor-pointer"
            onClick={() => onSort("id")}
          >
            ID <ArrowUpDown size={14} className="inline mb-1" />
          </th>
          <th
            className="px-4 py-3 text-left font-semibold cursor-pointer"
            onClick={() => onSort("firstName")}
          >
            First Name <ArrowUpDown size={14} className="inline mb-1" />
          </th>
          <th
            className="px-4 py-3 text-left font-semibold cursor-pointer"
            onClick={() => onSort("lastName")}
          >
            Last Name <ArrowUpDown size={14} className="inline mb-1" />
          </th>
          <th
            className="px-4 py-3 text-left font-semibold cursor-pointer"
            onClick={() => onSort("email")}
          >
            Email <ArrowUpDown size={14} className="inline mb-1" />
          </th>
          <th
            className="px-4 py-3 text-left font-semibold cursor-pointer"
            onClick={() => onSort("department")}
          >
            Department <ArrowUpDown size={14} className="inline mb-1" />
          </th>
          <th className="border px-4 py-2 text-left font-semibold">Actions</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-200">
        {users.map((user) => (
          <tr key={user.id} className="hover:bg-gray-100">
            <td className="border px-4 py-2">{user.id}</td>
            <td className="border px-4 py-2">{user.firstName}</td>
            <td className="border px-4 py-2">{user.lastName}</td>
            <td className="border px-4 py-2">{user.email}</td>
            <td className="border px-4 py-2">{user.department}</td>
            <td className="border px-4 py-2 space-x-2">
              <button
                onClick={() => onEdit(user)}
                className="px-3 py-1 bg-blue-500 text-white rounded-lg hover:bg-blue-600 text-sm"
              >
                Edit
              </button>
              <button
                onClick={() => onDelete(user.id)}
                className="px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600 text-sm"
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
