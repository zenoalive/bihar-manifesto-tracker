import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import PromiseItem from "../components/PromiseItem";

export default function CategoryDetail() {
  const { name } = useParams();
  const categoryName = decodeURIComponent(name);

  const [promises, setPromises] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/promises/category/${encodeURIComponent(categoryName)}`)
      .then((res) => {
        setPromises(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error loading category:", err);
        setLoading(false);
      });
  }, [categoryName]);

  if (loading) {
    return <div className="p-4">Loading...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      <Link className="text-blue-600 underline" to="/categories">
        ← Back to Categories
      </Link>

      <h1 className="text-3xl font-bold mt-4 mb-6">{categoryName}</h1>

      {promises.length === 0 ? (
        <div className="p-4 text-gray-500 bg-white rounded shadow">
          No promises found under this category.
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {promises.map((p) => (
            <PromiseItem key={p._id} promise={p} />
          ))}
        </div>
      )}
    </div>
  );
}
