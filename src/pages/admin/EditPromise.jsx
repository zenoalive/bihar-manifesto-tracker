// import { useEffect, useState } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import API from "../../api";

// export default function EditPromise() {
//   const { id } = useParams();
//   const navigate = useNavigate();

//   const [form, setForm] = useState({
//     title: "",
//     description: "",
//     category: "",
//     progress: 0,
//     status: "pending",

//     bannerImage: "",
//     galleryImages: [],
//     sources: [],
//     rawSources: "",   // <— editable text version
//     notes: [],
//   });

//   useEffect(() => {
//     API.get(`/promises/${id}`)
//       .then((res) => {
//         const p = res.data;

//         setForm({
//           title: p.title,
//           description: p.description || "",
//           category: p.category,
//           progress: p.progress || 0,
//           status: p.status || "pending",

//           bannerImage: p.bannerImage
//             ? `${import.meta.env.VITE_API_URL}${p.bannerImage}`
//             : "",

//           galleryImages: (p.galleryImages || []).map(img =>
//             `${import.meta.env.VITE_API_URL}${img}`
//           ),


//           sources: p.sources || [],
//           rawSources:
//             (p.sources || [])
//               .map(s => `${s.label} (${s.url})`)
//               .join(", "),

//           notes: p.notes || [],
//         });
//       })
//       .catch((err) => console.error("Error loading:", err));
//   }, [id]);

//   function handleChange(e) {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   }

//   async function handleSubmit(e) {
//     e.preventDefault();

//     // Convert rawSources → structured array
//     const parsedSources = form.rawSources
//       .split(",")
//       .map((entry) => {
//         const trimmed = entry.trim();
//         if (!trimmed) return null;

//         const match = trimmed.match(/^(.*?)\s*\((https?:\/\/.*?)\)$/);
//         if (!match) return null;

//         return {
//           label: match[1].trim(),
//           url: match[2].trim(),
//         };
//       })
//       .filter(Boolean);   // remove invalid items

//     try {
//       await API.put(`/promises/${id}`, {
//         ...form,
//         sources: parsedSources, // overwrite with structured sources
//       });

//       alert("Promise updated!");
//       navigate("/admin");
//     } catch (err) {
//       console.error("Update error:", err);
//       alert("Failed to update promise");
//     }
//   }

//   return (
//     <div className="max-w-3xl mx-auto p-6">
//       <h1 className="text-2xl font-bold mb-4">Edit Promise</h1>

//       <form onSubmit={handleSubmit} className="space-y-6">

//         {/* Title */}
//         <div>
//           <label className="font-semibold">Title</label>
//           <input
//             name="title"
//             value={form.title}
//             onChange={handleChange}
//             className="w-full border p-2 rounded"
//           />
//         </div>

//         {/* Description */}
//         <div>
//           <label className="font-semibold">Description</label>
//           <textarea
//             name="description"
//             value={form.description}
//             onChange={handleChange}
//             rows="4"
//             className="w-full border p-2 rounded"
//           />
//         </div>

//         {/* Banner Image */}
//         <div>
//           <label className="font-semibold">Banner Image</label>
//           <input
//             type="file"
//             accept="image/*"
//             onChange={async (e) => {
//               const file = e.target.files[0];
//               if (!file) return;

//               const formData = new FormData();
//               formData.append("image", file);

//               const res = await API.post("/upload/single", formData, {
//                 headers: { "Content-Type": "multipart/form-data" },
//               });

//               setForm({ ...form, bannerImage: res.data.filePath });
//             }}
//             className="block mt-1"
//           />

//           {form.bannerImage && (
//             <img
//               src={form.bannerImage}
//               alt="Banner"
//               className="w-48 mt-2 rounded border"
//             />
//           )}
//         </div>

//         {/* Status */}
//         <div>
//           <label className="font-semibold">Status</label>
//           <select
//             name="status"
//             value={form.status}
//             onChange={handleChange}
//             className="w-full border p-2 rounded"
//           >
//             <option value="pending">Pending</option>
//             <option value="in-progress">In Progress</option>
//             <option value="completed">Completed</option>
//           </select>
//         </div>

//         {/* Progress Slider */}
//         <div>
//           <label className="font-semibold">Progress: {form.progress}%</label>
//           <input
//             type="range"
//             name="progress"
//             min="0"
//             max="100"
//             value={form.progress}
//             onChange={handleChange}
//             className="w-full"
//           />
//         </div>

