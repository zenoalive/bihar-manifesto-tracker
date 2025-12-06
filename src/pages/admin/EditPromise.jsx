import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../../api";

export default function EditPromise() {
  const { id } = useParams();

useEffect(() => {
  fetch(`http://localhost:5000/api/promises/${id}`)
    .then(res => res.json())
    .then(data => setForm(data));
}, [id]);

  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "",
    progress: 0,
    image: "",
  });

  const [loading, setLoading] = useState(true);

  // Load the existing promise from backend
  useEffect(() => {
    async function fetchPromise() {
      try {
        const res = await API.get(`/promises/${id}`);
        setForm(res.data);
        setLoading(false);
      } catch (err) {
        console.error("Error loading promise:", err);
        alert("Failed to load promise.");
        navigate("/admin");
      }
    }
    fetchPromise();
  }, [id, navigate]);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      await API.put(`/promises/${id}`, form);
      alert("Promise updated!");
      navigate("/admin");
    } catch (err) {
      console.error("Error updating:", err);
      alert("Failed to update promise.");
    }
  }

  if (loading) return <p className="p-6">Loading...</p>;

  return (
    <div className="max-w-3xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-6">Edit Promise</h1>

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
        <div>
          <label className="block font-semibold mb-1">Category</label>
          <input
            type="text"
            name="category"
            value={form.category}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />
        </div>

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
          className="bg-green-600 text-white px-6 py-2 rounded"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
}
