import { Link } from "react-router-dom";
import { categoryIcons, defaultIcon } from "../utils/categoryIcons";

export default function PromiseCard({ promise }) {
  const Icon = categoryIcons[promise.category] || defaultIcon;

  return (
    <Link to={`/promise/${promise._id}`} className="block">
      <div className="bg-white shadow-sm rounded-xl border hover:shadow-md transition p-5 flex flex-col gap-4">

        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-blue-50 flex items-center justify-center rounded-full">
            <Icon className="w-6 h-6 text-blue-600" />
          </div>

          <div>
            <h3 className="font-semibold text-gray-900">{promise.title}</h3>
            <span className="text-sm text-gray-500">{promise.category}</span>
          </div>
        </div>

        <div>
          <div className="text-sm text-gray-700 mb-1">
            Progress: {promise.progress}%
          </div>

          <div className="w-full h-2 bg-gray-200 rounded-full">
            <div
              className="h-full bg-blue-600 rounded-full"
              style={{ width: `${promise.progress}%` }}
            ></div>
          </div>
        </div>

      </div>
    </Link>
  );
}
