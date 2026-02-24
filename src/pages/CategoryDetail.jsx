
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import PromiseCard from "../components/PromiseCard";
import { categoryInfo } from "../data/categoryInfo";

export default function CategoryDetail() {
  const { category } = useParams();
  const [promises, setPromises] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!category) return;

    const fetchData = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/promises?category=${encodeURIComponent(
            category
          )}`
        );
        setPromises(res.data);
      } catch (err) {
        console.error("Error loading category:", err);
        setPromises([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [category]);

  const info = categoryInfo[category];

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-2">{category}</h1>
      {info && <p className="text-gray-600 mb-6">{info.description}</p>}
      {info && (
        <img
          src={info.image}
          className="w-full h-60 object-cover rounded-xl shadow mb-8"
          alt={category}
        />
      )}

      {loading ? (
        <p>Loading…</p>
      ) : promises.length === 0 ? (
        <p className="text-gray-500 text-lg">No promises found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {promises.map((p) => (
            <PromiseCard key={p._id} promise={p} />
          ))}
        </div>
      )}
    </div>
  );
}
