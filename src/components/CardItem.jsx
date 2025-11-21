import { Link } from "react-router-dom";

export default function CardItem({ item }) {
  return (
    <Link to={`/organization/${item.id}`}>
      <div className="border p-4 rounded-xl shadow-sm cursor-pointer transition transform hover:-translate-y-1 hover:scale-105 hover:shadow-lg duration-300">
        <img src={item.image} alt={item.name} className="rounded-xl mb-3 object-cover h-48 w-full" />
        <h2 className="text-xl font-bold text-gray-800">{item.name}</h2>
      </div>
    </Link>
  );
}
