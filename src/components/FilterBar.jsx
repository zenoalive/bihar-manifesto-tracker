import { useState } from "react";

export default function FilterBar({ onFilterChange, categories }) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [progressRange, setProgressRange] = useState("All");

  const handleChange = () => {
    onFilterChange({
      search,
      category,
      progressRange,
    });
  };

  return (
    <div className="mb-4 p-4 bg-white rounded shadow">
      <div className="flex flex-col md:flex-row gap-4">

        {/* Search */}
        <input
          type="text"
          placeholder="Search promises..."
          className="border p-2 rounded w-full"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            handleChange();
          }}
        />

        {/* Category */}
        <select
          className="border p-2 rounded"
          value={category}
          onChange={(e) => {
            setCategory(e.target.value);
            handleChange();
          }}
        >
          <option value="All">All Categories</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>

        {/* Progress */}
        <select
          className="border p-2 rounded"
          value={progressRange}
          onChange={(e) => {
            setProgressRange(e.target.value);
            handleChange();
          }}
        >
          <option value="All">All Progress</option>
          <option value="0-25">0–25%</option>
          <option value="25-50">25–50%</option>
          <option value="50-75">50–75%</option>
          <option value="75-100">75–100%</option>
        </select>
      </div>
    </div>
  );
}
