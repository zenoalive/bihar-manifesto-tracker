import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../api";
import PromiseCard from "../components/PromiseCard";
import CategoryHeader from "../components/Categoryheader";

export default function CategoryPage() {
  const { category } = useParams();
  const [promises, setPromises] = useState([]);
  const [sources, setSources] = useState([]); // aggregated sources

  useEffect(() => {
    const cat = decodeURIComponent(category);
    API.get(`/promises/category/${encodeURIComponent(cat)}`).then((res) => {
      const data = res.data;
      setPromises(data);

      // build aggregated sources list (merge sources of promises)
      const sMap = {};
      data.forEach((p) => {
        (p.sources || []).forEach((src) => {
          if (!sMap[src.url]) sMap[src.url] = src;
        });
      });
      setSources(Object.values(sMap));
    }).catch((err) => {
      console.error("Error fetching category:", err);
      setPromises([]);
      setSources([]);
    });
  }, [category]);

  const avgProgress = promises.length ? Math.round(promises.reduce((a,b) => a + (b.progress||0), 0) / promises.length) : 0;

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <CategoryHeader category={decodeURIComponent(category)} />

      <div className="mb-6">
        <div className="text-sm text-gray-600">Overall progress</div>
        <div className="w-full h-3 bg-gray-200 rounded mt-2">
          <div className="h-full bg-gradient-to-r from-green-400 to-blue-600 rounded" style={{ width: `${avgProgress}%` }}></div>
        </div>
        <div className="text-sm text-gray-600 mt-2">{avgProgress}% completed</div>
      </div>

      <h2 className="text-2xl font-bold mb-4">Promises</h2>
      {promises.length === 0 ? (
        <div className="p-4 bg-white rounded shadow">No promises found under this category.</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {promises.map((p) => <PromiseCard key={p._id} promise={p} />)}
        </div>
      )}

      <h2 className="text-2xl font-bold mb-3">Sources used for this category</h2>
      {sources.length === 0 ? (
        <div className="text-gray-500">No sources listed yet.</div>
      ) : (
        <div className="space-y-3">
          {sources.map((s, i) => (
            <div key={i} className="p-4 bg-white rounded shadow">
              <a href={s.url} target="_blank" rel="noreferrer" className="text-blue-600 font-medium">{s.title || s.url}</a>
              <div className="text-sm text-gray-500">{s.publisher ? `${s.publisher}` : ""} {s.publishedDate ? ` · ${new Date(s.publishedDate).toLocaleDateString()}` : ""}</div>
              {s.note && <div className="mt-2 text-gray-700">{s.note}</div>}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
