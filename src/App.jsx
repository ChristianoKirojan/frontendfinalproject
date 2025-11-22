import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import Home from "./components/Home/Home.jsx";
import CardDetail from "./pages/CardDetail.jsx";
import AdminList from "./pages/admin/AdminList.jsx";
import AddOrg from "./pages/admin/AddOrg.jsx";
import EditOrg from "./pages/admin/EditOrg.jsx";
import { Routes, Route } from "react-router-dom";

export default function App() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />

      <main className="flex-1 max-w-6xl mx-auto w-full p-6">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/organization/:id" element={<CardDetail />} />

          {/* Admin Pages */}
          <Route path="/admin" element={<AdminList />} />
          <Route path="/admin/add" element={<AddOrg />} />
          <Route path="/admin/edit/:id" element={<EditOrg />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}
