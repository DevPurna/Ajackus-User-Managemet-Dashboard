import { useEffect, useState } from "react";
import { getUsers, addUser, updateUser, deleteUser } from "../services/api";
import { Sliders } from "lucide-react";
import UserTable from "../components/UserTable";
import UserForm from "../components/UserForm";
import Pagination from "../components/Pagination";
import FilterSearch from "../components/FilterSearch";
import FilterModal from "../components/FilterModal";

export default function Dashboard() {
  const [users, setUsers] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editUser, setEditUser] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage, setUsersPerPage] = useState(10);
  const [searchResults, setSearchResults] = useState([]);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [activeFilters, setActiveFilters] = useState({});

  const dataToShow = searchResults.length > 0 ? searchResults : users;
  const indexOfLast = currentPage * usersPerPage;
  const indexOfFirst = indexOfLast - usersPerPage;
  const currentUsers = dataToShow.slice(indexOfFirst, indexOfLast);

  useEffect(() => {
    fetchUsers(); // Initial fetch
  }, []);

  const handleSort = (key) => {
    // Toggle sort direction
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction }); // Save sort state

    const sorted = [...users].sort((a, b) => {
      if (a[key] < b[key]) return direction === "asc" ? -1 : 1;
      if (a[key] > b[key]) return direction === "asc" ? 1 : -1;
      return 0;
    });
    setUsers(sorted);
  };

  const fetchUsers = async () => {
    // Fetch users from API
    try {
      const res = await getUsers();
      // Adapt JSONPlaceholder format to match form fields
      const adapted = res.data.map((u) => ({
        id: u.id,
        firstName: u.name.split(" ")[0],
        lastName: u.name.split(" ")[1] || "",
        email: u.email,
        department: u.company?.name || "N/A",
      }));
      setUsers(adapted); // Store users
    } catch (error) {
      alert("Failed to load users");
    }
  };

  const handleSearch = (query) => {
    // Search users
    if (!query) {
      setSearchResults([]);
      return;
    }
    const lower = query.toLowerCase();
    const filtered = users.filter(
      (u) =>
        u.firstName.toLowerCase().includes(lower) ||
        u.lastName.toLowerCase().includes(lower) ||
        u.email.toLowerCase().includes(lower) ||
        u.department.toLowerCase().includes(lower)
    );
    setSearchResults(filtered);
    setCurrentPage(1);
  };

  const handleAdd = async (userData) => {
    // Add new user
    try {
      const res = await addUser(userData);
      setUsers([
        ...users,
        { ...userData, id: res.data.id || users.length + 1 },
      ]);
      setShowForm(false);
    } catch (error) {
      console.error("Add user failed:", error);
      alert("Failed to add user. Please try again.");
    }
  };

  const handleEdit = async (userData) => {
    // Edit existing user
    try {
      await updateUser(editUser.id, userData);
      setUsers(
        users.map((u) => (u.id === editUser.id ? { ...u, ...userData } : u))
      );
      setEditUser(null);
      setShowForm(false);
    } catch (error) {
      console.error("Update user failed:", error);
      alert("Failed to update user. Please try again.");
    }
  };

  const handleDelete = async (id) => {
    // Delete user
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    try {
      await deleteUser(id);
      setUsers(users.filter((u) => u.id !== id));
    } catch (error) {
      console.error("Delete user failed:", error);
      alert("Failed to delete user. Please try again.");
    }
  };

  return (
    <div className="p-6 border rounded-lg shadow-md bg-white max-w-[90%] mx-auto my-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">User Management Dashboard</h1>
      </div>
      <div className="flex flex-col sm:flex-row items-center mb-6 gap-4">
        <FilterSearch onSearch={handleSearch} />
        <div className="flex flex-wrap gap-3 mb-4">
          <button
            className="flex items-center gap-2 bg-red-500 text-white hover:bg-red-600 font-medium px-4 py-2 rounded-lg shadow-sm transition-all duration-200"
            onClick={() => setIsFilterOpen(true)}
          >
            <Sliders size={16} /> Filter
          </button>
          <button
            className="flex items-center justify-center bg-green-500 hover:bg-green-600 text-white font-semibold px-5 py-2 rounded-lg shadow-md transition-all duration-200"
            onClick={() => setShowForm(true)}
          >
            Add User
          </button>
        </div>
      </div>
      <UserTable // User table for displaying users
        users={currentUsers}
        onEdit={(user) => {
          setEditUser(user);
          setShowForm(true);
        }}
        onDelete={handleDelete}
        onSort={handleSort}
      />

      {showForm && (
        <UserForm // User form for add/edit
          initialData={editUser}
          onSubmit={editUser ? handleEdit : handleAdd}
          onCancel={() => {
            setShowForm(false);
            setEditUser(null);
          }}
        />
      )}
      <Pagination // Pagination controls
        totalUsers={users.length}
        usersPerPage={usersPerPage}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
        onLimitChange={(limit) => {
          setUsersPerPage(limit);
          setCurrentPage(1);
        }}
      />
      <FilterModal
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
        initialFilters={activeFilters}
        onFilter={(filters) => {
          setActiveFilters(filters);
          // Filter users based on inputs
          const filtered = users.filter(
            (u) =>
              u.firstName
                .toLowerCase()
                .includes(filters.firstName.toLowerCase()) &&
              u.lastName
                .toLowerCase()
                .includes(filters.lastName.toLowerCase()) &&
              u.email.toLowerCase().includes(filters.email.toLowerCase()) &&
              u.department
                .toLowerCase()
                .includes(filters.department.toLowerCase())
          );
          setSearchResults(filtered);
          setCurrentPage(1);
        }}
      />
    </div>
  );
}