//         {/* Gallery Upload */}
//         <div className="mt-4">
//           <label className="font-semibold">Gallery Images</label>

//           <input
//             type="file"
//             accept="image/*"
//             multiple
//             onChange={async (e) => {
//               const files = e.target.files;
//               if (!files.length) return;

//               const formData = new FormData();
//               Array.from(files).forEach((file) =>
//                 formData.append("images", file)
//               );

//               const res = await API.post("/upload/multiple", formData, {
//                 headers: { "Content-Type": "multipart/form-data" },
//               });

//               setForm({
//                 ...form,
//                 galleryImages: [...form.galleryImages, ...res.data.files],
//               });
//             }}
//             className="block mt-1"
//           />

//           <div className="grid grid-cols-3 gap-3 mt-2">
//             {form.galleryImages.map((img, i) => (
//               <img
//                 key={i}
//                 src={img}
//                 className="h-24 w-full object-cover rounded border"
//               />
//             ))}
//           </div>
//         </div>

//         {/* Sources */}
//         <div>
//           <label className="font-semibold">
//             Sources (e.g. Times of India (https://...))
//           </label>

//           <textarea
//             name="rawSources"
//             value={form.rawSources}
//             onChange={handleChange}
//             rows="2"
//             className="w-full border p-2 rounded"
//           />
//         </div>

       
//         {/* Notes */}
//         <div>
//           <label className="font-semibold">Progress Notes (one per line)</label>

//           <textarea
//             name="notes"
//             rows="5"
//             value={form.notes.map(n => n.text).join("\n")}
//             onChange={(e) => {
//               const lines = e.target.value
//                 .split("\n")
//                 .map((t) => t.trim())
//                 .filter(Boolean);

//               const parsed = lines.map((t, i) => ({
//                 text: t,
//                 date: form.notes[i]?.date || new Date().toISOString(),
//               }));

//               setForm({ ...form, notes: parsed });
//             }}
//             className="w-full border p-2 rounded"
//           />
//         </div>


//         {/* Submit */}
//         <button className="bg-blue-600 text-white px-5 py-2 rounded">
//           Save Changes
//         </button>
//       </form>
//     </div>
//   );
// }
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API from "../../api";

