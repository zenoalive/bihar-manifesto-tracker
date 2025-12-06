import { Link } from "react-router-dom";
import ProgressBar from "./ProgressBar";

export default function PromiseItem({ promise }) {
  return (
    <Link to={`/promise/${promise.id}`}>
      <div className="p-4 border-b border-gray-300 hover:bg-gray-50 transition cursor-pointer">
        <h2 className="text-lg font-semibold">{promise.title}</h2>

        <div className="text-sm text-gray-600 mb-2">
          Category: {promise.category}
        </div>

        <ProgressBar percent={promise.progress} />

        <div className="text-sm mt-1 text-gray-600">
          {promise.progress}% completed
        </div>
      </div>
    </Link>
  );
}
