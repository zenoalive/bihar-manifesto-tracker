import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import ProgressBar from "../components/ProgressBar";

export default function PromiseDetail() {
  const { id } = useParams();
  const [promise, setPromise] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/promises/${id}`)
      .then((res) => {
        setPromise(res.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id]);

  if (loading) return <div className="p-6 text-center">Loading...</div>;

  if (!promise) {
    return (
      <div className="p-4 text-center text-red-500">
        Promise not found.
        <div>
          <Link className="text-blue-600 underline" to="/">Go back</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Back Button */}
      <Link className="text-blue-600 underline" to={`/category/${encodeURIComponent(promise.category)}`}>
        ← Back to {promise.category}
      </Link>

      {/* Title */}
      <h1 className="text-3xl font-bold mt-3 mb-4">{promise.title}</h1>

      {/* Category Label */}
      <div className="text-gray-600 mb-4">
        <strong>Category:</strong> {promise.category}
      </div>

      {/* Image Banner */}
      {promise.image && (
        <div className="w-full mb-6">
          <img
            src={promise.image}
            alt="Promise visual"
            className="w-full h-56 object-cover rounded-lg shadow"
          />
        </div>
      )}

      {/* Progress */}
      <div className="my-6">
        <ProgressBar percent={promise.progress} />
        <div className="text-sm text-gray-700 mt-1">
          {promise.progress}% completed
        </div>
      </div>

      {/* Description */}
      <p className="text-gray-800 leading-relaxed text-lg mb-8">
        {promise.description}
      </p>

      {/* Evidence Sources */}
      <div className="mt-10">
        <h2 className="text-xl font-semibold mb-3">Evidence Sources</h2>

        {promise.sources && promise.sources.length > 0 ? (
          <ul className="list-disc ml-6 space-y-2">
            {promise.sources.map((src, idx) => (
              <li key={idx}>
                <a
                  href={src}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 underline"
                >
                  {src}
                </a>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No sources provided.</p>
        )}
      </div>

      {/* Notes */}
      <div className="mt-12">
        <h2 className="text-xl font-semibold mb-3">Progress Notes</h2>

        {promise.notes && promise.notes.length > 0 ? (
          <div className="space-y-4">
            {promise.notes.map((note, idx) => (
              <div key={idx} className="bg-gray-100 p-4 rounded-lg shadow">
                <div className="text-sm text-gray-500">{note.date}</div>
                <div className="text-gray-800 mt-1">{note.text}</div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No notes added yet.</p>
        )}
      </div>
    </div>
  );
}
