import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../api";

export default function PromiseDetail() {
  const { id } = useParams();
  const [promise, setPromise] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPromise() {
      try {
        const res = await API.get(`/promises/${id}`);
        setPromise(res.data);
      } catch (err) {
        console.error("Error fetching promise:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchPromise();
  }, [id]);

  if (loading) return <div className="p-6 text-center">Loading…</div>;
  if (!promise) return <div className="p-6 text-center">Promise not found.</div>;

  return (
    <div className="max-w-4xl mx-auto p-6">

      {/* HEADER IMAGE */}
      {promise.bannerImage && (
        <div className="mb-6">
          <img
            src={`http://localhost:5000${promise.bannerImage}`}
            alt="Promise banner"
            className="w-full h-64 object-cover rounded-xl shadow"
          />
        </div>
      )}
      {/* TITLE + CATEGORY */}
      <h1 className="text-3xl font-bold text-gray-900">{promise.title}</h1>
      <p className="text-gray-500 text-lg mb-4">{promise.category}</p>

      {/* DESCRIPTION */}
      <p className="text-gray-700 leading-relaxed mb-6">
        {promise.description}
      </p>

      {/* PROGRESS BAR */}
      <div className="mb-8">
        <div className="text-sm font-medium">
          Progress: {promise.progress || 0}%
        </div>
        <div className="w-full h-2 bg-gray-200 rounded-full mt-1">
          <div
            className="h-full bg-blue-600 rounded-full"
            style={{ width: `${promise.progress}%` }}
          />
        </div>
      </div>
      <div className="mb-4">
        <span className="px-3 py-1 text-sm rounded-full
    ${promise.status === 'completed' ? 'bg-green-200 text-green-700' :
      promise.status === 'in-progress' ? 'bg-yellow-200 text-yellow-700' :
      'bg-gray-200 text-gray-700'}">
          {promise.status.toUpperCase()}
        </span>
      </div>


      {/* GALLERY IMAGES */}
      {promise.galleryImages && promise.galleryImages.length > 0 && (
        <div className="mb-10">
          <h2 className="text-xl font-semibold mb-3">Images</h2>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {promise.galleryImages.map((img, index) => (
              <img
                key={index}
                src={`http://localhost:5000${img}`}
                alt={`Promise ${index}`}
                className="rounded-lg shadow object-cover w-full h-40"
              />
            ))}
          </div>
        </div>
      )}
      {/* SOURCES */}
      {promise.sources && promise.sources.length > 0 && (
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-2">Sources</h2>
          <ul className="list-disc ml-6 space-y-1">
            {promise.sources.map((src, i) => (
              <li key={i}>
                <a
                  href={src.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline text-blue-600"
                >
                  {src.label}
                </a>
              </li>
            ))}
          </ul>

        </div>
      )}


      {/* NOTES */}
      {promise.notes && promise.notes.length > 0 && (
        <div className="mb-10">
          <h2 className="text-xl font-semibold mb-2">Notes</h2>
          <div className="space-y-2">
            {promise.notes.map((n, i) => (
              <li key={i}>
                <span className="font-semibold">{n.text}</span>
                <span className="text-xs text-gray-500 ml-2">
                  {new Date(n.date).toLocaleDateString()}
                </span>
              </li>
            ))}

          </div>
        </div>
      )}
    </div>
  );
}
