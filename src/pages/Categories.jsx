// import { useParams } from "react-router-dom";
// // import { loadPromises } from "../api/promiseStore";
// import PromiseCard from "../components/PromiseCard";
// import CategoryHeader from "../components/Categoryheader";

// export default function Categories() {
//   const { category } = useParams();
//   const promises = loadPromises().filter((p) => p.category === category);

//   return (
//     <div className="max-w-6xl mx-auto px-4 py-10">
      
//       <CategoryHeader category={category} />

//       {promises.length === 0 ? (
//         <p className="text-gray-500 text-lg">No promises found under this category.</p>
//       ) : (
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//           {promises.map((p) => (
//             <PromiseCard key={p.id} promise={p} />
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { categoryImages } from "../data/categoryImages";


export default function Categories() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/promises")
      .then((res) => {
        const data = res.data;

        // Group by category
        const grouped = {};
        data.forEach((p) => {
          if (!grouped[p.category]) grouped[p.category] = [];
          grouped[p.category].push(p);
        });

        // Convert to array format
        const formatted = Object.keys(grouped).map((cat) => ({
          name: cat,
          count: grouped[cat].length,
          image: categoryImages[cat] || "",
        }));

        setCategories(formatted);
      })
      .catch(() => setCategories([]));
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-10 max-w-7xl mx-auto">

      <h1 className="text-3xl font-bold mb-6">All Categories</h1>
      <p className="text-gray-600 mb-10">
        Tracking progress & evidence across different policy areas.
      </p>

      {categories.length === 0 ? (
        <p className="text-gray-500 text-lg">No categories found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">

          {categories.map((cat) => (
            <Link
              key={cat.name}
              to={`/category/${encodeURIComponent(cat.name)}`}
              className="group block bg-white shadow rounded-xl overflow-hidden border hover:shadow-lg transition"
            >
              {/* Image */}
              <div
                className="h-40 bg-cover bg-center"
                style={{
                  backgroundImage: `url(${cat.image})`,
                }}
              ></div>

              {/* Name & count */}
              <div className="p-5">
                <h2 className="text-xl font-bold group-hover:text-blue-600 transition">
                  {cat.name}
                </h2>
                <p className="text-gray-600 mt-1">{cat.count} promises</p>
              </div>
            </Link>
          ))}

        </div>
      )}
    </div>
  );
}

