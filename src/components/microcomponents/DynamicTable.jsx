import React, { useState } from "react";
import { FiFilter, FiX } from "react-icons/fi";

const DynamicTable = ({ columns, data, onCellClick, filters = [] }) => {
  const [search, setSearch] = useState("");
  const [activeFilters, setActiveFilters] = useState({});
  const handleFilterChange = (key, value) => {
    setActiveFilters((prev) => ({ ...prev, [key]: value }));
  };
  const filteredData = data.filter(row => {
    const matchesSearch = Object.values(row).some((val) =>
      val?.toString().toLowerCase().includes(search.toLowerCase())
    );
    const combinedFilter = activeFilters.combinedFilter;
    const matchesCombinedFilter = !combinedFilter
      || Object.entries(row).some(([fieldKey, fieldValue]) =>
        typeof fieldValue === "string" && fieldValue === combinedFilter
      );
    return matchesSearch && matchesCombinedFilter;
  });
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 flex-wrap">
        <div className="flex items-center">
          <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search..." className="border px-2 py-2 rounded text-sm w-48" />
        </div>
        {filters.length > 0 && filters.map(filter => (
          <div key={filter.key} className="flex items-center gap-2">
            <FiFilter className="text-[var(--primary-color)] text-base" />
            {filter.label || "Filter"}:
            <select
              value={activeFilters[filter.key] || ""}
              onChange={(e) => handleFilterChange(filter.key, e.target.value)}
              className="border px-2 py-2 rounded text-sm" >
              <option value="">All</option>
              {filter.options.map((opt) => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
            {activeFilters[filter.key] && (
              <button type="button"
                onClick={() => handleFilterChange(filter.key, "")}
                className="text-red-500 hover:text-red-700"
                title="Clear filter" >
                <FiX className="text-xs" />
              </button>
            )}
          </div>
        ))}
      </div>
      <table className="table-container w-full">
        <thead>
          <tr className="table-head text-left">
            {columns.map((col, i) => (
              <th key={i} className="px-4 py-2 border-b">
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="table-body overflow-visible">
          {filteredData.length === 0 ? (
            <tr>
              <td colSpan={columns.length} className="px-4 py-2 text-center">
                No records found
              </td>
            </tr>
          ) : (
            filteredData.map((row) => (
              <tr key={row.id} className="border-t even:bg-gray-50">
                {columns.map((col, i) => (
                  <td key={i} className={`px-4 py-2 ${col.clickable ? "text-[var(--primary-color)] underline cursor-pointer hover:text-[var(--accent-color)]" : ""
                    }`} onClick={col.clickable ? () => onCellClick?.(row, col) : undefined} >
                    {col.cell
                      ? col.cell(row)
                      : row[col.accessor] || "-"}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default DynamicTable;
