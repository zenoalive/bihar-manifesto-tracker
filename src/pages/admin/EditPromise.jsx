import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API from "../../api";

export default function EditPromise() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "",
    progress: 0,
    status: "pending",

    bannerImage: "",
    galleryImages: [],
    sources: [],
    notes: [],
  });

  useEffect(() => {
    API.get(`/promises/${id}`)
      .then((res) => {
        const p = res.data;
        setForm({
          title: p.title,
          description: p.description || "",
          category: p.category,
          progress: p.progress || 0,
          status: p.status || "pending",

          bannerImage: p.bannerImage || "",
          galleryImages: p.galleryImages || [],
          sources: p.sources || [],
          notes: p.notes || [],
        });
      })
      .catch((err) => console.error("Error loading:", err));
  }, [id]);

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
      console.error("Update error:", err);
      alert("Failed to update promise");
    }
  }

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Edit Promise</h1>

      <form onSubmit={handleSubmit} className="space-y-6">

        {/* Title */}
        <div>
          <label className="font-semibold">Title</label>
          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
        </div>

        {/* Description */}
        <div>
          <label className="font-semibold">Description</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            rows="4"
            className="w-full border p-2 rounded"
          />
        </div>

        {/* Banner Image Upload */}
        <div>
          <label className="font-semibold">Banner Image</label>

          {/* Upload Button */}
          <input
            type="file"
            accept="image/*"
            onChange={async (e) => {
              const file = e.target.files[0];
              if (!file) return;

              const formData = new FormData();
              formData.append("image", file);

              const res = await API.post("/upload/single", formData, {
                headers: { "Content-Type": "multipart/form-data" },
              });

              setForm({ ...form, bannerImage: res.data.filePath });
            }}
            className="block mt-1"
          />

          {/* Display uploaded image */}
          {form.bannerImage && (
            <img
              src={form.bannerImage}
              alt="Banner"
              className="w-48 mt-2 rounded border"
            />
          )}
        </div>
        <div>
          <label className="font-semibold">Status</label>
          <select
            name="status"
            value={form.status}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          >
            <option value="pending">Pending</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
        </div>
        <div>
          <label className="font-semibold">Progress: {form.progress}%</label>
          <input
            type="range"
            name="progress"
            min="0"
            max="100"
            value={form.progress}
            onChange={handleChange}
            className="w-full"
          />
        </div>



        {/* Gallery Images Upload */}
        <div className="mt-4">
          <label className="font-semibold">Gallery Images</label>

          <input
            type="file"
            accept="image/*"
            multiple
            onChange={async (e) => {
              const files = e.target.files;
              if (!files.length) return;

              const formData = new FormData();
              Array.from(files).forEach((file) => formData.append("images", file));

              const res = await API.post("/upload/multiple", formData, {
                headers: { "Content-Type": "multipart/form-data" },
              });

              setForm({
                ...form,
                galleryImages: [...form.galleryImages, ...res.data.files],
              });
            }}
            className="block mt-1"
          />

          {/* Thumbnails */}
          <div className="grid grid-cols-3 gap-3 mt-2">
            {form.galleryImages.map((img, i) => (
              <img
                key={i}
                src={img}
                className="h-24 w-full object-cover rounded border"
              />
            ))}
          </div>
        </div>


        <div>
          <label className="font-semibold">Sources (comma-separated URLs)</label>
          <input
            name="sources"
            value={form.sources.join(", ")}
            onChange={(e) =>
              setForm({
                ...form,
                sources: e.target.value.split(",").map(s => s.trim())
              })
            }
            className="w-full border p-2 rounded"
          />
        </div>

        {/* Notes */}
        <div>
          <label className="font-semibold">Progress Notes (comma-separated)</label>
          <input
            name="notes"
            value={form.notes.join(", ")}
            onChange={(e) =>
              setForm({
                ...form,
                notes: e.target.value
                  .split(",")
                  .map((x) => x.trim())
                  .filter(Boolean),
              })
            }
            className="w-full border p-2 rounded"
          />
        </div>

        {/* Progress */}
        <div>
          <label className="font-semibold">Progress (%)</label>
          <input
            type="number"
            name="progress"
            value={form.progress}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
        </div>

        {/* Status */}
        <div>
          <label className="font-semibold">Status</label>
          <select
            name="status"
            value={form.status}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          >
            <option value="pending">Pending</option>
            <option value="in-progress">In Progress</option>
            <option value="complete">Completed</option>
          </select>
        </div>

        {/* Submit */}
        <button className="bg-blue-600 text-white px-5 py-2 rounded">
          Save Changes
        </button>
      </form>
    </div>
  );
}
