// import { Link } from "react-router-dom";
// import { loadPromises, savePromises } from "../../api/promiseStore";

// export default function AdminLayout({ children }) {
//   const handleDelete = (id) => {
//   if (!window.confirm("Are you sure you want to delete this promise?")) return;

//   const data = loadPromises();
//   const updated = data.filter((p) => p.id !== id);
//   savePromises(updated);

//   // force re-render by refreshing the page
//   window.location.reload();
// };

//   return (
//     <div className="flex min-h-screen bg-gray-100">
      

//       {/* Sidebar */}
//       <aside className="w-64 bg-white border-r shadow-sm p-6">
//         <h1 className="text-2xl font-bold mb-8">Admin Panel</h1>

//         <nav className="flex flex-col gap-4 text-base">
//           <Link to="/admin" className="hover:text-blue-600">Dashboard</Link>
//           <Link to="/admin/add" className="hover:text-blue-600">Add Promise</Link>
//           <Link to="/" className="pt-4 text-gray-500 hover:text-blue-600">
//             ← Back to Site
//           </Link>
//         </nav>
//       </aside>

//       {/* Main content area */}
//       <main className="flex-1 p-8">
//         {children && 
//   (typeof children.type === "function"
//     ? children.type({ onDelete: handleDelete })
//     : children)}
//       </main>
//     </div>
//   );
// }


import { Link } from "react-router-dom";

export default function AdminLayout({ children }) {

  return (
    <div className="flex min-h-screen bg-gray-100">
      
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r shadow-sm p-6">
        <h1 className="text-2xl font-bold mb-8">Admin Panel</h1>

        <nav className="flex flex-col gap-4 text-base">
          <Link to="/admin" className="hover:text-blue-600">Dashboard</Link>
          <Link to="/admin/add" className="hover:text-blue-600">Add Promise</Link>
          <Link to="/" className="pt-4 text-gray-500 hover:text-blue-600">
            ← Back to Site
          </Link>
        </nav>
      </aside>

      {/* Main content area */}
      <main className="flex-1 p-8">
        {children}
      </main>
    </div>
  );
}
