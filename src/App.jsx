import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import PromiseDetail from "./pages/PromiseDetail";
import Layout from "./components/Layout";
import Categories from "./pages/Categories";
import CategoryDetail from "./pages/CategoryDetail";
import AdminLayout from "./pages/admin/AdminLayout"
import AdminDashboard from "./pages/admin/AdminDashboard";
import AddPromise from "./pages/admin/AddPromise";
import EditPromise from "./pages/admin/EditPromise"





export default function App() {
  return (
   <BrowserRouter>
  <Layout>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/promise/:id" element={<PromiseDetail />} />
      <Route path="/categories" element={<Categories />} />
      <Route path="/category/:category" element={<CategoryDetail />} />

      {/* ADMIN ROUTES */}
      <Route
        path="/admin"
        element={
          <AdminLayout>
            <AdminDashboard />
          </AdminLayout>
        }
      />

      <Route
        path="/admin/add"
        element={
          <AdminLayout>
            <AddPromise />
          </AdminLayout>
        }
      />

      <Route
        path="/admin/edit/:id"
        element={
          <AdminLayout>
            <EditPromise />
          </AdminLayout>
        }
      />
    </Routes>
  </Layout>
</BrowserRouter>

  );
}
