// import { categoryIcons, defaultIcon } from "../utils/categoryIcons";

// export default function CategoryHeader({ category }) {
//   const Icon = categoryIcons[category] || defaultIcon;

//   return (
//     <div className="bg-blue-600 text-white py-10 px-4 rounded-2xl shadow-md mb-8 flex items-center gap-4">
//       <div className="bg-white/20 w-14 h-14 flex items-center justify-center rounded-full backdrop-blur-sm">
//         <Icon className="w-8 h-8 text-white" />
//       </div>

//       <div>
//         <h1 className="text-3xl font-bold">{category}</h1>
//         <p className="text-blue-100 mt-1">Tracking progress of promises related to {category}</p>
//       </div>
//     </div>
//   );
// }

import { categoryIcons, defaultIcon } from "../utils/categoryIcons";

export default function CategoryHeader({ category }) {
  const Icon = categoryIcons[category] || defaultIcon;
  return (
    <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-10 px-6 rounded-2xl shadow-md mb-8 flex items-center gap-4">
      <div className="bg-white/20 w-16 h-16 rounded-full flex items-center justify-center">
        <Icon className="w-8 h-8 text-white" />
      </div>
      <div>
        <h1 className="text-3xl font-bold">{category}</h1>
        <p className="text-blue-100 mt-1">Tracking progress & evidence for {category} promises.</p>
      </div>
    </div>
  );
}
