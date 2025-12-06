export default function ProgressBar({ percent }) {
  const p = Math.max(0, Math.min(100, percent)); // clamp 0–100

  return (
    <div className="w-full bg-gray-200 h-2 rounded">
      <div
        className="h-full bg-green-500 rounded"
        style={{ width: `${p}%` }}
      />
    </div>
  );
}
