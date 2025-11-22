import { Link } from "react-router-dom";
import logo from "../assets/logo.png";

export default function Header() {
  return (
    <header className="bg-white shadow p-4">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <img src={logo} alt="Universitas Klabat" className="h-12 w-12 object-contain" />
          <h1 className="text-xl font-bold text-gray-800">UNIVERSITAS KLABAT</h1>
        </div>
        <Link to="/" className="text-2xl font-bold text-blue-600">Organisasi Yang Ada Di Universitas Klabat</Link>
        <nav className="space-x-4 text-gray-700">
          <Link to="/" className="hover:text-blue-600">Home</Link>
          <Link to="/admin" className="hover:underline">Admin</Link>
        </nav>
      </div>
    </header>
  );
}
