import { useParams } from "react-router-dom";
// import { loadPromises } from "../api/promiseStore";
import PromiseCard from "../components/PromiseCard";
import CategoryHeader from "../components/Categoryheader";

export default function Categories() {
  const { category } = useParams();
  const promises = loadPromises().filter((p) => p.category === category);

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      
      <CategoryHeader category={category} />

      {promises.length === 0 ? (
        <p className="text-gray-500 text-lg">No promises found under this category.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {promises.map((p) => (
            <PromiseCard key={p.id} promise={p} />
          ))}
        </div>
      )}
    </div>
  );
}
