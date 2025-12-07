export default function PromiseCardSmall({ promise }) {
  return (
    <div className="bg-white shadow rounded-xl p-5 border hover:shadow-lg transition">
      <h3 className="text-lg font-bold mb-2">{promise.title}</h3>

      <p className="text-gray-600 text-sm line-clamp-3">
        {promise.description}
      </p>

      {/* Progress */}
      <div className="mt-4">
        <div className="w-full bg-gray-200 h-2 rounded">
          <div
            className="h-2 bg-green-500 rounded"
            style={{ width: `${promise.progress || 0}%` }}
          ></div>
        </div>
        <p className="text-xs text-gray-600 mt-1">
          {promise.progress}% completed
        </p>
      </div>

      {/* Sources */}
      {promise.sources?.length > 0 && (
        <div className="mt-4">
          <p className="text-xs font-semibold text-gray-700 mb-1">Sources:</p>
          <div className="flex flex-wrap gap-2">
            {promise.sources.map((s, i) => (
              <span
                key={i}
                className="px-2 py-1 bg-gray-100 text-xs rounded border"
              >
                {s}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
