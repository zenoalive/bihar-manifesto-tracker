
// import { useEffect, useState } from "react";
// import { useParams, Link } from "react-router-dom";
// import axios from "axios";
// import { categoryImages } from "../data/categoryImages";

// export default function CategoryDetail() {
//   const { category } = useParams();           // ✅ must match route param
//   const decodedCategory = decodeURIComponent(category);

//   const [promises, setPromises] = useState([]);
//   const [loading, setLoading] = useState(true);

//   console.log("Category from URL:", decodedCategory);

//   useEffect(() => {
//     if (!decodedCategory) return;

//     axios
//       .get(`http://localhost:5000/api/promises?category=${decodedCategory}`)
//       .then((res) => {
//         setPromises(res.data);
//         setLoading(false);
//       })
//       .catch((err) => {
//         console.error("Error:", err);
//         setPromises([]);
//         setLoading(false);
//       });
//   }, [decodedCategory]);

//   const bannerImage = categoryImages[decodedCategory] || "/images/default.jpg";

//   return (
//     <div className="max-w-6xl mx-auto px-4 py-10">

//       {/* Back link */}
//       <Link to="/categories" className="text-blue-600 underline">
//         ← Back to Categories
//       </Link>

//       {/* Category Title */}
//       <h1 className="text-3xl font-bold mt-4 mb-6">{decodedCategory}</h1>

//       {/* Banner */}
//       <div
//         className="h-48 w-full rounded-lg bg-cover bg-center mb-8 shadow"
//         style={{ backgroundImage: `url(${bannerImage})` }}
//       ></div>

//       {loading ? (
//         <p className="text-gray-500">Loading...</p>
//       ) : promises.length === 0 ? (
//         <p className="text-gray-500 text-lg">No promises found.</p>
//       ) : (
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//           {promises.map((p) => (
//             <Link
//               key={p._id}
//               to={`/promise/${p._id}`}
//               className="block p-4 bg-white shadow rounded-lg border hover:shadow-lg transition"
//             >
//               <h2 className="font-bold text-lg">{p.title}</h2>
//               <p className="text-gray-600 mt-1 line-clamp-3">{p.description}</p>
//             </Link>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }
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
          `http://localhost:5000/api/promises?category=${encodeURIComponent(
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
