import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../../api";

export default function AdminDashboard() {
  const [promises, setPromises] = useState([]);

  // Load all promises from backend
  useEffect(() => {
    async function fetchData() {
      try {
        const res = await API.get("/promises");
        setPromises(res.data);
      } catch (err) {
        console.error("Error loading admin data:", err);
      }
    }
    fetchData();
  }, []);

  // Delete handler
  async function handleDelete(id) {
    if (!confirm("Are you sure you want to delete this?")) return;

    try{
      await API.delete(`/promises/${id}`);
      setPromises(promises.filter((p) => p._id !== id));
    } catch (err) {
      console.error("Delete failed:", err);
    }
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-6">Admin Panel</h1>

      <Link
        to="/admin/add"
        className="bg-blue-600 text-white px-4 py-2 rounded mb-4 inline-block"
      >
        Add New Promise
      </Link>

      <div className="mt-6 space-y-4">
        {promises.map((p) => (
          <div
            key={p._id}
            className="border p-4 rounded shadow flex justify-between"
          >
            <div>
              <h2 className="font-bold">{p.title}</h2>
              <p className="text-gray-600 text-sm">{p.category}</p>
            </div>

            <div className="flex gap-3">
              <Link
                to={`/admin/edit/${p._id}`}
                className="px-3 py-1 bg-yellow-500 text-white rounded"
              >
                Edit
              </Link>
              <button
                onClick={() => handleDelete(p._id)}
                className="px-3 py-1 bg-red-600 text-white rounded"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
