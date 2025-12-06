import { useEffect, useState } from "react";
import API from "../api";
import { categoryIcons, defaultIcon } from "../utils/categoryIcons";
import { Link } from "react-router-dom";

export default function Home() {
  const [promises, setPromises] = useState([]);
  const [categoriesData, setCategoriesData] = useState([]);

  useEffect(() => {
    API.get("/promises").then((res) => setPromises(res.data)).catch(console.error);
  }, []);

  useEffect(() => {
    // compute aggregate by category
    const map = {};
    promises.forEach((p) => {
      if (!map[p.category]) map[p.category] = { count: 0, totalProgress: 0 };
      map[p.category].count += 1;
      map[p.category].totalProgress += (p.progress || 0);
    });

    const cats = Object.entries(map).map(([category, data]) => {
      const avg = data.count ? Math.round(data.totalProgress / data.count) : 0;
      return { category, count: data.count, progress: avg };
    });

    setCategoriesData(cats);
  }, [promises]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-6">NDA Manifesto Tracker</h1>
      <p className="text-gray-600 mb-10">Click a category to see details, promises and evidence.</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {categoriesData.map((c) => {
          const Icon = categoryIcons[c.category] || defaultIcon;
          return (
            <Link key={c.category} to={`/category/${encodeURIComponent(c.category)}`}>
              <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition flex flex-col gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-full bg-blue-50 flex items-center justify-center">
                    <Icon className="w-7 h-7 text-blue-600" />
                  </div>
                  <div>
                    <div className="text-lg font-semibold">{c.category}</div>
                    <div className="text-sm text-gray-500">{c.count} promises</div>
                  </div>
                </div>

                <div>
                  <div className="w-full h-2 bg-gray-200 rounded-full mt-2">
                    <div className="h-full bg-gradient-to-r from-green-400 to-blue-600 rounded-full" style={{ width: `${c.progress}%` }} />
                  </div>
                  <div className="text-sm text-gray-600 mt-1">{c.progress}% completed</div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
