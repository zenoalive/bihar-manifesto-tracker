// // import { useEffect, useState } from "react";
// // import { useParams, Link } from "react-router-dom";
// // import axios from "axios";
// // import PromiseItem from "../components/PromiseItem";

// // export default function CategoryDetail() {
// //   const { name } = useParams();
// //   const categoryName = decodeURIComponent(name);

// //   const [promises, setPromises] = useState([]);
// //   const [loading, setLoading] = useState(true);

// //   useEffect(() => {
// //     axios
// //       .get(`http://localhost:5000/api/promises/category/${encodeURIComponent(categoryName)}`)
// //       .then((res) => {
// //         setPromises(res.data);
// //         setLoading(false);
// //       })
// //       .catch((err) => {
// //         console.error("Error loading category:", err);
// //         setLoading(false);
// //       });
// //   }, [categoryName]);

// //   if (loading) {
// //     return <div className="p-4">Loading...</div>;
// //   }

// //   return (
// //     <div className="max-w-4xl mx-auto px-4 py-6">
// //       <Link className="text-blue-600 underline" to="/categories">
// //         ← Back to Categories
// //       </Link>

// //       <h1 className="text-3xl font-bold mt-4 mb-6">{categoryName}</h1>

// //       {promises.length === 0 ? (
// //         <div className="p-4 text-gray-500 bg-white rounded shadow">
// //           No promises found under this category.
// //         </div>
// //       ) : (
// //         <div className="grid grid-cols-1 gap-4">
// //           {promises.map((p) => (
// //             <PromiseItem key={p._id} promise={p} />
// //           ))}
// //         </div>
// //       )}
// //     </div>
// //   );
// // }


// import { useParams, Link } from "react-router-dom";
// import { useEffect, useState } from "react";
// import axios from "axios";
// import PromiseCardSmall from "../components/PromiseCardSmall";
// import { categoryImages } from "../data/categoryImages";

// export default function CategoryDetail() {
//   const { name } = useParams();
//   const categoryName = decodeURIComponent(name);

//   const [promises, setPromises] = useState([]);

//   useEffect(() => {
//     axios
//       .get(`http://localhost:5000/api/promises?category=${categoryName}`)
//       .then((res) => setPromises(res.data))
//       .catch(() => setPromises([]));
//   }, [categoryName]);

//   const bannerImage =
//     categoryImages[categoryName] ||
//     "https://images.unsplash.com/photo-1521737604893-d14cc237f11d";

//   return (
//     <div className="min-h-screen bg-gray-50">

//       {/* Banner */}
//       <div
//         className="h-56 w-full bg-cover bg-center relative"
//         style={{ backgroundImage: `url(${bannerImage})` }}
//       >
//         <div className="absolute inset-0 bg-black/40"></div>
//         <h1 className="absolute bottom-4 left-6 text-3xl font-bold text-white drop-shadow-lg">
//           {categoryName}
//         </h1>
//       </div>

//       {/* Content */}
//       <div className="max-w-7xl mx-auto px-6 py-10">

//         <Link className="text-blue-600 underline" to="/categories">
//           ← Back to Categories
//         </Link>

//         {promises.length === 0 ? (
//           <p className="mt-10 text-gray-500 text-lg">
//             No promises found under this category.
//           </p>
//         ) : (
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
//             {promises.map((p) => (
//               <PromiseCardSmall key={p._id} promise={p} />
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }
import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { categoryImages } from "../data/categoryImages";
import PromiseCard from "../components/PromiseCard";

export default function CategoryDetail() {
  const { name } = useParams();
  const categoryName = decodeURIComponent(name);

  const [promises, setPromises] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/promises")
      .then((res) => {
        const filtered = res.data.filter(
          (p) => p.category === categoryName
        );
        setPromises(filtered);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [categoryName]);

  return (
    <div className="min-h-screen bg-gray-50 pb-10">

      {/* Banner */}
      <div
        className="h-48 bg-cover bg-center relative"
        style={{
          backgroundImage: `url(${categoryImages[categoryName]})`,
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-30"></div>

        <div className="relative z-10 px-6 max-w-6xl mx-auto pt-14">
          <Link
            className="text-white underline text-sm"
            to="/categories"
          >
            ← Back to categories
          </Link>

          <h1 className="text-3xl font-bold text-white mt-2">
            {categoryName}
          </h1>
        </div>
      </div>

      {/* Content */}
      <div className="px-6 max-w-6xl mx-auto mt-8">

        {loading ? (
          <p>Loading...</p>
        ) : promises.length === 0 ? (
          <p className="text-gray-500 text-lg">
            No promises found under this category.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {promises.map((p) => (
              <PromiseCard key={p._id} promise={p} />
            ))}
          </div>
        )}

      </div>
    </div>
  );
}
