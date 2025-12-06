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
      .catch((err) => {
        console.error("Failed to load promise:", err);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <div className="p-4">Loading...</div>;
  }

  if (!promise) {
    return (
      <div className="p-4 text-center text-red-500">
        Promise not found.
        <div>
          <Link className="text-blue-600 underline" to="/">
            Go back
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-4">
      <Link className="text-blue-600 underline" to="/">
        ← Back
      </Link>

      <h1 className="text-3xl font-bold mt-2 mb-4">{promise.title}</h1>

      <div className="text-gray-700 mb-2">
        <strong>Category:</strong> {promise.category}
      </div>

      <div className="my-4">
        <ProgressBar percent={promise.progress || 0} />
        <div className="text-sm text-gray-700 mt-1">
          {promise.progress || 0}% completed
        </div>
      </div>

      {promise.description && (
        <p className="text-gray-800 mt-6 whitespace-pre-line">
          {promise.description}
        </p>
      )}

      {promise.sources && promise.sources.length > 0 && (
        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-2">Sources</h2>
          <ul className="list-disc list-inside text-blue-700">
            {promise.sources.map((s, idx) => (
              <li key={idx}>
                <a href={s} target="_blank" rel="noreferrer" className="underline">
                  {s}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
