import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../api";

const CATEGORIES = [
  "Jobs & Employment",
  "Skill Development",
  "Women Empowerment",
  "Social Justice / EBC Support",
  "Agriculture & Rural Development",
  "Infrastructure",
  "Industry & Investment",
  "Youth & Education",
  "Health & Welfare Schemes",
  "Governance & Digital",
];
export default function AddPromise() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "",
    progress: 0,
    image: "",
  });

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      await API.post("/promises", form);
      alert("Promise added successfully!");
      navigate("/admin");
    } catch (err) {
      console.error("Error adding promise:", err);
      alert("Error adding promise");
    }
  }

  return (
    <div className="max-w-3xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-6">Add New Promise</h1>

      <form onSubmit={handleSubmit} className="space-y-6">

        {/* Title */}
         <div>
          <label className="block font-semibold mb-1">Title</label>
          <input
            type="text"
            name="title"
            value={form.title}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />
        </div>
        {/* Category */}
        <div>
          <label className="block font-semibold mb-1">Category</label>
          <select
            name="category"
            required
            value={form.category}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          >
            <option value="">Select category</option>
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>

        {/* Description */}
        <div>
          <label className="block font-semibold mb-1">Description</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            rows="4"
            required
          ></textarea>
        </div>

        {/* Category */}
        {/* <div>
          <label className="block font-semibold mb-1">Category</label>
          <input
            type="text"
            name="category"
            value={form.category}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />
        </div> */}

        {/* Progress */}
        <div>
          <label className="block font-semibold mb-1">Progress (%)</label>
          <input
            type="number"
            name="progress"
            value={form.progress}
            onChange={handleChange}
            min="0"
            max="100"
            className="w-full border p-2 rounded"
          />
        </div>

        {/* Image */}
        <div>
          <label className="block font-semibold mb-1">Image URL</label>
          <input
            type="text"
            name="image"
            value={form.image}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded"
        >
          Add Promise
        </button>
      </form>
    </div>
  );
}