const API_BASE = import.meta.env.VITE_API_URL; // http://localhost:5000

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
    rawSources: "",

    notes: [],
    rawNotes: "",
  });

  // ------------------------------------------------------
  // LOAD PROMISE
  // ------------------------------------------------------
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

          bannerImage: p.bannerImage ? API_BASE + p.bannerImage : "",
          galleryImages: (p.galleryImages || []).map((img) => API_BASE + img),

          sources: p.sources || [],
          rawSources: (p.sources || [])
            .map((s) => `${s.label} (${s.url})`)
            .join("\n"),

          notes: p.notes || [],
          rawNotes: (p.notes || [])
            .map((n) => n.text)
            .join("\n"),
        });
      })
      .catch((err) => console.error("Error loading:", err));
  }, [id]);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  // ------------------------------------------------------
  // SUBMIT UPDATED DATA
  // ------------------------------------------------------
  async function handleSubmit(e) {
    e.preventDefault();

    // Convert frontend URLs → backend relative paths
    const cleanBanner = form.bannerImage.replace(API_BASE, "");
    const cleanGallery = form.galleryImages.map((img) =>
      img.replace(API_BASE, "")
    );

    const cleanedSources = form.rawSources
      .split("\n")
      .map((line) => {
        const match = line.match(/^(.*)\((https?:\/\/[^)]+)\)$/);
        return match
          ? { label: match[1].trim(), url: match[2].trim() }
          : null;
      })
      .filter(Boolean);

    const cleanedNotes = form.rawNotes
      .split("\n")
      .map((n) => n.trim())
      .filter(Boolean)
      .map((text) => ({ text, date: new Date() }));

    const payload = {
      title: form.title,
      description: form.description,
      category: form.category,
      progress: form.progress,
      status: form.status,
      bannerImage: cleanBanner,
      galleryImages: cleanGallery,
      sources: cleanedSources,
      notes: cleanedNotes,
    };

    try {
      await API.put(`/promises/${id}`, payload);
      alert("Promise updated!");
      navigate("/admin");
    } catch (err) {
      console.error("Update error:", err);
      alert("Failed to update");
    }
  }

  // ------------------------------------------------------
  // RENDER
  // ------------------------------------------------------
  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Edit Promise</h1>

      <form onSubmit={handleSubmit} className="space-y-7">

        {/* TITLE */}
        <div>
          <label className="font-semibold">Title</label>
          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
        </div>

        {/* DESCRIPTION */}
        <div>
          <label className="font-semibold">Description</label>
          <textarea
            name="description"
            rows={4}
            value={form.description}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
        </div>

        {/* STATUS */}
        <div>
          <label className="font-semibold">Status</label>
          <select
            name="status"
            className="w-full border p-2 rounded"
            value={form.status}
            onChange={handleChange}
          >
            <option value="pending">Pending</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
        </div>

        {/* PROGRESS */}
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

        {/* ------------------------------------------ */}
        {/* BANNER IMAGE */}
        {/* ------------------------------------------ */}
        <div>
          <label className="font-semibold">Banner Image</label>

          <input
            type="file"
            accept="image/*"
            onChange={async (e) => {
              const file = e.target.files[0];
              if (!file) return;

              const fd = new FormData();
              fd.append("image", file);

              const res = await API.post("/upload/single", fd, {
                headers: { "Content-Type": "multipart/form-data" },
              });

              setForm({
                ...form,
                bannerImage: API_BASE + res.data.filePath,
              });
            }}
            className="mt-1"
          />

          {/* Preview */}
          {form.bannerImage && (
            <div className="mt-3">
              <img
                src={form.bannerImage}
                className="w-60 rounded shadow"
              />

              <button
                type="button"
                onClick={() => setForm({ ...form, bannerImage: "" })}
                className="text-red-600 text-sm mt-2 underline"
              >
                Delete banner
              </button>
            </div>
          )}
        </div>

        {/* ------------------------------------------ */}
        {/* GALLERY IMAGES */}
        {/* ------------------------------------------ */}
        <div>
          <label className="font-semibold">Gallery Images</label>

          <input
            type="file"
            accept="image/*"
            multiple
            onChange={async (e) => {
              const files = e.target.files;
              if (!files.length) return;

              const fd = new FormData();
              Array.from(files).forEach((f) => fd.append("images", f));

              const res = await API.post("/upload/multiple", fd, {
                headers: { "Content-Type": "multipart/form-data" },
              });

              const fullURLs = res.data.files.map((f) => API_BASE + f);

              setForm({
                ...form,
                galleryImages: [...form.galleryImages, ...fullURLs],
              });
            }}
            className="mt-1"
          />

          {/* Thumbnails */}
          <div className="grid grid-cols-3 gap-3 mt-3">
            {form.galleryImages.map((img, index) => (
              <div key={index} className="relative">
                <img
                  src={img}
                  className="h-24 w-full object-cover rounded border"
                />
                <button
                  type="button"
                  className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 text-xs"
                  onClick={() =>
                    setForm({
                      ...form,
                      galleryImages: form.galleryImages.filter(
                        (_, i) => i !== index
                      ),
                    })
                  }
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* ------------------------------------------ */}
        {/* SOURCES (label + URL) */}
        {/* ------------------------------------------ */}
        <div>
          <label className="font-semibold">Sources</label>
          <textarea
            rows={4}
            value={form.rawSources}
            onChange={(e) =>
              setForm({ ...form, rawSources: e.target.value })
            }
            placeholder={`Example:\nTimes of India (https://example.com/article)\nPIB Report (https://pib.gov.in/...)`}
            className="w-full border p-2 rounded"
          />
          <p className="text-xs text-gray-500 mt-1">
            One source per line.
          </p>
        </div>

        {/* ------------------------------------------ */}
        {/* NOTES (one per line) */}
        {/* ------------------------------------------ */}
        <div>
          <label className="font-semibold">Progress Notes</label>
          <textarea
            rows={4}
            value={form.rawNotes}
            onChange={(e) =>
              setForm({ ...form, rawNotes: e.target.value })
            }
            placeholder={`Write one progress update per line.\nExample:\nDPR approved\nLand acquisition started`}
            className="w-full border p-2 rounded"
          />
        </div>

        {/* SUBMIT BUTTON */}
        <button className="bg-blue-700 text-white px-5 py-2 rounded shadow">
          Save Changes
        </button>
      </form>
    </div>
  );
}
