import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import Home from "./components/Home/Home.jsx";
import CardDetail from "./pages/CardDetail.jsx";
import { Routes, Route } from "react-router-dom";

export default function App() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="flex-1 max-w-6xl mx-auto w-full p-6">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/organization/:id" element={<CardDetail />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
