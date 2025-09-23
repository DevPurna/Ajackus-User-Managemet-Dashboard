export default function Pagination({ totalUsers, usersPerPage, currentPage, onPageChange, onLimitChange }) {
  const totalPages = Math.ceil(totalUsers / usersPerPage);

  return (
    <div className="flex items-center justify-between mt-4">
      {/* Page size selector */}
      <div>
        <label className="mr-2 font-medium">Rows per page:</label>
        <select
          value={usersPerPage}
          onChange={(e) => onLimitChange(Number(e.target.value))}
          className="border rounded px-2 py-1"
        >
          {[10, 25, 50, 100].map((num) => (
            <option key={num} value={num}>
              {num}
            </option>
          ))}
        </select>
      </div>

      {/* Page navigation */}
      <div className="flex gap-2">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-3 py-1 border rounded disabled:opacity-50"
        >
          Prev
        </button>
        <span className="px-2 py-1">
          {currentPage} / {totalPages}
        </span>
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-3 py-1 border rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}
