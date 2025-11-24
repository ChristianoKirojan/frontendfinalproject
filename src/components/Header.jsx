import { Link } from "react-router-dom";
import logo from "../assets/logo.png";

export default function Header() {
  return (
    <header className="fixed top-0 left-0 w-full bg-gray-900 backdrop-blur-md z-50 shadow-md">
      <div className="max-w-6xl mx-auto flex items-center justify-between py-4 px-6">
        <div className="flex items-center space-x-3">
          <img src={logo} alt="Universitas Klabat" className="h-12 w-12 object-contain" />
          <h1 className="text-xl font-bold text-white drop-shadow-md">UNIVERSITAS KLABAT</h1>
        </div>

        <Link
          to="/"
          className="text-2xl font-bold text-white drop-shadow-md"
        >
          Organisasi Yang Ada Di Universitas Klabat
        </Link>

        <nav className="space-x-4 text-white">
          <Link to="/" className="hover:text-blue-600">Home</Link>
          <Link to="/admin" className="hover:underline">Admin</Link>
        </nav>
      </div>
    </header>
  );
}